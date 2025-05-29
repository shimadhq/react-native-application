import { useContext } from 'react';
import { Text, TouchableOpacity, StyleSheet, TextInput, View, Alert } from 'react-native';
import { LoginUser } from '../services/api';
import { ThemeContext } from "../themeProvider/themeProvider.js";

export function LoginForm({ mobileNumber, setMobileNumber, navigation }){
      const { isDarkMode } = useContext(ThemeContext);

      const loginHolder = async () => {
        console.log('Login attempt:', { mobileNumber });

        // بررسی خالی بودن mobileNumber
        if (!mobileNumber) {
          Alert.alert('خطا', 'لطفاً شماره موبایل خود را وارد کنید!');
          return;
        }

        // اعتبارسنجی فرمت شماره موبایل
        if (!/^09\d{9}$/.test(mobileNumber)) {
          Alert.alert('خطا', 'لطفاً شماره موبایل معتبر وارد کنید (مثل 09123456789)');
          return;
        }

        try {
          // بررسی وجود navigation
          if (!navigation) {
            throw new Error('Navigation is not provided');
          }
          await LoginUser(mobileNumber, navigation);
        } catch (error) {
          console.error('Login error:', error.message, error.response?.data);
          if (error.response?.status === 502) {
              Alert.alert('خطا', 'سرور موقتاً در دسترس نیست. لطفاً بعداً تلاش کنید.');
            } else {
              Alert.alert('خطا', error.response?.data?.message || 'خطا در ورود');
          }
        }
      };

      const returnToPreviousPage = () => {
        if (navigation) {
          navigation.goBack();
        } else {
          Alert.alert('خطا', 'ناوبری در دسترس نیست');
        }
      };

      return (
        <View style={[isDarkMode ? styles.loginFormDark :styles.loginForm]}>
          <TextInput
            style={[
              styles.textInput,
              isDarkMode ? { backgroundColor: '#212D3B' } : { backgroundColor: '#FFFFFF' }
            ]}
            placeholder="شماره موبایل خود را وارد کنید..."
            placeholderTextColor={isDarkMode ? '#AAAAAA' : 'rgba(0, 0, 0, 0.48)'}
            value={mobileNumber}
            keyboardType="number-pad"
            textAlign="right"
            writingDirection="rtl"
            onChangeText={setMobileNumber}
            returnKeyType="done"
            onSubmitEditing={loginHolder}
            accessibilityLabel="ورود شماره موبایل"
          />
          <TouchableOpacity
            style={[isDarkMode ? styles.darkButton : styles.button]}
            onPress={loginHolder}
            accessibilityLabel="دکمه ارسال"
          >
            <Text style={[isDarkMode ? styles.darkText : styles.text]}>ارسال</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={isDarkMode ? styles.darkReturnButton : styles.returnButton}
            onPress={returnToPreviousPage}
            accessibilityLabel="بازگشت به صفحه قبل"
          >
            <Text style={[isDarkMode ? styles.darkReturnText : styles.returnText]}>
              بازگشت به صفحه قبل
            </Text>
          </TouchableOpacity>
        </View>
      );
};

const styles = StyleSheet.create({
            loginForm: {
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: "center",
                marginBottom: 60,
                marginTop: 80,
            },
            loginFormDark: {
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: "center",
                marginBottom: 140,
            },
            textInput: {
                fontSize: 11,
                width: "80%",
                padding: 16,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                borderWidth: 1,
                borderColor: "rgba(0, 0, 0, 0.16)",
                borderRadius: 12,
                marginBottom: 12,
            },
            button: {
                backgroundColor: 'rgb(186, 236, 190)',
                borderRadius: 14,
                width: '47%',
                alignItems: 'center',
                padding: 14,
                marginTop: 10,
            },
            darkButton: {
                backgroundColor: '#212D3B',
                borderRadius: 14,
                width: '47%',
                alignItems: 'center',
                padding: 14,
                marginTop: 10,
            },
            text: {
                fontSize: 12,
                color: '#000'
            },
            darkText: {
                 color: 'rgb(255, 255, 255)',
                 fontSize: 12
            },
            returnButton: {
                marginTop: 25,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 12,
                borderBottomWidth: 1,
                borderBlockColor: 'rgb(108, 117, 125)',
                width: '30%',
            },
            darkReturnButton: {
                marginTop: 25,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 12,
                borderBottomWidth: 1,
                borderBlockColor: 'rgb(255, 255, 255)',
                width: '30%',
            },
            returnText: {
                fontSize: 10,
                color: 'rgb(108, 117, 125)',
            },
            darkReturnText: {
                 fontSize: 10,
                 color: 'rgb(255, 255, 255)',
            },
});


