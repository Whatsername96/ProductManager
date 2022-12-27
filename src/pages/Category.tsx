//React imports
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

//Expo imports
import { StatusBar } from 'expo-status-bar';
import {
    BannerAd,
    BannerAdSize,
    InterstitialAd,
    MobileAds,
    MaxAdContentRating,
    AdEventType
} from 'react-native-google-mobile-ads';

//Components imports
import Header from '../components/Header';
import ButtonCategory from '../components/ButtonCategory';
import Button from '../components/Button';

//Internal Imports
import { UNIT_ID_BANNER, UNIT_ID_INTERSTITIAL } from '@env';

//Assets imports
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import images from '../styles/images';

export default function Category() {

    const navigation = useNavigation<NavigationProp<any>>();
    const [countShowAdsNavigate, setCountShowAdsNavigate] = useState(0);
    const [countShowAds, setCountShowAds] = useState(0);
    // useEffect(() => {
    //     //Não permite que o usuário volte à tela anterior
    //     BackHandler.addEventListener('hardwareBackPress', () => true)
    //     return () =>
    //         BackHandler.removeEventListener('hardwareBackPress', () => true)
    // }, [])

    function countToShowAdsAndGoToRoute(route: string) {
        setCountShowAdsNavigate(countShowAdsNavigate + 1);
        if (countShowAdsNavigate === 2) {
            setCountShowAdsNavigate(0);
            let adsInterstitial = InterstitialAd.createForAdRequest(UNIT_ID_INTERSTITIAL);
            adsInterstitial.load();
            adsInterstitial.addAdEventListener(AdEventType.LOADED, () => {
                adsInterstitial.show();
            });
            navigation.navigate(route);
        } else {
            navigation.navigate(route);
        }
    }

    function countToShowAdsAndNavigateToRegister() {
        setCountShowAds(countShowAds + 1);
        if (countShowAds === 2) {
            setCountShowAds(0);
            let adsInterstitial = InterstitialAd.createForAdRequest(UNIT_ID_INTERSTITIAL, {
                requestNonPersonalizedAdsOnly: false,
            });
            adsInterstitial.load();
            adsInterstitial.addAdEventListener(AdEventType.LOADED, () => {
                adsInterstitial.show();
            });
            navigation.navigate('Register');
        } else {
            navigation.navigate('Register');
        }
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
                        <ButtonCategory title={'Alimentos'} image={images.food} onPress={() => countToShowAdsAndGoToRoute('Food')} />
                        <ButtonCategory title={'Bebidas'} image={images.drinks} onPress={() => countToShowAdsAndGoToRoute('Drinks')} />
                        <ButtonCategory title={'Cosméticos'} image={images.cosmetics} onPress={() => countToShowAdsAndGoToRoute('Cosmetics')} />
                    </View>

                    <View style={styles.categoryLineOne}>
                        <ButtonCategory title={'Higiene'} image={images.hygiene} onPress={() => countToShowAdsAndGoToRoute('Hygiene')} />
                        <ButtonCategory title={'Limpeza'} image={images.cleaning} onPress={() => countToShowAdsAndGoToRoute('Cleaning')} />
                        <ButtonCategory title={'Outros'} image={images.others} onPress={() => countToShowAdsAndGoToRoute('Others')} />
                    </View>

                    <View style={styles.categoryLineOne}>
                        <ButtonCategory title={'Pets'} image={images.pets} onPress={() => countToShowAdsAndGoToRoute('Pets')} />
                        <ButtonCategory title={'Remédios'} image={images.medicine} onPress={() => countToShowAdsAndGoToRoute('Medicine')} />
                        <ButtonCategory title={'Tintas'} image={images.paint} onPress={() => countToShowAdsAndGoToRoute('Paint')} />
                    </View>

                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button title={'Cadastrar Produto'} onPress={countToShowAdsAndNavigateToRegister} />
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