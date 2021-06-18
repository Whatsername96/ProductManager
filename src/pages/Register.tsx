import React, { useState } from 'react';

import {
    StyleSheet,
    SafeAreaView,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    Image,
    Alert,
    TouchableOpacity,
    Text,
    NativeModules,
    Dimensions
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

import { isBefore, format } from 'date-fns';

import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

import Header from '../components/Header';
import Button from '../components/Button';
import ModalApp from '../components/ModalApp';

import colors from '../styles/colors';
import images from '../styles/images';
import fonts from '../styles/fonts';

import { saveProduct } from '../libs/storage';

export default function Register() {

    const { StatusBarManager } = NativeModules;
    const alturaStatusBar = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

    const [isFocusedName, setFocusedName] = useState(false);
    const [isFilledName, setIsFilledName] = useState(false);
    const [name, setName] = useState<string>('');

    const [isFocusedDescription, setFocusedDescription] = useState(false);
    const [isFilledDescription, setIsFilledDescription] = useState(false);
    const [description, setDescription] = useState<string>('');

    const [category, setCategory] = useState<keyof typeof images>('food');

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(
        [
            { label: 'Alimentos', value: 'food', icon: () => <Image source={images.food} style={styles.iconStyle} resizeMode={'contain'} /> },
            { label: 'Bebidas', value: 'drinks', icon: () => <Image source={images.drinks} style={styles.iconStyle} resizeMode={'contain'} /> },
            { label: 'Cosméticos', value: 'cosmetics', icon: () => <Image source={images.cosmetics} style={styles.iconStyle} resizeMode={'contain'} /> },
            { label: 'Higiene', value: 'hygiene', icon: () => <Image source={images.hygiene} style={styles.iconStyle} resizeMode={'contain'} /> },
            { label: 'Limpeza', value: 'cleaning', icon: () => <Image source={images.cleaning} style={styles.iconStyle} resizeMode={'contain'} /> },
            { label: 'Outros', value: 'others', icon: () => <Image source={images.others} style={styles.iconStyle} resizeMode={'contain'} /> },
            { label: 'Pets', value: 'pets', icon: () => <Image source={images.pets} style={styles.iconStyle} resizeMode={'contain'} /> },
            { label: 'Remédios', value: 'medicine', icon: () => <Image source={images.medicine} style={styles.iconStyle} resizeMode={'contain'} /> },
            { label: 'Tintas', value: 'paint', icon: () => <Image source={images.paint} style={styles.iconStyle} resizeMode={'contain'} /> },
        ]
    );

    const [isFilledDate, setIsFilledDate] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');


    function handleInputBlurName() {
        setFocusedName(false);
        setIsFilledName(!!name)
    }

    function handleInputFocusName() {
        setFocusedName(true);
    }

    function handleInputChangeName(value: string) {
        setIsFilledName(!!value);
        setName(value);
    }

    function handleInputBlurDescription() {
        setFocusedDescription(false);
        setIsFilledDescription(!!description);
    }

    function handleInputFocusDescription() {
        setFocusedDescription(true);
    }

    function handleInputChangeDescription(value: string) {
        setIsFilledDescription(!!value);
        setDescription(value);
    }

    function handleOpenDateTimePickerForAndroid() {
        setShowDatePicker(oldState => !oldState);
    }

    function handleChangeDate(event: Event, dateTime: Date | undefined) {

        if (Platform.OS == 'android') {

            setShowDatePicker(oldState => !oldState);
        }

        if (dateTime) {

            let datePicker = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
            let now = new Date();
            let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            if (isBefore(datePicker, today)) {

                return Alert.alert('Escolha uma data no futuro!');

            } else {
                
                if (dateTime) {

                    setDate(new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate()));
                    setIsFilledDate(true);
                }
            }
        }
    }

    async function handleSave() {
        let error = false;

        if (name.trim() === '') {
            error = true;
        }

        if (description.trim() === '') {
            error = true;
        }

        let datePicker = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        let now = new Date();
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        if (isBefore(datePicker, today)) {
            error = true;
        }

        if (error) {

            return Alert.alert('Dados inválidos no formulário');

        } else {

            try {

                await saveProduct({
                    id: name || '',
                    description: description || '',
                    category: category || '',
                    date: date.toString() || new Date().toString(),
                });

                setName('');
                setDescription('');
                setCategory('food');
                setDate(new Date());

            } catch (error) {
                setErrorMessage(error.message);
            }

            setModalVisible(true);
        }
    }

    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : alturaStatusBar}
            >
                <StatusBar
                    style={'light'}
                    backgroundColor={colors.theme}
                    translucent={false}
                    hidden={false}
                />
                <Header title={'Cadastrar'} showBack={true} showCalendar={false} />

                <SafeAreaView
                    style={styles.containerScrollView}
                >

                    <View style={styles.content}>

                        <TextInput
                            style={[
                                styles.input,
                                (isFocusedName || isFilledName) &&
                                { borderBottomColor: colors.theme }
                            ]}
                            placeholder={"Digite o nome do produto"}
                            placeholderTextColor={colors.placeholder}
                            onBlur={handleInputBlurName}
                            onFocus={handleInputFocusName}
                            onChangeText={handleInputChangeName}
                            maxLength={20}
                            value={name || ''}
                        />

                        <TextInput
                            style={[
                                styles.input,
                                (isFocusedDescription || isFilledDescription) &&
                                { borderBottomColor: colors.theme }
                            ]}
                            placeholder={"Digite a descrição do produto"}
                            placeholderTextColor={colors.placeholder}
                            onBlur={handleInputBlurDescription}
                            onFocus={handleInputFocusDescription}
                            onChangeText={handleInputChangeDescription}
                            maxLength={50}
                            value={description || ''}
                        />

                        <DropDownPicker
                            placeholder={'Selecione uma categoria...'}
                            placeholderStyle={styles.pickerPlaceholder}
                            open={open}
                            value={category}
                            items={items}
                            setOpen={setOpen}
                            setValue={setCategory}
                            setItems={setItems}
                            itemSeparator={true}
                            style={styles.pickerInput}
                            containerStyle={styles.containerPicker}
                            textStyle={styles.textPicker}
                            labelStyle={styles.labelPicker}
                            ArrowUpIconComponent={({ style }) => <Feather name="chevron-up" style={style} color={colors.theme} size={25} />}
                            ArrowDownIconComponent={({ style }) => <Feather name="chevron-down" style={style} color={colors.theme} size={25} />}
                            arrowIconContainerStyle={styles.arrowContainer}
                            tickIconContainerStyle={styles.tickIconContainerStyle}
                            TickIconComponent={({ style }) => <Feather name="check" style={style} color={colors.theme} size={25} />}
                            dropDownContainerStyle={styles.dropDownContainerPicker}
                            listItemContainerStyle={styles.dropDownItemsPicker}
                            listItemLabelStyle={styles.dropDownLabelPicker}
                            itemSeparatorStyle={styles.itemSeparator}
                            selectedItemContainerStyle={styles.selectedItemContainer}
                            selectedItemLabelStyle={styles.selectedItemLabel}
                        />

                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode={'date'}
                                display={'spinner'}
                                onChange={handleChangeDate}
                            />
                        )}

                        {Platform.OS == 'android' && (
                            <TouchableOpacity activeOpacity={0.7}
                                style={[
                                    styles.buttonChangeDate,
                                    isFilledDate &&
                                    { borderBottomColor: colors.theme }
                                ]}
                                onPress={handleOpenDateTimePickerForAndroid}>
                                <Text style={styles.dateTimePickerText}>{`Mudar data de validade: ${format(date, 'dd/MM/yyyy')}`}</Text>
                            </TouchableOpacity>
                        )}

                        <View style={styles.buttonContainer}>

                            <Button
                                title="Cadastrar Produto"
                                onPress={() => { handleSave() }}
                            />

                        </View>

                    </View>

                    {errorMessage === '' ?
                        <ModalApp
                            show={modalVisible}
                            close={() => setModalVisible(false)}
                            title={'😄'}
                            description={'Produto salvo com sucesso!'}
                        /> :
                        <ModalApp
                            show={modalVisible}
                            close={() => setModalVisible(false)}
                            title={'😕'}
                            description={'Ocorreu um erro. Tente mudar o nome do produto.'}
                        />
                    }
                </SafeAreaView >

            </KeyboardAvoidingView>

        </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
    containerScrollView: {
        height: Dimensions.get('window').height,
    },

    container: {
        flex: 1,
    },

    content: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 30,
    },

    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: colors.inputBorderGray,
        fontFamily: fonts.text,
        color: colors.text,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 0,
        textAlign: 'center',
    },

    buttonChangeDate: {
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

    containerPicker: {
        marginTop: 50,
    },

    pickerInput: {
        backgroundColor: colors.background,
        borderRadius: 6,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: colors.theme,
        elevation: 5,
        width: '100%',
        height: 60,
    },

    pickerPlaceholder: {
        fontSize: 16,
        color: colors.placeholder,
    },

    textPicker: {
        fontFamily: fonts.text,
        fontSize: 16,
    },

    labelPicker: {
        color: colors.theme,
        fontWeight: 'bold',
    },

    arrowContainer: {
        alignItems: 'center',
        marginHorizontal: 20,
        justifyContent: 'center',
    },

    tickIconContainerStyle: {
        paddingHorizontal: 20,
    },

    dropDownContainerPicker: {
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.theme,
        width: '100%',
    },

    iconStyle: {
        height: '100%',
        justifyContent: 'center',
    },

    dropDownItemsPicker: {
        backgroundColor: colors.background,
        borderColor: colors.theme,
        height: 60,
        paddingVertical: 10,
        width: '100%',
    },

    dropDownLabelPicker: {
        justifyContent: 'center',
        fontFamily: fonts.text,
        fontSize: 16,
        paddingVertical: 30,
        textAlign: 'left',
    },

    itemSeparator: {
        backgroundColor: colors.theme,
    },

    selectedItemContainer: {
        backgroundColor: colors.themeLowOpacity,
    },

    selectedItemLabel: {
        color: colors.theme,
        fontWeight: 'bold',
    },

    buttonContainer: {
        marginTop: 50,
        width: '90%',
        marginBottom: 30,
    }

});