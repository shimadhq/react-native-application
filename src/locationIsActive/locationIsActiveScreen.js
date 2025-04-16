import React, { useContext } from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Enable } from './enable.js';
import { ThemeContext } from "../themeProvider/themeProvider.js";
import { Switch } from "react-native";

const LocationIsActiveScreen = ({ route }) => {
    const { mobileNumber, location } = route.params;
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    return(
        <SafeAreaView style={[styles.container, isDarkMode ? styles.dark : styles.light]}>
          <View style={styles.centered}>
            <Enable />
            <Text 
             style={[ styles.text, isDarkMode ? styles.lighttext : styles.darktext ]}
             >
                موقعیت مکانی شما اکنون فعال است.
            </Text>
            <Text
             style={[ styles.text, isDarkMode? styles.lighttext : styles.darktext ]}
            >
                شماره موبایل: {mobileNumber}
            </Text>
            {location && (
              <Text
                style={[ styles.text, isDarkMode ? styles.lighttext : styles.darktext ]}
              > 
                موقعیت فعلی: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </Text>
            )}
           </View>

           <View style={styles.switcher}>
             <Switch value={isDarkMode} onValueChange={toggleTheme} />
           </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    light: {
        backgroundColor: 'rgba(241, 249, 252, 0.6)',
    },
    dark: {
        backgroundColor: '#1B263B',
    },
    lighttext: {
        color: 'rgb(255, 255, 255)',
    },
    darktext: {
        color: 'rgba(0, 0, 0, 0.7)',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    switcher: {
        position: 'static',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
    },
    text: {
        fontSize: 25,
        marginBottom: 10,
        marginTop: 10,
    },
});

export default LocationIsActiveScreen;