import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    const [userName, setUserName] = useState<string>();

    const navigation = useNavigation();

    useEffect(() => {
        async function loadStorageUserName() {

            try {
                const user = await AsyncStorage.getItem('@productmanager:user');
                setUserName(user || '');
            } catch (error) {
                console.log(error);
            }

        }
        loadStorageUserName();
    }, []);

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.content}>

                {showBack ?
                    <TouchableOpacity activeOpacity={0.7} onPress={navigation.goBack}>
                        <Feather name={'chevron-left'} size={50} color={colors.textWhite} />
                    </TouchableOpacity> :
                    <View style={{ width: 24, marginLeft: 10 }} />
                }

                {title ?
                    <Text style={styles.title}>{title}</Text> :
                    <Text style={styles.title}>Olá, {userName}</Text>
                }

                {showCalendar ?
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Expired')}>
                        <Image source={logoWhite} style={styles.img} />
                    </TouchableOpacity> :
                    <View style={{ width: 24, marginRight: 20 }} />
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
        top: 0,
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