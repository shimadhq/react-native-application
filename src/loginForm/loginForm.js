import { Text, TouchableOpacity, StyleSheet, TextInput, View, Alert } from 'react-native';


export function LoginForm({ mobileNumber, setMobileNumber, setIsAuthenticated, navigation }){
    const loginHolder = async () => {
        if (!mobileNumber) {
            Alert.alert("لطفا شماره موبایل خود را وارد کنید!")
        }

        //Authenticating iranian phone number
        if (!/^09\d{9}$/.test(mobileNumber)) {
            Alert.alert('خطا', 'لطفاً شماره موبایل معتبر وارد کنید (مثل 09123456789)');
            return;
        }
        try {
            await LoginUser(mobileNumber, setIsAuthenticated, navigation);
        } catch (error) {
            console.error('Form Error:', error);
            Alert.alert('خطا', 'مشکلی پیش آمد. لطفاً دوباره تلاش کنید.');
        }
    }
    return(
        <View style={styles.loginForm}>
            <TextInput
                style={styles.textInput}
                placeholder="شماره موبایل خود را وارد کنید..."
                value={mobileNumber}
                keyboardType="number-pad"
                textAlign="right"
                writingDirection="rtl"
                onChangeText={setMobileNumber}
            />
            <TouchableOpacity style={styles.button} onPress={loginHolder}>
              <Text>ارسال</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    loginForm: {
        flexDirection: 'coloumn',
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 140,
    },
    textInput: {
        fontSize: 12,
        width: "80%",
        backgroundColor: '#FFFFFF',
        color: 'rgba(0, 0, 0, 0.46)',
        padding: 14,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.16)",
        borderRadius: 12,
        marginBottom: 12,
    },
    button: {
        backgroundColor: 'rgb(186, 236, 190)',
        fontSize: 12,
        borderRadius: 12,
        width: '50%',
        alignItems: 'center',
        padding: 13,
        marginTop: 10,
    },
});
