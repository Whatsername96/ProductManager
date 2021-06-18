import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import Header from '../components/Header';
import Card from '../components/Card';
import EmptyCategory from '../components/EmptyCategory';
import { loadProducts, ProductProps, removeProduct} from '../libs/storage';
import { Load } from '../components/Load';

import colors from '../styles/colors';
import images from '../styles/images';

export default function Paint() {
    
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ProductProps[]>([]);
    const paint: ProductProps[] = [];

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

    function selectPaintData() {
        data.forEach((item => {
            if (item.category === 'paint') {
                paint.push(item);
            }
        }));
    }

    selectPaintData();

   function handleRemove(paintItem: ProductProps) {
    Alert.alert('Remover', `Deseja remover a ${paintItem.id}?`, [
        {
            text: 'Não',
            style: 'cancel',
        },
        { 
            text: 'Sim',
            onPress: async () => {
                try {
                    await removeProduct(paintItem.id);
                    setData((oldData) => (
                        oldData.filter((item) => item.id !== paintItem.id)
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

            <Header title={'Tintas'} showBack={true} showCalendar={false} />

            <View style={styles.container}>

                {paint.length === 0 ?

                    <EmptyCategory />

                    :

                    <View style={styles.categoryColumn}>

                        {paint.map(paintItem => {
                            return (

                                <Card
                                    title={paintItem.id}
                                    image={images.paint}
                                    description={paintItem.description}
                                    date={paintItem.date}
                                    key={paintItem.id}
                                    handleRemove={() => {handleRemove(paintItem)}}
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