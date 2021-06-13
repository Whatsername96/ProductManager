import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    SafeAreaView, 
    KeyboardAvoidingView, 
    Platform, 
    TouchableWithoutFeedback, 
    Keyboard, 
    TouchableOpacity, 
    Alert } from 'react-native';
    
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { format } from 'date-fns';

import { StatusBar } from 'expo-status-bar';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import Button from '../components/Button';

export default function Schedule() {

    const [isFilledTime, setIsFilledTime] = useState(false);
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');
    const navigation = useNavigation();

    useEffect(() => {
        async function loadStorageTimeUser() {

            try {
                const time = await AsyncStorage.getItem('@productmanager:time');

                if (time) {

                    setTime(new Date(time));
                }

            } catch (error) {

                console.log(error);
                return Alert.alert('Não foi possível salvar seu horário escolhido🥺');

            }

        }
        loadStorageTimeUser();
    }, []);

    function handleOpenDateTimePickerForAndroid() {
        setShowDatePicker(oldState => !oldState);
    }

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if (Platform.OS == 'android') {
            setShowDatePicker(oldState => !oldState);
        }

        if (dateTime) {
            setTime(dateTime);
            setIsFilledTime(true);
        }
    }

    async function handleNavigateToConfirmation() {

        try {

            await AsyncStorage.setItem('@productmanager:time', time.toString());

        } catch (error) {

            console.log(error);
        }

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

                            </View>

                            {/* <TextInputMask
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
                            /> */}

                            {showDatePicker && (
                                <DateTimePicker
                                    value={time}
                                    mode={'time'}
                                    display={'spinner'}
                                    onChange={handleChangeTime}
                                />
                            )}

                            {Platform.OS == 'android' && (
                                <TouchableOpacity activeOpacity={0.7}
                                    style={[
                                        styles.buttonChangeTime,
                                        isFilledTime &&
                                        { borderBottomColor: colors.theme }
                                    ]}
                                    onPress={handleOpenDateTimePickerForAndroid}>
                                    <Text style={styles.dateTimePickerText}>{`Mudar Horário: ${format(time, 'HH:mm')}`}</Text>
                                </TouchableOpacity>
                            )}


                            <View style={styles.footer}>
                                <Button
                                    title={'Confirmar'}
                                    onPress={handleNavigateToConfirmation} />
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

    buttonChangeTime: {
        width: '100%',
        marginTop: 50,
        borderBottomWidth: 1,
        borderBottomColor: colors.inputBorderGray,
        alignItems: 'center',
    },

    dateTimePickerText: {
        paddingBottom: 10,
        color: colors.text,
        fontFamily: fonts.text,
        fontSize: 18,
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