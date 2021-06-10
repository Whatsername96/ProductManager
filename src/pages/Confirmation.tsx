import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import Button from '../components/Button';

export default function Confirmation() {

    const navigation = useNavigation();

    function handleNavigateToCategory() {
        navigation.navigate('Category');
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
      }, [])

    return (
        <SafeAreaView style={styles.container}>

            <StatusBar
                style={'dark'}
                backgroundColor={colors.background}
                translucent={false}
                hidden={false}
            />

            <View style={styles.content}>

                <View style={styles.form}>

                    <Text style={styles.emoji}>
                        😉
                    </Text>

                    <Text style={styles.title}>
                        Tudo certo
                    </Text>

                    <Text style={styles.text}>
                        Agora vamos começar a{'\n'}
                        cuidar de seus produtos
                    </Text>
                    <View style={styles.footer}>
                        <Button title={'Começar'} onPress={handleNavigateToCategory}/>
                    </View>

                </View>

            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    content: {
        flex: 1,
        width: '100%',
    },

    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 40,
        alignItems: 'center',
    },

    header: {
        alignItems: 'center',
        width: '100%',
    },

    emoji: {
        fontSize: 44,
    },

    title: {
        marginTop: 20,
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.title,
        fontFamily: fonts.title,
    },

    text: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.text,
        fontFamily: fonts.text,
        marginTop: 20,
    },

    footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20,
    }
});