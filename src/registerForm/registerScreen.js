import React, { useContext, useEffect } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Logo } from '../logo/logo.js';
import { RegisterForm } from './registerForm.js';
import { ThemeContext } from "../themeProvider/themeProvider.js";
import { Switch } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen({ firstName, setFirstName, lastName, setLastName, mobileNumber, setMobileNumber, setIsAuthenticated, setUserId }) {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const navigation = useNavigation();

    return(
        <SafeAreaView style={[styles.registerscreen, isDarkMode ? styles.dark : styles.light]}>
            <View style={styles.centered}>
             {/* Centered Content */}
             <View style={[ isDarkMode ? styles.logoDark : styles.logo ]}>
               <Logo />
             </View>
             
             <RegisterForm 
              navigation={navigation} 
              mobileNumber={mobileNumber} 
              setMobileNumber={setMobileNumber} 
              setIsAuthenticated={setIsAuthenticated} 
              setUserId={setUserId}
              firstName={firstName}
              lastName={lastName}
              setFirstName={setFirstName}
              setLastName={setLastName}
              />
            </View>

            <View style={styles.switcher}> 
              {/* Theme Switcher at Bottom */}
              <Switch value={isDarkMode} onValueChange={toggleTheme}/>
            </View>
            <View style={[styles.box, {backgroundColor: isDarkMode ? '#212D3B' : '#dee2e6'}]}>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    registerscreen: {
        flex: 1,
    }, 
    light: {
        backgroundColor: 'rgba(241, 249, 252, 0.6)',
    },
    dark: {
        backgroundColor: '#162432',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
    },
    logo:{
        alignItems: 'center',
    },
    logoDark: {
        marginBottom: 210,
        alignItems: 'center',
        marginTop: 200
    },
    switcher: {
        position: 'static',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
    },
    box: {
        width: '100%',
        height: 38,
    },
});