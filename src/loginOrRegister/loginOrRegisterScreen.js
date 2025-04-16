import React, { useContext } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { LoginOrRegister } from './loginOrRegister';
import { Logo } from '../logo/logo';
import { useNavigation } from '@react-navigation/native';
import { Switch } from 'react-native';
import { ThemeContext } from '../themeProvider/themeProvider';

export default function LoginOrRegisterScreen(){
    const navigation = useNavigation();
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    return(
        <SafeAreaView style={[ styles.screen, isDarkMode ? dark : white ]}>
            <View style={styles.centered}>
                { /* Centered Context */ }
                <View style={styles.logo}>
                  <Logo />
                </View>
                <LoginOrRegister navigation={navigation} />
            </View>

            { /* Theme Switcher at the bottom */ }
            <View style={styles.switcher}>
                <Switch value={isDarkMode} onValueChange={toggleTheme} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    white: {
        backgroundColor: 'rgba(241, 249, 252, 0.6)',
    },
    dark: {
        backgroundColor: '#1B263B',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
       alignItems: 'center',
    },
    switcher: {
       position: 'static',
       justifyContent: 'flex-end',
       alignItems: 'center',
       marginBottom: 20,
    },
})