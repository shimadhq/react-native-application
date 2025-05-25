import React, { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ThemeContext } from '../themeProvider/themeProvider';

export function Logo(){
    const { isDarkMode } = useContext(ThemeContext);
    return (
        <View>
          <Image
            source={require('../../assets/white-logo.png')}
            style={[styles.whiteLogo, { display: isDarkMode ? 'flex' : 'none' }]}
          />
          <Image
            source={require('../../assets/logo.png')}
            style={[styles.logo, { display: isDarkMode ? 'none' : 'flex' }]}
          />
        </View>
      );
}

const styles = StyleSheet.create({
    logo: {
        width: 195,
        resizeMode: 'contain',
        marginBottom: -87,
        marginTop: 0,
    },
    whiteLogo: {
        width: 160,
        resizeMode: 'contain',
        marginBottom: -90,
    }
})