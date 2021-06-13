import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { format } from 'date-fns';

export interface ProductProps{
    id: string; //Id é o nome
    description: string;
    category: string;
    date: string;
}

interface StorageProductsProps{
    [id: string]: {
        data: ProductProps
    }
}

export async function savaProduct(product: ProductProps) : Promise<void>{
    try{
        const data = await AsyncStorage.getItem('@productmanager:products');
        const oldProducts = data ? (JSON.parse(data) as StorageProductsProps) : {};

        


    }catch(error){

        throw new Error(error);
    }
}