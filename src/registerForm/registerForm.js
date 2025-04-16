import React from "react";
import { TouchableOpacity, View, StyleSheet, TextInput, Alert } from "react-native";
import { Text } from "react-native";
import { useState } from "react";
import { RegisterUser } from '../services/api';


export const RegisterForm = ({ navigation, mobileNumber, setMobileNumber, setIsAuthenticated }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const registerHolder = async () => { 
        if (!firstName || !lastName || !mobileNumber) {
            Alert.alert("لطفا اطلاعات خود را وارد کنید!")
        }

        //Authenticating iranian phone number
        if (!/^09\d{9}$/.test(mobileNumber)) {
            Alert.alert('خطا', 'لطفاً شماره موبایل معتبر وارد کنید (مثل 09123456789)');
            return;
        }

        try {
            await RegisterUser(firstName, lastName, mobileNumber, navigation, setIsAuthenticated);
          } catch (error) {
            console.error('Form Error:', error);
            Alert.alert('خطا', 'مشکلی پیش آمد. لطفاً دوباره تلاش کنید.');
          }
    }      


    return(
        <View style={styles.registerForm}>
           <TextInput
           style={styles.textInput}
           placeholder="نام خود را وارد کنید..."
           value={firstName}
           keyboardType="default"
           onChangeText={setFirstName}
           textAlign="right"
           writingDirection="rtl"
           />
           <TextInput
           style={styles.textInput}
           placeholder="نام خانوادگی خود را وارد کنید..."
           value={lastName}
           keyboardType="default"
           onChangeText={setLastName}
           textAlign="right"
           writingDirection="rtl"
           />
           <TextInput
           style={styles.textInput}
           placeholder="شماره موبایل خود را وارد کنید..."
           value={mobileNumber}
           keyboardType="number-pad"
           textAlign="right"
           writingDirection="rtl"
           onChangeText={setMobileNumber}
           />
           <TouchableOpacity style={styles.button} onPress={registerHolder}>
            <Text>ارسال</Text>
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
        fontSize: 12,
        width: "80%",
        backgroundColor: '#FFFFFF',
        color: 'rgba(0, 0, 0, 0.46)',
        padding: 14,
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
        width: '50%',
        alignItems: 'center',
        padding: 13,
        marginTop: 10,
    }
})



