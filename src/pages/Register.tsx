import React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Register(){

    const navigation = useNavigation();

    return (
        <View>
            <Text>
                Página Cadastro de Produtos
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({

});