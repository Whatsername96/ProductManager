import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { format } from 'date-fns';

export interface ProductProps{
    id: string;
    description: string;
    category: string;
    date: string;
}

interface StorageProductsProps{
    [id: string]: {
        data: ProductProps
    }
}

export async function saveProduct(product: ProductProps) : Promise<void>{
    try {
        const data = await AsyncStorage.getItem('@productmanager:products');
        const oldProducts = data ? (JSON.parse(data) as StorageProductsProps) : {};

        const newProduct = {
            [product.id] : {
                data: product
            }
        }

        await AsyncStorage.setItem('@productmanager:products', 

            JSON.stringify({
                ...newProduct,
                ...oldProducts

            }));

    } catch(error){

        throw new Error(error);
    }
}

export async function loadProducts() : Promise<ProductProps[]>{
    try {
        const data = await AsyncStorage.getItem('@productmanager:products');
        const products = data ? (JSON.parse(data) as StorageProductsProps) : {};

        const productsSorted = Object
        .keys(products)
        .map( product => {
            return {
                ...products[product].data,
                date: format(new Date(products[product].data.date), 'dd/MM/yyyy')
            }
        })
        .sort((a, b) =>
            Math.floor(
                new Date(a.date).getTime() / 1000 -
                Math.floor(new Date(b.date).getTime() / 1000)
            )
        );

        return productsSorted;

    } catch(error){

        throw new Error(error);
    }
}