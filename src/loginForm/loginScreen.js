import React, { useContext } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Logo } from '../logo/logo.js';
import { ThemeContext } from "../themeProvider/themeProvider.js";
import { Switch } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { LoginForm } from "./loginForm.js";

export default function LoginScreen({ firstName, lastName, mobileNumber, setMobileNumber }){
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const navigation = useNavigation();

    return(
        <SafeAreaView style={[styles.loginscreen, isDarkMode ? styles.dark : styles.light]}>
            <View style={styles.centered}>
                {/* Centered Content */}
                <View style={[ isDarkMode ? styles.logoDark : styles.logo ]}>
                   <Logo />
                </View>
                     
                  <LoginForm 
                  navigation={navigation} 
                  mobileNumber={mobileNumber} 
                  setMobileNumber={setMobileNumber}
                  firstName={firstName}
                  lastName={lastName}
                  />
                </View>
        
                    
                <View style={styles.switcher}> 
                  {/* Theme Switcher at Bottom */}
                  <Switch 
                  value={isDarkMode} 
                  onValueChange={toggleTheme}
                  />
                </View>
                <View style={[styles.box, {backgroundColor: isDarkMode ? '#212D3B' : '#dee2e6'}]}>
                </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    loginscreen: {
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
    },
    box: {
       width: '100%',
       height: 38,
    },
});