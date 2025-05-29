import React, { useContext, useState, useEffect } from "react";
import { Text, StyleSheet, View, Alert, Platform, Linking, Image, TouchableOpacity } from 'react-native';
import { ThemeContext } from "../themeProvider/themeProvider.js";
import * as Location from 'expo-location';
import { sendLocation } from "../services/api.js";

export function LocationTracker({ route, navigation }) {
  const { userId, firstName, lastName, mobileNumber } = route.params || {}; // استفاده از || برای جلوگیری از خطا اگه params نباشه
  const { isDarkMode } = useContext(ThemeContext);

  // Opening location settings
  const openLocationSettings = async () => {
    try {
      if (Platform.OS === 'ios') {
        await Linking.openURL('App-Prefs:LOCATION_SERVICES');
      } else if (Platform.OS === 'android') {
        await Linking.openURL('android.settings.LOCATION_SOURCE_SETTINGS');
      }
    } catch (err) {
      console.error('Error opening settings:', err);
      Alert.alert('خطا', 'نمی‌توان به تنظیمات دسترسی پیدا کرد.');
    }
  };

  useEffect(() => {
    const getInitialLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'دسترسی لازم است',
          'لطفا دسترسی به موقعیت مکانی را فعال کنید.',
          [
            { text: 'لغو', style: 'cancel' },
            { text: 'برو به تنظیمات', onPress: openLocationSettings },
          ]
        );
        return;
      }

      const isLocationEnabled = await Location.hasServicesEnabledAsync();
      if (!isLocationEnabled) {
        Alert.alert(
          'GPS خاموش است',
          'لطفا GPS موبایل خود را فعال کنید.',
          [
            { text: 'لغو', style: 'cancel' },
            { text: 'برو به تنظیمات', onPress: openLocationSettings },
          ]
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude, accuracy } = location.coords;

      // انتقال به homePage با داده اولیه
      console.log('Sending to homePage:', { userId, firstName, lastName, mobileNumber, initialLocation: location });
      navigation.navigate('homePage', { userId, firstName, lastName, mobileNumber, initialLocation: location });
    };

    getInitialLocation();
  }, [navigation, userId, firstName, lastName, mobileNumber]); // وابستگی‌ها برای رندر مجدد

  return (
    <View style={[isDarkMode ? styles.gpstrackerDark :styles.gpstracker]}>
      <View style={styles.textcontainer}>
        <Text style={[styles.text, isDarkMode ? styles.light : styles.dark]}>
          در حال دریافت موقعیت مکانی ...
        </Text>
      </View>
    </View>
  );
}

// تعریف استایل‌ها
const styles = StyleSheet.create({
  gpstracker: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    marginTop: 80,
  },
  gpstrackerDark: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 140,
  },
  text: {
    fontSize: 15,
    marginBottom: 15,
  },
  light: {
    color: 'rgb(255, 255, 255)',
  },
  dark: {
    color: 'rgba(0, 0, 0, 0.7)',
  },
  textcontainer: {
    flexDirection: 'row-reverse',
    marginVertical: 4,
  },
});

