//React imports
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';

//Expo imports
import { StatusBar } from 'expo-status-bar';
import {
    BannerAd,
    BannerAdSize
} from 'react-native-google-mobile-ads';

//Scripts imports
import { isBefore } from 'date-fns';

//Components imports
import Header from '../components/Header';
import { Load } from '../components/Load';
import Card from '../components/Card';

//Internal imports
import { loadProducts, ProductProps, removeProduct } from '../libs/storage';
import { UNIT_ID_BANNER } from '@env';

//Assets imports
import colors from '../styles/colors';
import images from '../styles/images';
import fonts from '../styles/fonts';

export default function Expired() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ProductProps[]>([]);
    const expired: ProductProps[] = [];

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

    function selectExpiredData() {
        data.forEach((item => {
            let date = new Date(item.date);
            if (isBefore(date, new Date())) {
                expired.push(item);
            }
        }));

    }

    selectExpiredData();

    function handleRemove(expiredItem: ProductProps) {
        Alert.alert('Remover', `Deseja remover ${expiredItem.id}?`, [
            {
                text: 'Não',
                style: 'cancel',
            },
            {
                text: 'Sim',
                onPress: async () => {
                    try {
                        await removeProduct(expiredItem.id);
                        setData((oldData) => (
                            oldData.filter((item) => item.id !== expiredItem.id)
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

            <Header title={'Vencidos'} showBack={true} showCalendar={false} />

            <ScrollView>

                {expired.length === 0 ?

                    <View style={styles.empty}>

                        <Text style={styles.emoji}>
                            😄
                        </Text>

                        <Text style={styles.text}>
                            Não há produtos vencidos.
                        </Text>

                    </View>

                    :

                    <View style={styles.categoryColumn}>

                        {expired.map(expiredItem => {

                            return (
                                <Card
                                    title={expiredItem.id}
                                    image={images[expiredItem.category]}
                                    description={expiredItem.description}
                                    date={expiredItem.date}
                                    key={expiredItem.id}
                                    handleRemove={() => { handleRemove(expiredItem) }}
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

    empty: {
        alignItems: 'center',
        width: '100%',
        marginTop: 20,

    },

    emoji: {
        fontSize: 48,
        marginBottom: 20,
    },

    text: {
        fontFamily: fonts.text,
        fontSize: 24,
        textAlign: 'center',
        color: colors.text,
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