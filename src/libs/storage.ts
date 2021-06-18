import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Notifications from 'expo-notifications';

import images from '../styles/images';

export interface ProductProps {
    id: string;
    description: string;
    category: keyof typeof images;
    date: string;
}

interface StorageProductsProps {
    [id: string]: {
        data: ProductProps,
        notificationId: string
    }
}

export async function saveProduct(product: ProductProps): Promise<void> {
    try {

        const day = new Date(product.date);
        const now =  new Date();

        const date = new Date(day.getFullYear(), day.getMonth(), day.getDate());
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const seconds = Math.abs(
            Math.ceil((today.getTime() - date.getTime()) / 1000)
        );

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Heeey 🗓️',
                body: `O produto ${product.id} vence hoje!`,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data: {
                    product
                },
            },
            trigger: {
                seconds: seconds < 60 ? 60 : seconds,

            }
        })

        const data = await AsyncStorage.getItem('@productmanager:products');
        const oldProducts = data ? (JSON.parse(data) as StorageProductsProps) : {};

        const newProduct = {
            [product.id]: {
                data: product,
                notificationId,
            }
        }

        await AsyncStorage.setItem('@productmanager:products',

            JSON.stringify({
                ...newProduct,
                ...oldProducts

            }));

    } catch (error) {

        throw new Error(error);
    }
}

export async function loadProducts(): Promise<ProductProps[]> {
    try {
        const data = await AsyncStorage.getItem('@productmanager:products');
        const products = data ? (JSON.parse(data) as StorageProductsProps) : {};

        const productsSorted = Object
            .keys(products)
            .map(product => {
                return {
                    ...products[product].data,
                }
            })
            .sort((a, b) =>
                Math.floor(
                    new Date(a.date).getTime() / 1000 -
                    Math.floor(new Date(b.date).getTime() / 1000)
                )
            );

        return productsSorted;

    } catch (error) {

        throw new Error(error);
    }
}

export async function removeProduct(id: string): Promise<void> {
    const data = await AsyncStorage.getItem('@productmanager:products');
    const products = data ? (JSON.parse(data) as StorageProductsProps) : {};

    delete products[id];

    await AsyncStorage.setItem(
        '@productmanager:products',
        JSON.stringify(products)
    );
}