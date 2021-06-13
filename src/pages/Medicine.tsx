import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import Header from '../components/Header';
import Card from '../components/Card';
import EmptyCategory from '../components/EmptyCategory';
import { loadProducts, ProductProps } from '../libs/storage';

import colors from '../styles/colors';
import images from '../styles/images';

export default function Medicine() {

    const [data, setData] = useState<ProductProps[]>([]);
    const medicine: ProductProps[] = [];

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

    function selectMedicineData() {
        data.forEach((item => {
            if (item.category === 'medicine') {
                medicine.push(item);
            }
        }));
    }

    selectMedicineData();

    return (
        <View>

            <StatusBar
                style={'light'}
                backgroundColor={colors.theme}
                translucent={false}
                hidden={false}
            />

            <Header title={'Remédios'} showBack={true} showCalendar={true} />

            <View style={styles.container}>

                {medicine.length === 0 ?

                    <EmptyCategory />

                    :

                    <View style={styles.categoryColumn}>

                        {medicine.map(medicineItem => {
                            return (

                                <Card
                                    title={medicineItem.id}
                                    image={images.medicine}
                                    description={medicineItem.description}
                                    date={medicineItem.date}
                                    key={medicineItem.id}
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