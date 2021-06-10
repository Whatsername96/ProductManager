import React from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import logoWhite from '../images/logo_white.png';

interface HeaderProps {
    title: string;
    showBack: boolean;
    showCalendar: boolean;
}

export default function Header({ title, showBack, showCalendar }: HeaderProps) {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.content}>
                {showBack ?
                    <TouchableOpacity activeOpacity={0.7} onPress={navigation.goBack}>
                        <Feather name={'chevron-left'} size={50} color={colors.textWhite} />
                    </TouchableOpacity> :
                    <View style={{width: 24}}/>
                }
                {title ?
                    <Text style={styles.title}>{title}</Text> :
                    <Text style={styles.title}>Olá, User</Text>
                }

                {showCalendar ?
                    <TouchableOpacity activeOpacity={0.7}>
                        <Image source={logoWhite} style={styles.img} />
                    </TouchableOpacity> :
                    <View />
                }
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 70,
    },

    content: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.theme,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        fontSize: 24,
        fontFamily: fonts.title,
        color: colors.textWhite,
    },

    img: {
        marginRight: 10,
    },

});