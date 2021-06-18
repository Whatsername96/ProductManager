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

export default function Others() {
    
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ProductProps[]>([]);
    const others: ProductProps[] = [];

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

    function selectOthersData() {
        data.forEach((item => {
            if (item.category === 'others') {
                others.push(item);
            }
        }));
    }

    selectOthersData();

    function handleRemove(other: ProductProps){
        Alert.alert('Remover', `Deseja remover a ${other.id}?`, [
            {
                text: 'Não',
                style: 'cancel',
            },
            { 
                text: 'Sim',
                onPress: async () => {
                    try {
                        await removeProduct(other.id);
                        setData((oldData) => (
                            oldData.filter((item) => item.id !== other.id)
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

            <Header title={'Outros'} showBack={true} showCalendar={false} />

            <View style={styles.container}>

                {others.length === 0 ?

                    <EmptyCategory />

                    :

                    <View style={styles.categoryColumn}>

                        {others.map(other => {
                            return (

                                <Card
                                    title={other.id}
                                    image={images.others}
                                    description={other.description}
                                    date={other.date}
                                    key={other.id}
                                    handleRemove={() => {handleRemove(other)}}
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