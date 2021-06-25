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

export default function Drinks() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ProductProps[]>([]);
    const drinks: ProductProps[] = [];

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

    function selectDrinksData() {
        data.forEach((item => {
            if (item.category === 'drinks') {
                drinks.push(item);
            }
        }));
    }

    selectDrinksData();

    function handleRemove(drink: ProductProps){
        Alert.alert('Remover', `Deseja remover ${drink.id}?`, [
            {
                text: 'Não',
                style: 'cancel',
            },
            { 
                text: 'Sim',
                onPress: async () => {
                    try {
                        await removeProduct(drink.id);
                        setData((oldData) => (
                            oldData.filter((item) => item.id !== drink.id)
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

            <Header title={'Bebidas'} showBack={true} showCalendar={false} />

            <View style={styles.container}>

                {drinks.length === 0 ?

                    <EmptyCategory />

                    :

                    <View style={styles.categoryColumn}>

                        {drinks.map(drink => {
                            return (

                                <Card
                                    title={drink.id}
                                    image={images.drinks}
                                    description={drink.description}
                                    date={drink.date}
                                    key={drink.id}
                                    handleRemove={() => {handleRemove(drink)}}
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