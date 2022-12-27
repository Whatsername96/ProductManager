//React imports
import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

//Expo imports
import { StatusBar } from 'expo-status-bar';
import {
    BannerAd,
    BannerAdSize,
    MobileAds,
    MaxAdContentRating
} from 'react-native-google-mobile-ads';

//Components imports
import Header from '../components/Header';
import ButtonCategory from '../components/ButtonCategory';
import Button from '../components/Button';

//Assets imports
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import images from '../styles/images';

export default function Category() {

    const navigation = useNavigation<NavigationProp<any>>();
    // useEffect(() => {
    //     //Não permite que o usuário volte à tela anterior
    //     BackHandler.addEventListener('hardwareBackPress', () => true)
    //     return () =>
    //         BackHandler.removeEventListener('hardwareBackPress', () => true)
    // }, [])

    function handleNavigateToRegister() {
        navigation.navigate('Register');
    }

    useEffect(() => {
        // MobileAds()
        //     .setRequestConfiguration({
        //         // Update all future requests suitable for parental guidance
        //         maxAdContentRating: MaxAdContentRating.PG,

        //         // Indicates that you want your content treated as child-directed for purposes of COPPA.
        //         tagForChildDirectedTreatment: true,

        //         // Indicates that you want the ad request to be handled in a
        //         // manner suitable for users under the age of consent.
        //         tagForUnderAgeOfConsent: true,

        //         // An array of test device IDs to allow.
        //         testDeviceIdentifiers: ['EMULATOR'],
        //     })
        //     .then(() => {
        //         // Request config successfully set!
        //     });

        // MobileAds()
        //     .initialize()
        //     .then(adapterStatuses => {
        //         // Initialization complete!
        //     });

    }, []);

    return (
        <View style={styles.container}>
            <StatusBar
                style={'light'}
                backgroundColor={colors.theme}
                translucent={false}
                hidden={false}
            />

            <Header title={''} showBack={true} showCalendar={true} />

            <ScrollView contentContainerStyle={styles.container_scroll}>

                <Text style={styles.text}>
                    Selecione uma categoria para ver{'\n'}
                    os produtos cadastrados ou{'\n'}
                    cadastre um novo
                </Text>

                <View style={styles.categoryColumn}>

                    <View style={styles.categoryLineOne}>
                        <ButtonCategory title={'Alimentos'} image={images.food} onPress={() => navigation.navigate('Food')} />
                        <ButtonCategory title={'Bebidas'} image={images.drinks} onPress={() => navigation.navigate('Drinks')} />
                        <ButtonCategory title={'Cosméticos'} image={images.cosmetics} onPress={() => navigation.navigate('Cosmetics')} />
                    </View>

                    <View style={styles.categoryLineOne}>
                        <ButtonCategory title={'Higiene'} image={images.hygiene} onPress={() => navigation.navigate('Hygiene')} />
                        <ButtonCategory title={'Limpeza'} image={images.cleaning} onPress={() => navigation.navigate('Cleaning')} />
                        <ButtonCategory title={'Outros'} image={images.others} onPress={() => navigation.navigate('Others')} />
                    </View>

                    <View style={styles.categoryLineOne}>
                        <ButtonCategory title={'Pets'} image={images.pets} onPress={() => navigation.navigate('Pets')} />
                        <ButtonCategory title={'Remédios'} image={images.medicine} onPress={() => navigation.navigate('Medicine')} />
                        <ButtonCategory title={'Tintas'} image={images.paint} onPress={() => navigation.navigate('Paint')} />
                    </View>

                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button title={'Cadastrar Produto'} onPress={handleNavigateToRegister} />
                <View style={styles.container_ads}>
                    <BannerAd
                        size={BannerAdSize.FULL_BANNER}
                        unitId="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
                        onAdFailedToLoad={() => console.log('error')}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />
                </View>

            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    container_scroll: {
        paddingBottom: 20,
    },

    text: {
        fontSize: 18,
        fontFamily: fonts.text,
        textAlign: 'center',
        paddingVertical: 20,
    },

    categoryColumn: {
        width: '100%',
    },

    categoryLineOne: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-evenly',
        paddingVertical: 5,
        width: '100%',
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
        marginTop: 10,
    }
});