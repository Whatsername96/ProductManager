import React, { useState } from 'react';

import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TextInput, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';

import Header from '../components/Header';

import colors from '../styles/colors';
import images from '../styles/images';
import fonts from '../styles/fonts';
import { ScrollView } from 'react-native-gesture-handler';

export default function Register() {

    const navigation = useNavigation();
    const [isFocusedName, setFocusedName] = useState(false);
    const [isFilledName, setIsFilledName] = useState(false);
    const [name, setName] = useState<string>();

    const [isFocusedDescription, setFocusedDescription] = useState(false);
    const [isFilledDescription, setIsFilledDescription] = useState(false);
    const [description, setDescription] = useState<string>();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(
        [
            { label: 'Alimentos', value: 0, icon: () => <Image source={images.food} style={styles.iconStyle} resizeMode={'contain'} /> },
            { label: 'Bebidas', value: 1, icon: () => <Image source={images.drinks} style={styles.iconStyle} resizeMode={'contain'} /> },
            { label: 'Cosméticos', value: 2, icon: () => <Image source={images.cosmetic} style={styles.iconStyle} resizeMode={'contain'} /> },
            { label: 'Higiene', value: 3, icon: () => <Image source={images.hygiene} style={styles.iconStyle} resizeMode={'contain'} /> },
            { label: 'Limpeza', value: 4, icon: () => <Image source={images.cleaning} style={styles.iconStyle} resizeMode={'contain'} /> },
            { label: 'Outros', value: 5, icon: () => <Image source={images.others} style={styles.iconStyle} resizeMode={'contain'} /> },
            { label: 'Pets', value: 6, icon: () => <Image source={images.pets} style={styles.iconStyle} resizeMode={'contain'} /> },
            { label: 'Remédios', value: 7, icon: () => <Image source={images.medicine} style={styles.iconStyle} resizeMode={'contain'} /> },
            { label: 'Tintas', value: 8, icon: () => <Image source={images.paint} style={styles.iconStyle} resizeMode={'contain'} /> },

        ]
    );

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

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.container}>

                    <StatusBar
                        style={'light'}
                        backgroundColor={colors.theme}
                        translucent={false}
                        hidden={false}
                    />

                    <Header title={'Cadastrar'} showBack={true} showCalendar={true} />
                    
                        <View style={styles.content}>

                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocusedName || isFilledName) &&
                                    { borderBottomColor: colors.theme }
                                ]}
                                placeholder="Digite o nome do produto"
                                onBlur={handleInputBlurName}
                                onFocus={handleInputFocusName}
                                onChangeText={handleInputChangeName}
                                maxLength={20}
                                value={name}
                            />

                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocusedDescription || isFilledDescription) &&
                                    { borderBottomColor: colors.theme }
                                ]}
                                placeholder="Digite a descrição do produto"
                                onBlur={handleInputBlurDescription}
                                onFocus={handleInputFocusDescription}
                                onChangeText={handleInputChangeDescription}
                                maxLength={50}
                                value={description}
                            />

                            <DropDownPicker
                                placeholder={'Selecione uma categoria...'}
                                placeholderStyle={styles.pickerPlaceholder}
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                containerStyle={styles.containerPicker}
                                style={styles.picker}
                                itemSeparator={true}
                                selectedItemLabelStyle={{ fontWeight: 'bold' }}
                                listItemLabelStyle={styles.labelPicker}
                                listItemContainerStyle={styles.dropDownPicker}
                                itemSeparatorStyle={styles.itemSeparator}
                            //  onChangeItem={() => {}}
                            />

                        </View>

                </View>

            </KeyboardAvoidingView>

        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: colors.inputBorderGray,
        color: colors.text,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 0,
        textAlign: 'center',
    },

    iconStyle: {
        height: '100%',
        justifyContent: 'center',
    },

    containerPicker: {
        marginTop: 50,
    },

    picker: {
        backgroundColor: '#FFF',
        borderRadius: 6,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: colors.theme,
        elevation: 5,
        width: '100%',
        height: 60,
    },

    dropDownPicker: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: colors.theme,
        height: 60,
        paddingVertical: 10,
        width: '100%',
    },

    pickerPlaceholder: {
        fontFamily: fonts.text,
        fontSize: 20,
        color: '#B4B3B3',
    },

    itemsPicker: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 50,
    },

    labelPicker: {
        justifyContent: 'center',
        fontFamily: fonts.text,
        fontSize: 16,
        paddingVertical: 30,
        textAlign: 'left',
    },

    itemSeparator: {
        backgroundColor: colors.theme,
    }
});