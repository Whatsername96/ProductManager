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

export default function Hygiene() {

    const navigation = useNavigation();
    const [data, setData] = useState<ProductProps[]>([]);
    const pets: ProductProps[] = [];

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

    function selectPetsData() {
        data.forEach((item => {
            if (item.category === 'pets') {
                pets.push(item);
            }
        }));
    }

    selectPetsData();

    return (
        <View>

            <StatusBar
                style={'light'}
                backgroundColor={colors.theme}
                translucent={false}
                hidden={false}
            />

            <Header title={'Pets'} showBack={true} showCalendar={true} />

            <View style={styles.container}>

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