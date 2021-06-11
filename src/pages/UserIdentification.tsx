import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, BackHandler, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import Button from '../components/Button';

export default function UserIdentification() {

    const [isFocused, setFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();
    const navigation = useNavigation();

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', () => true)
    }, [])

    function handleInputBlur() {
        setFocused(false);
        setIsFilled(!!name)
    }

    function handleInputFocus() {
        setFocused(true);
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value);
        setName(value);
    }

    function handleNavigateToSchedule() {
        navigation.navigate('Schedule');
    }

    return (
        <SafeAreaView style={styles.container}>

            <StatusBar
                style={'dark'}
                backgroundColor={colors.background}
                translucent={false}
                hidden={false}
            />
            
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                >
                    <View style={styles.content}>

                        <View style={styles.form}>

                            <View style={styles.header}>

                                <Text style={styles.emoji}>
                                    😊
                            </Text>

                                <Text style={styles.title}>
                                    Como podemos {'\n'}
                                    chamar você?
                                </Text>

                                <TextInput
                                    style={[
                                        styles.input,
                                        (isFocused || isFilled) &&
                                        { borderBottomColor: colors.theme }
                                    ]}
                                    placeholder="Digite um nome"
                                    onBlur={handleInputBlur}
                                    onFocus={handleInputFocus}
                                    onChangeText={handleInputChange}
                                />

                                <View style={styles.footer}>
                                    <Button onPress={handleNavigateToSchedule} title={'Confirmar'} />
                                </View>

                            </View>

                        </View>

                    </View>

                </KeyboardAvoidingView>

            </TouchableWithoutFeedback>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.background,
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

    input: {
        borderBottomWidth: 1,
        borderBottomColor: colors.inputBorderGray,
        color: colors.text,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center',
    },

    footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20,
    }
});