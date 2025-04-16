import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

export const LoginOrRegister = ({ navigation }) => {
    const handleRegister = () => {
        navigation.navigate("register");
    }
    const handleLogin = () => {
        navigation.navigate("login")
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text>
                    ثبت نام
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text>
                    ورود
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    registerButton: {
        backgroundColor: 'rgb(186, 236, 190)',
        fontSize: 12,
        borderRadius: 12,
        width: '50%',
        alignItems: 'center',
        padding: 13,
        marginTop: 10,
    },
    loginButton: {
        backgroundColor: 'rgb(186, 236, 190)',
        fontSize: 12,
        borderRadius: 12,
        width: '50%',
        alignItems: 'center',
        padding: 13,
        marginTop: 10,
    },
})