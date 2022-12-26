import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import Header from '../components/Header';
import Card from '../components/Card';
import EmptyCategory from '../components/EmptyCategory';
import { loadProducts, ProductProps, removeProduct } from '../libs/storage';
import { Load } from '../components/Load';

import colors from '../styles/colors';
import images from '../styles/images';

export default function Medicine() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ProductProps[]>([]);
    const medicine: ProductProps[] = [];

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

    function selectMedicineData() {
        data.forEach((item => {
            if (item.category === 'medicine') {
                medicine.push(item);
            }
        }));
    }

    selectMedicineData();

    function handleRemove(medicineItem: ProductProps){
        Alert.alert('Remover', `Deseja remover ${medicineItem.id}?`, [
            {
                text: 'Não',
                style: 'cancel',
            },
            { 
                text: 'Sim',
                onPress: async () => {
                    try {
                        await removeProduct(medicineItem.id);
                        setData((oldData) => (
                            oldData.filter((item) => item.id !== medicineItem.id)
                        ));

                    } catch (error) {
                        Alert.alert('Não foi possível excluir o produto 🥺');                        
                    }
                }
            }
        ]);
    }

    if(loading){
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

            <Header title={'Remédios'} showBack={true} showCalendar={false} />

            <View>

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
                                    handleRemove={() => {handleRemove(medicineItem)}}
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