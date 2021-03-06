import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';

import Header from '../components/Header';
import ButtonCategory from '../components/ButtonCategory';
import Button from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import images from '../styles/images';

export default function Category() {

    const navigation = useNavigation();

    // useEffect(() => {
    //     //Não permite que o usuário volte à tela anterior
    //     BackHandler.addEventListener('hardwareBackPress', () => true)
    //     return () =>
    //         BackHandler.removeEventListener('hardwareBackPress', () => true)
    // }, [])

    function handleNavigateToRegister() {
        navigation.navigate('Register');
    }

    return (
        <>
            <StatusBar
                style={'light'}
                backgroundColor={colors.theme}
                translucent={false}
                hidden={false}
            />

            <Header title={''} showBack={true} showCalendar={true} />

            <ScrollView contentContainerStyle={styles.container}>

                <Text style={styles.text}>
                    Selecione uma categoria para ver{'\n'}
                    os produtos cadastrados ou{'\n'}
                    cadastre um novo
                </Text>

                <View style={styles.categoryColumn}>

                    <View style={styles.categoryLineOne}>
                        <ButtonCategory title={'Alimentos'} image={images.food} onPress={() => navigation.navigate('Food')} />
                        <ButtonCategory title={'Bebidas'} image={images.drinks} onPress={() => navigation.navigate('Drinks')} />
                        <ButtonCategory title={'Cosméticos'} image={images.cosmetics} onPress={() => navigation.navigate('Cosmetics')} />
                    </View>

                    <View style={styles.categoryLineOne}>
                        <ButtonCategory title={'Higiene'} image={images.hygiene} onPress={() => navigation.navigate('Hygiene')} />
                        <ButtonCategory title={'Limpeza'} image={images.cleaning} onPress={() => navigation.navigate('Cleaning')} />
                        <ButtonCategory title={'Outros'} image={images.others} onPress={() => navigation.navigate('Others')} />
                    </View>

                    <View style={styles.categoryLineOne}>
                        <ButtonCategory title={'Pets'} image={images.pets} onPress={() => navigation.navigate('Pets')} />
                        <ButtonCategory title={'Remédios'} image={images.medicine} onPress={() => navigation.navigate('Medicine')} />
                        <ButtonCategory title={'Tintas'} image={images.paint} onPress={() => navigation.navigate('Paint')} />
                    </View>

                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button title={'Cadastrar Produto'} onPress={handleNavigateToRegister} />
            </View>
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    text: {
        fontSize: 18,
        fontFamily: fonts.text,
        textAlign: 'center',
        paddingVertical: 20,
    },

    categoryColumn: {
        width: '100%',
    },

    categoryLineOne: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-evenly',
        paddingVertical: 5,
        width: '100%',
    },

    footer: {
        bottom: 0,
        width: '100%',
        paddingHorizontal: 15,
        marginBottom: 10,
    }
});