import React, { useState, useEffect, useContext } from 'react';
import { View, Alert, Linking, Platform, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { ThemeContext } from "../themeProvider/themeProvider.js";
import { sendLocation } from "../services/api.js";
import { useNavigation } from '@react-navigation/native';
import { Header } from './header.js';
import { Body } from './body.js';
import { Sidebar } from './sidebar.js';

const HomePageScreen = ({ route }) => {
  const { userId, firstName, lastName, mobileNumber, initialLocation } = route.params || {};
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState(null);
  const { isDarkMode } = useContext(ThemeContext);
  const [locationSubscription, setLocationSubscription] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigation = useNavigation();

  console.log('Route params in HomePageScreen:', route.params);

  const toggleSidebar = () => {
       setIsSidebarOpen(!isSidebarOpen);
  };

  const openLocationSettings = async () => {
    try {
      if (Platform.OS === 'ios') {
        await Linking.openURL('App-Prefs:LOCATION_SERVICES');
      } else {
        await Linking.openURL('android.settings.LOCATION_SOURCE_SETTINGS');
      }
    } catch (err) {
      console.error('Error opening settings:', err);
      Alert.alert('خطا', 'نمی‌توان به تنظیمات دسترسی پیدا کرد.');
    }
  };

  const startLocationTracking = async () => {
    try {
      const isLocationEnabled = await Location.hasServicesEnabledAsync();
      if (!isLocationEnabled) {
        setError('لطفا GPS موبایل خود را فعال کنید.');
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

  const subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 1,
          },
          async (position) => {
             const { latitude, longitude, accuracy } = position.coords;

             const locationData = {
               userId,
               latitude,
               longitude,
               accuracy,
               timestamp: new Date(position.timestamp).toISOString(),
          };

            const result = await sendLocation(locationData);
            if (result.success && result.status === 200) {
              console.log('Location sent:', result.data);
            } else {
              console.error('Error sending location:', result.error);
              setError('خطا در ارسال موقعیت مکانی: ' + result.error);
              Alert.alert('خطا', 'خطا در ارسال موقعیت مکانی: ' + result.error);
            }
          }
        );

        setLocationSubscription(subscription);
        setIsTracking(true);
      } catch (err) {
        setIsTracking(false);
        setError('خطا در دریافت موقعیت: ' + err.message);
        Alert.alert('خطا', 'خطا در دریافت موقعیت مکانی: ' + err.message);
      }
  };

  const stopLocationTracking = () => {
      if (locationSubscription) {
        locationSubscription.remove();
        setLocationSubscription(null);
      }
      setIsTracking(false);
    };

    const toggleTracking = async () => {
      if (!isTracking) {
        await startLocationTracking();
      } else {
        stopLocationTracking();
      }
    };

  useEffect(() => {
    let cleanup;
    startLocationTracking().then((cleanUpFunction) => {
      cleanup = cleanUpFunction;
    });

    return () => {
      if (cleanup) cleanup(); // متوقف کردن subscription موقع unmount
    };
  }, [userId]);

  useEffect(() => {
      if (navigation) {
        const unsubscribe = navigation.addListener('focus', async () => {
          const isLocationEnabled = await Location.hasServicesEnabledAsync();
          if (!isLocationEnabled) {
            setError('لطفا GPS موبایل خود را فعال کنید.');
            Alert.alert(
              'GPS خاموش است',
              'لطفا GPS موبایل خود را فعال کنید.',
              [
                { text: 'لغو', style: 'cancel' },
                { text: 'برو به تنظیمات', onPress: openLocationSettings },
              ]
            );
          } else if (error) {
            setError(null);
            if (isTracking) {
              await startLocationTracking();
            }
          }
        });

        return unsubscribe;
      }
  }, [navigation, error, isTracking]);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#162432' : '#f8f8f8' }]}>
       <Header
         toggleSidebar={toggleSidebar}
         isTracking={isTracking}
       />
       <Sidebar
         isTracking={isTracking}
         isOpen={isSidebarOpen}
         toggleSidebar={toggleSidebar}
         navigation={navigation}
         firstName={firstName}
         lastName={lastName}
         mobileNumber={mobileNumber}
       />
       <Body
         isTracking={isTracking}
         toggleTracking={toggleTracking}
       />
      <View style={styles.switcher}>
        <View style={[styles.box, {backgroundColor: isDarkMode ? '#212D3B' : '#dee2e6'}]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  switcher: {
     flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 0,
  },
  box: {
     width: '100%',
     height: 38,
     justifyContent: 'flex-end'
  },
});

export default HomePageScreen;