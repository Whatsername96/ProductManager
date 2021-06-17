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

export default function Pets() {

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

    function handleRemove(pet : ProductProps) {
        Alert.alert('Remover', `Deseja remover a ${pet.id}?`, [
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
                        console.log(error.message);
                        
                    }
                }
            }
        ]);
    }

    if(loading){
        return <Load />
    }

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
                                    handleRemove={() => {handleRemove(pet)}}
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