import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from './src/themeProvider/themeProvider';
import { sendLocation } from "./src/services/api";
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterScreen from './src/registerForm/registerScreen';
import GpsLocatorScreen from './src/gpsLocatin/gpsLocatorScreen';
import LocationIsActiveScreen from './src/locationIsActive/locationIsActiveScreen';
import LoginOrRegisterScreen from './src/loginOrRegister/loginOrRegisterScreen';
import LoginScreen from './src/loginForm/loginScreen';



const Stack = createStackNavigator();

export default function App() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ location, setLocation ] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  useEffect(() => {
    //Loading userId from AsyncStorage when the app starts
    const loadUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setIsAuthenticated(true);
      }
    };
    loadUserId();
  }, []);

  useEffect(() => {
    let watchId;

    const startLocationTracking = async () => {
      if (!isAuthenticated || !hasLocationPermission) return;

      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) return;

        watchId = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 10,
            timeInterval: 5000,
          },
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            sendLocation(userId, latitude, longitude).catch((error) => {
              console.error('Error sending location:', error);
            });
          }
        );
      } catch (error) {
        console.error('Location error:', error);
      }
    };

    startLocationTracking();

    return () => {
      if (watchId) {
        Location.clearWatch(watchId);
      }
    };
  }, [isAuthenticated, hasLocationPermission])

 return (
  <ThemeProvider>
   <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="register/login">
          <Stack.Screen
           name="register/login" 
           children={() => (
             <LoginOrRegisterScreen />
           )} 
           />
          <Stack.Screen 
           name="register" 
           children={() => (
             <RegisterScreen 
               mobileNumber={mobileNumber} 
               setMobileNumber={setMobileNumber} 
               setIsAuthenticated={setIsAuthenticated}
             />
           )} 
           />
           <Stack.Screen 
            name="login"
            children={() => (
              <LoginScreen
               mobileNumber={mobileNumber}
               setMobileNumber={setMobileNumber}
               setIsAuthenticated={setIsAuthenticated}
              />
            )}
           />
          <Stack.Screen 
           name="gpsLocator" 
           children={({ route }) => (
             <GpsLocatorScreen
               route={route}
               setHasLocationPermission={setHasLocationPermission}
             />
           )}
           options={{ gestureEnabled: false }} 
           />
          <Stack.Screen 
           name="locationIsActive" 
           children={({ route }) => (
             <LocationIsActiveScreen
               route={route}
             />
           )}
          options={{ gestureEnabled: false }}
           />
      </Stack.Navigator>
   </NavigationContainer>
  </ThemeProvider>
  );
};

