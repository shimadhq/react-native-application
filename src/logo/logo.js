import React from "react";
import { Image, StyleSheet } from "react-native";

export function Logo(){
    return <Image source={require('../../assets/logo.png')} style={styles.logo} />
}

const styles = StyleSheet.create({
    logo: {
        width: 200,
        resizeMode: 'contain',
        marginBottom: -100,
    }
})