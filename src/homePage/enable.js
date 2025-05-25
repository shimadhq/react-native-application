import React from "react";
import { Image, StyleSheet } from "react-native";

export function Enable(){
    return <Image source={require('../../assets/enable.png')} style={styles.enable} />
}

const styles = StyleSheet.create({
    enable: {
        width: 200,
        resizeMode: 'contain',
        marginBottom: 100,
    }
})