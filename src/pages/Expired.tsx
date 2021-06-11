import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';

import Header from '../components/Header';
import Card from '../components/Card';

import colors from '../styles/colors';
import images from '../styles/images';
import fonts from '../styles/fonts';


//Colocar 65 de tamanho máximo de caracteres na descricao

export default function Expired() {

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

            <Header title={'Vencidos'} showBack={true} showCalendar={false} />

            <View style={styles.container}>

            { data ?

                <View style={styles.categoryColumn}>

                    <Card
                        title={'Alimento'}
                        image={images.food}
                        description={'descricao do produto descricao do produto descricao do produto'}
                        date={'10/06/2021'}
                    />

                    <Card
                        title={'Cosmético'}
                        image={images.cosmetic}
                        description={'descricao do produto'}
                        date={'10/06/2021'}
                    />

                    <Card
                        title={'Higiene'}
                        image={images.hygiene}
                        description={'descricao do produto'}
                        date={'10/06/2021'}
                    />

                </View> :

                <View style={styles.empty}>

                    <Text style={styles.emoji}>
                        😄
                    </Text>

                    <Text style={styles.text}>
                        Não há produtos vencidos.
                    </Text>

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