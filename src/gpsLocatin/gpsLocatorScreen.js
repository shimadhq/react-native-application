import React, { useContext } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Logo } from '../logo/logo.js';
import { GpsLocator } from './gpsLocator';
import { ThemeContext } from "../themeProvider/themeProvider.js";
import { Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function GpsLocatorScreen() {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const navigation = useNavigation();
    
    return(
        <SafeAreaView style={[styles.gpslocatorscreen, isDarkMode ? styles.dark : styles.light]}>
            <View style={styles.centered}>
              {/* Centered Content */}
              <View style={styles.logo}>
                <Logo />
              </View>
              <GpsLocator navigation={navigation}/>
            </View>


            <View style={styles.switcher}>
              {/* Theme Switcher at Bottom */}
              <Switch value={isDarkMode} onValueChange={toggleTheme} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    gpslocatorscreen: {
        flex: 1,
    },
    light: {
        backgroundColor: 'rgba(241, 249, 252, 0.6)',
    },
    dark: {
        backgroundColor: '#1B263B',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
    },
    switcher: {
        position: 'static',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo:{
        alignItems: 'center',
    },
})