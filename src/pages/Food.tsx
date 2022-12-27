//React imports
import { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';

//Expo imports
import { StatusBar } from 'expo-status-bar';
import {
    BannerAd,
    BannerAdSize
} from 'react-native-google-mobile-ads';

//Components imports
import Header from '../components/Header';
import Card from '../components/Card';
import { Load } from '../components/Load';
import EmptyCategory from '../components/EmptyCategory';

//Internal imports
import { loadProducts, ProductProps, removeProduct } from '../libs/storage';
import { UNIT_ID_BANNER } from '@env';

//Assets imports
import colors from '../styles/colors';
import images from '../styles/images';

export default function Food() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ProductProps[]>([]);
    const foods: ProductProps[] = [];

    useEffect(() => {

        async function getData() {

            try {
                setData(await loadProducts());

            } catch (error) {

                return Alert.alert('Não foi possível carregar os produtos dessa categoria 🥺');
            }
            setLoading(false);
        }

        getData();

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

    function selectFoodData() {
        data.forEach((item => {
            if (item.category === 'food') {
                foods.push(item);
            }
        }));
    }

    selectFoodData();

    function handleRemove(food: ProductProps) {
        Alert.alert('Remover', `Deseja remover ${food.id}?`, [
            {
                text: 'Não',
                style: 'cancel',
            },
            {
                text: 'Sim',
                onPress: async () => {
                    try {
                        await removeProduct(food.id);
                        setData((oldData) => (
                            oldData.filter((item) => item.id !== food.id)
                        ));

                    } catch (error) {
                        Alert.alert('Não foi possível excluir o produto 🥺');
                    }
                }
            }
        ]);
    }

    if (loading) {
        return <Load />
    }

    return (
        <View style={styles.container}>

            <StatusBar
                style={'light'}
                backgroundColor={colors.theme}
                translucent={false}
                hidden={false}
            />

            <Header title={'Alimentos'} showBack={true} showCalendar={false} />

            <ScrollView>

                {foods.length === 0 ?
                    <EmptyCategory />

                    :

                    <View style={styles.categoryColumn}>

                        {foods.map(food => {

                            return (

                                <Card
                                    title={food.id}
                                    image={images.food}
                                    description={food.description}
                                    date={food.date}
                                    key={food.id}
                                    handleRemove={() => { handleRemove(food) }}
                                />

                            )
                        })}

                    </View>
                }

            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.container_ads}>
                    <BannerAd
                        size={BannerAdSize.FULL_BANNER}
                        unitId={UNIT_ID_BANNER} // Test ID, Replace with your-admob-unit-id
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
        width: '100%',
        backgroundColor: colors.background,
    },

    categoryColumn: {
        width: '100%',
        flexDirection: 'column',
        paddingHorizontal: 10,
        marginTop: 15,
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