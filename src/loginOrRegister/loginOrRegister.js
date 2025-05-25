import { useContext } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { ThemeContext } from '../themeProvider/themeProvider';

export const LoginOrRegister = ({ navigation }) => {
    const { isDarkMode } = useContext(ThemeContext);

    const handleRegister = () => {
        navigation.navigate("register");
    };

    const handleLogin = () => {
        navigation.navigate("login");
    };

    return(
        <View style={styles.container}>
            <TouchableOpacity style={[isDarkMode ? styles.registerDark  : styles.registerWhite]} onPress={handleRegister}>
                <Text style={[ isDarkMode ? styles.textWhite : styles.textDark ]}>
                   ثبت نام
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[ isDarkMode ? styles.loginDark : styles.loginWhite ]} onPress={handleLogin}>
                <Text style={[ isDarkMode ? styles.textWhite : styles.textDark ]}>
                    ورود
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 6,
        marginBottom: 130
    },
    registerWhite: {
        backgroundColor: 'rgb(186, 236, 190)',
        fontSize: 12,
        borderRadius: 12,
        width: '50%',
        alignItems: 'center',
        padding: 15,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 3
    },
    registerDark: {
        backgroundColor: "#212D3B",
        fontSize: 12,
        borderRadius: 12,
        width: '50%',
        alignItems: 'center',
        padding: 15,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 3
    },
    loginWhite: {
        backgroundColor: 'rgb(186, 236, 190)',
        borderRadius: 12,
        width: '50%',
        alignItems: 'center',
        padding: 15,
        marginTop: 10,
    },
    loginDark: {
        backgroundColor: "#212D3B",
        fontSize: 12,
        borderRadius: 12,
        width: '50%',
        alignItems: 'center',
        padding: 15,
        marginTop: 10,
    },
    textDark: {
        fontSize: 13,
        color: "#000"
    },
    textWhite: {
        fontSize: 13,
        color: "#fff"
    }
})