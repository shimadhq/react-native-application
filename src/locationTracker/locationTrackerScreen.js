import React, { useContext } from "react";
import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import { LocationTracker } from './locationTracker.js';
import { ThemeContext } from "../themeProvider/themeProvider.js";
import { Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LocationTrackerScreen({ route }) {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const navigation = useNavigation();
    
    return(
        <SafeAreaView style={[styles.gpslocatorscreen, isDarkMode ? styles.dark : styles.light]}>
            <View style={styles.centered}>
              {/* Centered Content */}
              <View style={styles.logoContainer}>
                <Image
                   source={require('../../assets/white-logo.png')}
                   style={[styles.logo, { display: isDarkMode ? 'flex' : 'none' }]}
                 />
                 <Image
                    source={require('../../assets/logo.png')}
                    style={[styles.whiteLogo, { display: isDarkMode ? 'none' : 'flex' }]}
                 />
              </View>
              <LocationTracker
               navigation={navigation}
               route={route}
               />
            </View>


            <View style={styles.switcher}>
              {/* Theme Switcher at Bottom */}
              <Switch value={isDarkMode} onValueChange={toggleTheme} />
            </View>
            <View style={[styles.box, {backgroundColor: isDarkMode ? '#212D3B' : '#dee2e6'}]}>
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
    logoContainer:{
        alignItems: 'center',
    },
    logo: {
      resizeMode: 'contain',
      marginBottom: -20,
      marginTop: 250
    },
    whiteLogo: {
      width: 200,
      resizeMode: 'contain',
      marginBottom: -200,
      marginTop: 40
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
})