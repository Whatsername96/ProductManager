import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import Button from '../components/Button';

export default function Schedule() {

    const [isFocused, setFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [time, setTime] = useState<string>();
    const navigation = useNavigation();

    function handleInputBlur() {
        setFocused(false);
        setIsFilled(!!time)
    }

    function handleInputFocus() {
        setFocused(true);
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value);
        setTime(value);
    }

    function handleNavigateToConfirmation() {
        navigation.navigate('Confirmation');
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
                                    Qual o melhor horário{'\n'}
                                para você ser notificado?
                            </Text>

                                <TextInputMask
                                    placeholder={'--:--'}
                                    type={'datetime'}
                                    options={{
                                        format: 'HH:MM'
                                    }}
                                    style={[
                                        styles.input,
                                        (isFocused || isFilled) &&
                                        { borderBottomColor: colors.theme }
                                    ]}
                                    keyboardType={'number-pad'}
                                    maxLength={6}
                                    value={time}
                                    onChangeText={(text) => { setTime(text); handleInputChange }}
                                    onBlur={handleInputBlur}
                                    onFocus={handleInputFocus}
                                />

                                {/* <TextInput
                                style={}0
                                placeholder="Digite um nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            /> */}

                                <View style={styles.footer}>
                                    <Button
                                        title={'Confirmar'}
                                        onPress={handleNavigateToConfirmation} />
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