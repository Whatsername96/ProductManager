import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';

import colors from '../styles/colors';

import images from '../styles/images';
import Card from '../components/Card';

//Colocar 65 de tamanho máximo de caracteres na descricao

export default function Food() {

    const navigation = useNavigation();

    return (
        <View>
            <StatusBar
                style={'light'}
                backgroundColor={colors.theme}
                translucent={false}
                hidden={false}
            />

            <View style={styles.container}>
                <View style={styles.categoryColumn}>
                    <Card
                        title={'Alimentos'}
                        image={images.food}
                        description={'descricao do alimento descricao do alimento descricao do alimento'}
                        date={'10/06/2021'}
                    />
                    <Card
                        title={'Alimentos'}
                        image={images.food}
                        description={'descricao do alimento'}
                        date={'10/06/2021'}
                    />
                    <Card
                        title={'Alimentos'}
                        image={images.food}
                        description={'descricao do alimento'}
                        date={'10/06/2021'}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },

    categoryColumn: {
        width: '100%',
        flexDirection: 'column',
        paddingHorizontal: 10,
        marginTop: 15,
    },
});