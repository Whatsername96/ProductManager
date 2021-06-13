import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import Header from '../components/Header';
import Card from '../components/Card';
import EmptyCategory from '../components/EmptyCategory';
import { loadProducts, ProductProps } from '../libs/storage';

import colors from '../styles/colors';
import images from '../styles/images';

export default function Food() {

    const [data, setData] = useState<ProductProps[]>([]);
    const foods: ProductProps[] = [];

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

    function selectFoodData() {
        data.forEach((item => {
            if (item.category === 'food') {
                foods.push(item);
            }
        }));
    }

    selectFoodData();

    return (
        <View>

            <StatusBar
                style={'light'}
                backgroundColor={colors.theme}
                translucent={false}
                hidden={false}
            />

            <Header title={'Alimentos'} showBack={true} showCalendar={true} />

            <View style={styles.container}>

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