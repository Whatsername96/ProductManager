import React, {useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, BackHandler, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import images from '../styles/images';
import ButtonCategory from '../components/ButtonCategory';

export default function Category() {

    useEffect(() => {
        //Não permite que o usuário volte à tela anterior
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
      }, [])

    const navigation = useNavigation();

    return (

        <View>

            <StatusBar
                style={'light'}
                backgroundColor={colors.theme}
                translucent={false}
                hidden={false}
            />

            <ScrollView 
                showsHorizontalScrollIndicator={false}
            >

                <View style={styles.container}>

                    <Text style={styles.text}>
                        Selecione uma categoria para ver{'\n'}
                        os produtos cadastrados ou{'\n'}
                        cadastre um novo
                    </Text>

                    <View style={styles.categoryColumn}>

                        <View style={styles.categoryLineOne}>
                            <ButtonCategory title={'Alimentos'} image={images.food} onPress={ () => navigation.navigate('Food') }/>
                            <ButtonCategory title={'Bebidas'} image={images.drinks} onPress={ () => navigation.navigate('Drinks') }/>
                            <ButtonCategory title={'Cosméticos'} image={images.cosmetic} onPress={ () => navigation.navigate('Cosmetics') }/>
                        </View>

                        <View style={styles.categoryLineOne}>
                            <ButtonCategory title={'Higiene'} image={images.hygiene} onPress={ () => navigation.navigate('Hygiene') }/>
                            <ButtonCategory title={'Limpeza'} image={images.cleaning} onPress={ () => navigation.navigate('Cleaning') }/>
                            <ButtonCategory title={'Outros'} image={images.others} onPress={ () => navigation.navigate('Others') }/>
                        </View>

                        <View style={styles.categoryLineOne}>
                            <ButtonCategory title={'Pets'} image={images.pets} onPress={ () => navigation.navigate('Pets') }/>
                            <ButtonCategory title={'Remédios'} image={images.medicine} onPress={ () => navigation.navigate('Medicine') }/>
                            <ButtonCategory title={'Tintas'} image={images.paint} onPress={ () => navigation.navigate('Paint') }/>
                        </View>

                    </View>

                </View>

            </ScrollView>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: Dimensions.get('window').height,
    },

    text: {
        fontSize: 18,
        fontFamily: fonts.text,
        textAlign: 'center',
        paddingVertical: 20,
    },

    categoryColumn: {
        height: 120,
        width: '100%',
    },

    categoryLineOne: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        justifyContent: 'space-evenly',
        paddingVertical: 10,
        width: '100%',
    }
});