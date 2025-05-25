import React, { useContext } from "react";
import { TouchableOpacity, View, StyleSheet, TextInput, Alert } from "react-native";
import { Text } from "react-native";
import { useState } from "react";
import { RegisterUser } from '../services/api';
import { ThemeContext } from "../themeProvider/themeProvider.js";


export const RegisterForm = ({ firstName, setFirstName, lastName, setLastName, mobileNumber, setMobileNumber, navigation }) => {
    const { isDarkMode } = useContext(ThemeContext);

    const registerHolder = async () => { 
        if (!firstName || !lastName || !mobileNumber) {
            Alert.alert("لطفا اطلاعات خود را وارد کنید!");
        }

        //Authenticating iranian phone number
        if (!/^09\d{9}$/.test(mobileNumber)) {
            Alert.alert('خطا', 'لطفاً شماره موبایل معتبر وارد کنید (مثل 09123456789)');
            return;
        }

        try {
            await RegisterUser(firstName, lastName, mobileNumber, navigation);
          } catch (error) {
            console.error('Form Error:', error);
            Alert.alert('خطا', 'مشکلی پیش آمد. لطفاً دوباره تلاش کنید.');
          }
    };
    
    const returnToPreviousPage = () => {
        if (navigation) {
            navigation.goBack();
            } else {
            Alert.alert('خطا', 'ناوبری در دسترس نیست');
        }
    };

    return(
        <View style={styles.registerForm}>
           <TextInput
           style={[styles.textInput,
                   isDarkMode
                      ? { backgroundColor: '#212D3B' }
                      : { backgroundColor: '#FFFFFF' },
           ]}
           placeholder="نام خود را وارد کنید..."
           placeholderTextColor={isDarkMode ? 'rgb(255, 255, 255)' : 'rgba(0, 0, 0, 0.48)'}
           value={firstName}
           keyboardType="default"
           onChangeText={setFirstName}
           textAlign="right"
           writingDirection="rtl"
           />
           <TextInput
           style={[styles.textInput,
                   isDarkMode
                       ? { backgroundColor: '#212D3B' }
                       : { backgroundColor: 'rgb(255, 255, 255)' },
           ]}
           placeholder="نام خانوادگی خود را وارد کنید..."
           placeholderTextColor={isDarkMode ? 'rgb(255, 255, 255)' : 'rgba(0, 0, 0, 0.46)'}
           value={lastName}
           keyboardType="default"
           onChangeText={setLastName}
           textAlign="right"
           writingDirection="rtl"
           />
           <TextInput
           style={[styles.textInput,
                   isDarkMode
                       ? { backgroundColor: '#212D3B' }
                       : { backgroundColor: '#FFFFFF' },
           ]}
           placeholder="شماره موبایل خود را وارد کنید..."
           placeholderTextColor={isDarkMode ? 'rgb(255, 255, 255)' : 'rgba(0, 0, 0, 0.48)'}
           value={mobileNumber}
           keyboardType="number-pad"
           textAlign="right"
           writingDirection="rtl"
           onChangeText={setMobileNumber}
           />
           <TouchableOpacity style={[ isDarkMode ? styles.darkButton  : styles.button]} onPress={registerHolder}>
            <Text style={[ isDarkMode ? styles.darkText : styles.text ]}>ارسال</Text>
           </TouchableOpacity>
           <TouchableOpacity style={[ isDarkMode ? styles.darkReturnButton : styles.returnButton]} onPress={returnToPreviousPage}>
            <Text style={[ isDarkMode ? styles.darkReturnText : styles.returnText ]}>
                بازگشت به صفحه قبل
            </Text>
           </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    registerForm: {
        flexDirection: 'coloumn',
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
        fontSize: 12,
        borderRadius: 12,
        width: '47%',
        alignItems: 'center',
        padding: 14,
        marginTop: 10,
    },
    darkButton: {
        backgroundColor: '#212D3B',
        fontSize: 12,
        borderRadius: 14,
        width: '47%',
        alignItems: 'center',
        padding: 14,
        marginTop: 10
    },
    darkText: {
        color: 'rgb(255, 255, 255)',
        fontSize: 12
    },
    text: {
        color: 'rgb(0, 0, 0)',
        fontSize: 12
    },
    returnButton: {
        marginTop: 22,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBlockColor: 'rgb(108, 117, 125)',
        width: '30%',
    },
    darkReturnButton: {
        marginTop: 22,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
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
    }
})



