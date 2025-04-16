import React, { useContext } from "react";
import { Text, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { ThemeContext } from "../themeProvider/themeProvider.js";
import * as Location from 'expo-location';
import { sendLocation } from '../services/api';


export const GpsLocator = ({ route , navigation, setHasLocationPermission }) => { 
  const { userId } = route.params;
  const { isDarkMode } = useContext(ThemeContext);

  const handleLocation = async () => {
      try{
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== "granted") {
          Alert.alert('خطای عدم دسترسی','لطفا دسترسی به لوکیشن را تایید کنید');
          return;
        }

        //Updating permission state
        setHasLocationPermission(true);

        //Directing user to the next page
        navigation.navigate('locationIsActive', {
          userId,
          mobileNumber,
        });
       } catch (error) {
        console.error("Permission error", error);
        Alert.alert('خطا', 'نمی‌توان به موقعیت مکانی دسترسی پیدا کرد.');
        }
  };
  
  return(
        <View style={styles.gpslocator}>
          <View style={styles.textcontainer}>
          <Text style={[styles.text, isDarkMode ? styles.light : styles.dark]}>
            GPS
          </Text>
            <Text style={[styles.text, isDarkMode ? styles.light : styles.dark]}>
              خود را برای دریافت موقعیت مکانی فعال نمایید
            </Text>
          </View>
            <TouchableOpacity style={styles.gpsbutton} onPress={handleLocation}>
                <Text style={styles.buttontext}>دریافت موقعیت مکانی</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    gpslocator: {
      flex: 1,
      flexDirection: 'coloumn',
      justifyContent: 'center',
      alignItems: "center",
      marginBottom: 140,
    },
    gpsbutton: {
      backgroundColor: 'rgb(186, 236, 190)',
      fontSize: 12,
      borderRadius: 12,
      width: '55%',
      alignItems: 'center',
      padding: 13,
      marginTop: 10,
    },
    text: {
        fontSize: 13,
        marginBottom: 15,
        direction: 'rtl',
    },
    light: {
      color: 'rgb(255, 255, 255)',
    },
    dark:{
      color: 'rgba(0, 0, 0, 0.7)',
    },
    textcontainer: {
        flexDirection: 'row-reverse',
        gap: 4,
    },
    buttontext: {
        color: 'rgb(0, 0, 0)',
        fontSize: 12,
    },
})

