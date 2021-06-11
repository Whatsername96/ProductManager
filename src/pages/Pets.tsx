import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';

import Header from '../components/Header';
import Card from '../components/Card';
import EmptyCategory from '../components/EmptyCategory';

import colors from '../styles/colors';
import images from '../styles/images';

//Colocar 65 de tamanho máximo de caracteres na descricao

export default function Pets() {

    const navigation = useNavigation();
    const [data, setData] = useState({});

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
                {data ?
                    <View style={styles.categoryColumn}>

                        <Card
                            title={'Pets'}
                            image={images.pets}
                            description={'descricao do produto descricao do produto descricao do produto'}
                            date={'10/06/2021'}
                        />

                        <Card
                            title={'Pets'}
                            image={images.pets}
                            description={'descricao do produto'}
                            date={'10/06/2021'}
                        />

                        <Card
                            title={'Pets'}
                            image={images.pets}
                            description={'descricao do produto'}
                            date={'10/06/2021'}
                        />

                    </View> :

                    <EmptyCategory />
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