import axios from 'axios';
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});
apiClient.interceptors.response.use(
    (response) => {
        console.log('Response:', {
          status: response.status,
          data: response.data,
          headers: response.headers,
        });
        return response;
    },
    (error) => {
      if (error.response) {
            // سرور پاسخ داده اما با خطا (مثل 404 یا 500)
        console.error('Error Response:', {
           status: error.response.status,
           data: error.response.data,
           headers: error.response.headers,
        });
      } else if (error.request) {
        // درخواست ارسال شده اما پاسخی دریافت نشده
        console.error('No Response:', error.request);
      } else {
        // خطای دیگر (مثل مشکل در تنظیم درخواست)
        console.error('Error:', error.message);
      }
        return Promise.reject(error);
      }
);
export default apiClient;

export const LoginUser = async ( mobileNumber ,navigation ) => {
    try {
        if (!mobileNumber){
          throw new Error('شماره موبایل نامعتبر است');
        }
        console.log('Sending mobileNumber:', mobileNumber);
        const loginResponse = await apiClient.post(`/app-login`, { mobileNumber });
        console.log('API response:', loginResponse.data);

        if (loginResponse.data.status === "success") {
            // Login request from backend
            const { userId, firstName, lastName, mobileNumber: returnedMobileNumber } = loginResponse.data;

            if (!userId) {
                throw new Error('شناسه کاربر از سرور دریافت نشد');
            }

            // Saving userId
            await AsyncStorage.setItem('userId', String(userId));
            await AsyncStorage.setItem('firstName', firstName || '');
            await AsyncStorage.setItem('lastName', lastName || '');
            await AsyncStorage.setItem('mobileNumber', returnedMobileNumber || mobileNumber);

            console.log('Stored data:', {
                  userId: await AsyncStorage.getItem('userId'),
                  firstName: await AsyncStorage.getItem('firstName'),
                  lastName: await AsyncStorage.getItem('lastName'),
                  mobileNumber: await AsyncStorage.getItem('mobileNumber'),
            });

            //Navigating to location tracker
            navigation.navigate("locationTracker", { userId,
               firstName: firstName || 'نامشخص', // مقدار پیش‌فرض برای نمایش
               lastName: lastName || 'نامشخص',
               mobileNumber: returnedMobileNumber || mobileNumber, 
            });

            return userId;
        } else if (loginResponse.data.status === "not_found") {
          Alert.alert('خطا', 'کاربری با این شماره موبایل وجود ندارد! لطفا ثبت نام کنید.');
        } else {
          Alert.alert('خطا', loginResponse.data.message || 'خطا در ورود.');
        }
    } catch (error) {
      let errorMessage = 'لطفا دوباره تلاش کنید.';
      if (error.code === 'ERR_NETWORK') {
        errorMessage = 'خطای شبکه: لطفا اتصال اینترنت خود را بررسی کنید.'
      } else if (error.response) {
        errorMessage = error.response.data.message || 'خطا در ورود.';
      } else {
      errorMessage = error.message;
      }

      console.error('Error details:', {
        message: error.message,
        code: error.code,
        response: error.response ? error.response.data : null,
      });
      Alert.alert('خطا', errorMessage);
      throw error;
    }
};

export const RegisterUser = async (firstName, lastName, mobileNumber, navigation) => {
     try {
        if (!firstName || !lastName || !mobileNumber || !/^\d{11}$/.test(mobileNumber)) {
        throw new Error('لطفا تمام فیلدها را به درستی وارد کنید. شماره موبایل باید ۱۱ رقم باشد.');
        }

        console.log('Sending registration data:', { firstName, lastName, mobileNumber });
        const registerResponse = await apiClient.post(`/register`, {
            firstName,
            lastName,
            mobileNumber
        });
        console.log('API response:', registerResponse.data);
        
        if (registerResponse.data.status === "success"){
            const { userId, firstName: returnedFirstName, lastName: returnedLastName, mobileNumber: returnedMobileNumber } = registerResponse.data;
            if (!userId) {
                throw new Error('User ID not returned from server');
            }
            await AsyncStorage.setItem('userId', String(userId));
            await AsyncStorage.setItem('firstName', returnedFirstName || '');
            await AsyncStorage.setItem('lastName', returnedLastName || '');
            await AsyncStorage.setItem('mobileNumber', returnedMobileNumber || mobileNumber);

            console.log('Stored data:', {
            userId: await AsyncStorage.getItem('userId'),
            firstName: await AsyncStorage.getItem('firstName'),
            lastName: await AsyncStorage.getItem('lastName'),
            mobileNumber: await AsyncStorage.getItem('mobileNumber'),
            });

            navigation.navigate("locationTracker", { userId,
              firstName: returnedFirstName || 'نامشخص',
              lastName: returnedLastName || 'نامشخص',
              mobileNumber: returnedMobileNumber || mobileNumber, 
            });
            
            return userId;
        } else {
            const errorMessage = registerResponse.data.message || 'ثبت نام ناموفق بود.';
            if (errorMessage.includes("Mobile number already exists")) {
                // Error message because of repetitive mobileNumber
                Alert.alert("خطا", "این شماره موبایل قبلا ثبت شده است. لطفا یا به صفحه قبل برگردید و وارد شوید یا از شماره موبایل دیگری استفاده کنید.")
            } else {
                // For other errors
                Alert.alert("خطا", errorMessage);
            }
        }
    } catch (error) {
        let errorMessage = "لطفا دوباره تلاش کنید.";
        if (error.code === 'ERR_NETWORK') {
            errorMessage = 'خطای شبکه: لطفا اتصال اینترنت خود را بررسی کنید.';
        } else if (error.response) {
            errorMessage = error.response.data.message || 'خطا در ثبت نام';
        }
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            response: error.response ? error.response.data : null,
        });
        Alert.alert('خطا', errorMessage);
        throw error;
    }
};

export const sendLocation = async (locationData) => {
  try {
    const { userId, latitude, longitude, accuracy, timestamp } = locationData;

    // اعتبارسنجی ورودی‌ها
    if (!userId || typeof latitude !== 'number' || typeof longitude !== 'number') {
      throw new Error('Invalid input: userId, latitude, and longitude are required');
    }

    console.log('Sending location to:', `${API_URL}/location`);
    console.log('Request body:', { userId, latitude, longitude, accuracy, timestamp });

    const response = await apiClient.post('/location', {
      userId,
      latitude,
      longitude,
      accuracy,
      timestamp: timestamp || new Date().toISOString(), // اگر timestamp نباشه، زمان فعلی
    });

    console.log('Response:', response.data);

    // بررسی موفقیت درخواست
    if (response.status !== 200 || !response.data.message.includes('Location saved')) {
      throw new Error(response.data.error || 'Failed to send location');
    }

    return {
      success: true,
      status: response.status,
      data: response.data,
      error: null,
    };
  } catch (error) {
    console.error('Error sending location:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    return {
      success: false,
      status: error.response?.status || null,
      data: null,
      error: error.response?.data?.error || error.message || 'Failed to send location',
    };
  }
};
