import axios from 'axios';
import { Alert } from "react-native";
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginUser = async (mobileNumber, setIsAuthenticated ,navigation) => {
    try {
        const loginResponse = await axios.post(`${API_URL}/login`, { mobileNumber });

        if (loginResponse.data.status === "success") {
            // ✅ User exists, navigate
            const userId = loginResponse.data.userId;
            if (!userId) {
                throw new Error('User ID not returned from server');
            }
            await AsyncStorage.setItem('userId', userId);
            setIsAuthenticated(true);
            navigation.navigate("locationIsActive", { userId, mobileNumber });
            return userId;
        } else if (loginResponse.data.status === "not_found") {
            Alert.alert("کاربری با این شماره موبایل وجود ندارد! لطفا ثبت نام کنید.")
        }
    } catch (error) {
      console.error('Error in user login:', error.message);
      Alert.alert('خطا', error.message || 'لطفاً دوباره تلاش کنید.');
      throw error;
    }
};

export const RegisterUser = async (firstName, lastName, mobileNumber, navigation, setIsAuthenticated) => {
     try {
        const registerResponse = await axios.post(`${API_URL}/register`, {
            firstName,
            lastName,
            mobileNumber
        });
        
        if (registerResponse.data.status === "success"){
            const userId = registerResponse.data.userId;
            if (!userId) {
                throw new Error('User ID not returned from server');
            }
            await AsyncStorage.setItem('userId', userId);
            setIsAuthenticated(true); //Setting the login state
            navigation.navigate("gpsLocator", { userId });
            return userId;
        } else {
            throw new Error(registerResponse.data.message || "Registration failed");
        }
    } catch (error) {
        console.error("Error in user check/register:", error);
        Alert.alert("خطا", "لطفا دوباره تلاش کنید.");
        throw error; // برای مدیریت خطا توی caller
    }
};

export const sendLocation = async (userId, latitude, longitude) => {
    try {
      const response = await axios.post(`${API_URL}/location`, {
        userId,
        latitude,
        longitude,
      });
  
      if (response.data.status !== 'success') {
        throw new Error(response.data.message || 'Failed to send location');
      }
    } catch (error) {
      console.error('Error sending location:', error);
      throw error;
    }
};
