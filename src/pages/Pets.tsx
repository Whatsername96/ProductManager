//React imports
import { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';

//Expo imports
import { StatusBar } from 'expo-status-bar';
import {
    BannerAd,
    BannerAdSize,
    TestIds
} from 'react-native-google-mobile-ads';

//Components imports
import Header from '../components/Header';
import Card from '../components/Card';
import { Load } from '../components/Load';
import EmptyCategory from '../components/EmptyCategory';

//Internal imports
import { UNIT_ID_BANNER } from '@env';
import { loadProducts, ProductProps, removeProduct } from '../libs/storage';

//Assets imports
import colors from '../styles/colors';
import images from '../styles/images';

export default function Pets() {
    const adUnitIdBanner = __DEV__ ? TestIds.APP_OPEN : UNIT_ID_BANNER;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ProductProps[]>([]);
    const pets: ProductProps[] = [];

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

    }, []);

    function selectPetsData() {
        data.forEach((item => {
            if (item.category === 'pets') {
                pets.push(item);
            }
        }));
    }

    selectPetsData();

    function handleRemove(pet: ProductProps) {
        Alert.alert('Remover', `Deseja remover ${pet.id}?`, [
            {
                text: 'Não',
                style: 'cancel',
            },
            {
                text: 'Sim',
                onPress: async () => {
                    try {
                        await removeProduct(pet.id);
                        setData((oldData) => (
                            oldData.filter((item) => item.id !== pet.id)
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

            <Header title={'Pets'} showBack={true} showCalendar={false} />

            <ScrollView>

                {pets.length === 0 ?

                    <EmptyCategory />

                    :

                    <View style={styles.categoryColumn}>

                        {pets.map(pet => {
                            return (

                                <Card
                                    title={pet.id}
                                    image={images.pets}
                                    description={pet.description}
                                    date={pet.date}
                                    key={pet.id}
                                    handleRemove={() => { handleRemove(pet) }}
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
                        unitId={adUnitIdBanner} // Test ID, Replace with your-admob-unit-id
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