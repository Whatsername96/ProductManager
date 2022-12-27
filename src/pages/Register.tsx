//React imports
import { useState, useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
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
    NativeModules
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

//Expo imports
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import {
    BannerAd,
    BannerAdSize
} from 'react-native-google-mobile-ads';

//Scripts imports
import { isBefore, format } from 'date-fns';

//Components imports
import Header from '../components/Header';
import Button from '../components/Button';
import ModalApp from '../components/ModalApp';

//Internal Imports
import { removeProduct, saveProduct } from '../libs/storage';
import { UNIT_ID_BANNER, UNIT_ID_INTERSTITIAL } from '@env';

//Assets imports
import colors from '../styles/colors';
import images from '../styles/images';
import fonts from '../styles/fonts';

interface ProductDetailsParams {
    id: string;
    description: string;
    date: string;
}

export default function Register() {

    const route = useRoute();
    const params = route.params as ProductDetailsParams;

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

    function handleChangeDate(event: DateTimePickerEvent, dateTime: Date | undefined) {

        if (Platform.OS == 'android') {

            setShowDatePicker(oldState => !oldState);
        }

        if (dateTime) {

            let now = new Date();
            let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            if (isBefore(dateTime, today)) {

                return Alert.alert('Erro', 'Escolha uma data no futuro!');

            } else {
                let dateTimeComp = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());

                if (dateTimeComp == today) {

                    setDate(new Date());

                } else {

                    setDate(dateTime);
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

        let now = new Date();
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if (isBefore(date, today)) {
            error = true;
        }

        if (error) {

            return Alert.alert('Erro', 'Preencha todos os campos ou confira se a data é maior ou igual a hoje.');

        } else {

            if (params) {
                try {

                    await removeProduct(params.id);

                } catch (error) {
                    console.log(error);
                }
            }

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
                setErrorMessage('Ocorreu um erro ao salvar, tente novamente.');
            }

            setModalVisible(true);
        }
    }

    useEffect(() => {

        if (params) {
            setName(params.id);
            setDescription(params.description);

            if (!isBefore(new Date(params.date), new Date())) {
                setDate(new Date(params.date));
            } else {
                setDate(new Date());
            }
        }

    }, []);

    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
                <StatusBar
                    style={'light'}
                    backgroundColor={colors.theme}
                    translucent={false}
                    hidden={false}
                />
                <Header title={'Cadastrar'} showBack={true} showCalendar={false} />

                <ScrollView nestedScrollEnabled>

                    <KeyboardAvoidingView
                        style={styles.container}
                        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : -20}
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
                                listMode={"SCROLLVIEW"}
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
                                    onChange={(event, date) => handleChangeDate(event, date)}
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
                                    onPress={handleSave}
                                />

                            </View>

                        </View>
                    </KeyboardAvoidingView>
                    {errorMessage === '' ?
                        <ModalApp
                            show={modalVisible}
                            close={() => setModalVisible(false)}
                            title={'😄'}
                            description={'Produto salvo com sucesso!'}
                            route={'Category'}
                        /> :
                        <ModalApp
                            show={modalVisible}
                            close={() => setModalVisible(false)}
                            title={'😕'}
                            description={'Ocorreu um erro. Tente mudar o nome do produto.'}
                            route={''}
                        />
                    }
                </ScrollView>

                <View style={styles.footer}>
                    <View style={styles.container_ads}>
                        <BannerAd
                            size={BannerAdSize.FULL_BANNER}
                            unitId={UNIT_ID_BANNER} // Test ID, Replace with your-admob-unit-id
                            onAdFailedToLoad={() => console.log('error')}
                            requestOptions={{
                                requestNonPersonalizedAdsOnly: false,
                            }}
                        />
                    </View>
                </View>
            </>
        </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
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
        minWidth: 80,
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
        color: colors.theme,
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
        width: '100%',
        marginBottom: 30,
    },

    footer: {
        bottom: 0,
        width: '100%',
        paddingHorizontal: 15,
        marginBottom: 0,
        paddingTop: 10,
    },

    container_ads: {
        width: '100%',
        alignItems: 'center',
    }
});