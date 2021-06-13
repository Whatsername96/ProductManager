import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';

import Header from '../components/Header';
import Card from '../components/Card';
import EmptyCategory from '../components/EmptyCategory';
import { loadProducts, ProductProps } from '../libs/storage';

import colors from '../styles/colors';
import images from '../styles/images';

export default function Cleaning() {

    const navigation = useNavigation();
    const [data, setData] = useState<ProductProps[]>([]);
    const cleaning: ProductProps[] = [];

    useEffect(() => {

        async function getData() {

            try {
                setData(await loadProducts());

            } catch (error) {

                return Alert.alert('Não foi possível carregar os produtos dessa categoria 🥺');
            }
        }

        getData();

    }, []);

    function selectCleaningData() {
        data.forEach((item => {
            if (item.category === 'cleaning') {
                cleaning.push(item);
            }
        }));
    }

    selectCleaningData();

    return (
        <View>

            <StatusBar
                style={'light'}
                backgroundColor={colors.theme}
                translucent={false}
                hidden={false}
            />

            <Header title={'Limpeza'} showBack={true} showCalendar={true} />

            <View style={styles.container}>

                {cleaning.length === 0 ?

                    <EmptyCategory />

                    :

                    <View style={styles.categoryColumn}>

                        {cleaning.map(cleaningItem => {
                            return (

                                <Card
                                    title={cleaningItem.id}
                                    image={images.cleaning}
                                    description={cleaningItem.description}
                                    date={cleaningItem.date}
                                    key={cleaningItem.id}
                                />

                            )
                        })}

                    </View>
                }

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: colors.background,
    },

    categoryColumn: {
        width: '100%',
        flexDirection: 'column',
        paddingHorizontal: 10,
        marginTop: 15,
    },
});