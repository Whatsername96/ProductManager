import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Feather } from '@expo/vector-icons';

import colors from '../styles/colors';

import Schedule from '../pages/Schedule';

import Register from '../pages/Register';
import Category from '../pages/Category';

const { Navigator, Screen } = createBottomTabNavigator();

export function TabRoutes() {
    return (
        <Navigator
            tabBarOptions={{
                activeTintColor: colors.theme,
                inactiveTintColor: colors.gray,
                labelPosition: 'beside-icon',
                style: {
                    height: 70,
                    width: '100%',
                    backgroundColor: colors.background,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderTopColor: colors.theme,
                },
            }}>

            <Screen
                name={'Categorias'}
                component={Category}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <Feather name={'home'} size={size} color={color}/>
                    )),
                   
                }}
            />


            <Screen
                name={'Mudar Horário'}
                component={Schedule}
                options={{
                    tabBarVisible: false,
                    tabBarIcon: (({ size, color }) => (
                        <Feather name={'clock'} size={size} color={color}/>
                    ))
                }}
            />

            <Screen
                name={'Cadastrar'}
                component={Register}
                options={{
                    tabBarVisible: false,
                    tabBarIcon: (({ size, color }) => (
                        <Feather name={'plus'} size={size} color={color} />
                    ))
                }}
            />

        </Navigator>
    );
}