import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps{
    title: string
}

export default function Button({ title } : ButtonProps){
    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.container}>
            <Text style={styles.text}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.theme,
        height: 56,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 16,
        color: colors.textWhite,
        fontFamily: fonts.text,
    },
});