import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import {
    BannerAd,
    BannerAdSize,
    TestIds
} from 'react-native-google-mobile-ads';

import Header from '../components/Header';
import Card from '../components/Card';
import EmptyCategory from '../components/EmptyCategory';
import { loadProducts, ProductProps, removeProduct } from '../libs/storage';
import { Load } from '../components/Load';

import { UNIT_ID_BANNER } from '@env';

import colors from '../styles/colors';
import images from '../styles/images';

export default function Paint() {
    const adUnitIdBanner = __DEV__ ? TestIds.APP_OPEN : UNIT_ID_BANNER;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ProductProps[]>([]);
    const paint: ProductProps[] = [];

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

    function selectPaintData() {
        data.forEach((item => {
            if (item.category === 'paint') {
                paint.push(item);
            }
        }));
    }

    selectPaintData();

    function handleRemove(paintItem: ProductProps) {
        Alert.alert('Remover', `Deseja remover ${paintItem.id}?`, [
            {
                text: 'Não',
                style: 'cancel',
            },
            {
                text: 'Sim',
                onPress: async () => {
                    try {
                        await removeProduct(paintItem.id);
                        setData((oldData) => (
                            oldData.filter((item) => item.id !== paintItem.id)
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

            <Header title={'Tintas'} showBack={true} showCalendar={false} />

            <ScrollView>

                {paint.length === 0 ?

                    <EmptyCategory />

                    :

                    <View style={styles.categoryColumn}>

                        {paint.map(paintItem => {
                            return (

                                <Card
                                    title={paintItem.id}
                                    image={images.paint}
                                    description={paintItem.description}
                                    date={paintItem.date}
                                    key={paintItem.id}
                                    handleRemove={() => { handleRemove(paintItem) }}
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