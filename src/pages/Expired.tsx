import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { isBefore } from 'date-fns';

import Header from '../components/Header';
import Card from '../components/Card';
import { loadProducts, ProductProps, removeProduct } from '../libs/storage';
import { Load } from '../components/Load';

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
            if(isBefore(date, new Date())) {
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

            <Header title={'Vencidos'} showBack={true} showCalendar={false} />

            <View>

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
                                    handleRemove={() => {handleRemove(expiredItem)}}
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
});