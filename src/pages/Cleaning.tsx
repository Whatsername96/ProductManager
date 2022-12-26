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


export default function Cleaning() {
    
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ProductProps[]>([]);
    const cleaning: ProductProps[] = [];

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

    function selectCleaningData() {
        data.forEach((item => {
            if (item.category === 'cleaning') {
                cleaning.push(item);
            }
        }));
    }

    selectCleaningData();

    function handleRemove(cleaning: ProductProps) {
        Alert.alert('Remover', `Deseja remover ${cleaning.id}?`, [
            {
                text: 'Não',
                style: 'cancel',
            },
            { 
                text: 'Sim',
                onPress: async () => {
                    try {
                        await removeProduct(cleaning.id);
                        setData((oldData) => (
                            oldData.filter((item) => item.id !== cleaning.id)
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

            <Header title={'Limpeza'} showBack={true} showCalendar={false} />

            <View>

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
                                    handleRemove={() => {handleRemove(cleaningItem)}}
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