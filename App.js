import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from './src/themeProvider/themeProvider';
import { sendLocation } from "./src/services/api";
import { Alert } from "react-native";
import { BackHandler } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterScreen from './src/registerForm/registerScreen';
import LocationTrackerScreen from './src/locationTracker/locationTrackerScreen';
import HomePageScreen from './src/homePage/homePageScreen';
import LoginOrRegisterScreen from './src/loginOrRegister/loginOrRegisterScreen';
import LoginScreen from './src/loginForm/loginScreen';

const Stack = createStackNavigator();

export default function App() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
         //When the page loads, a listener is added for the back button
         const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
             () => {
             //Returning false will cause the back button to do nothing
             return true;
                  }
             );

        //When the page is closed, the listener is removed
        return () => backHandler.remove();
  }, []);

 return (
  <ThemeProvider>
   <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }} initialRouteName="register/login">
          <Stack.Screen
           name="register/login" 
           children={() => <LoginOrRegisterScreen />} 
           />
          <Stack.Screen 
           name="register" 
           children={() => (
            <RegisterScreen 
            mobileNumber={mobileNumber} 
            setMobileNumber={setMobileNumber}
            firstName={firstName}
            lastName={lastName}
            setFirstName={setFirstName}
            setLastName={setLastName}
           />
           )} 
           />
           <Stack.Screen 
            name="login"
            children={() => (
              <LoginScreen
                mobileNumber={mobileNumber}
                setMobileNumber={setMobileNumber}
               />
            )}
           />
          <Stack.Screen 
           name="locationTracker"
           children={({ route }) => (
            <LocationTrackerScreen
               route={route}
              />
            )}
            options={{ gestureEnabled: false }} 
           />
          <Stack.Screen 
           name="homePage"
           children={({ route }) => (
             <HomePageScreen
               route={route}
             />
            )}
            options={{ gestureEnabled: false }}
           />
      </Stack.Navigator>
   </NavigationContainer>
  </ThemeProvider>
  );
}

