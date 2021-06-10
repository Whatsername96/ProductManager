import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../pages/Welcome';
import UserIdentification from '../pages/UserIdentification';
import Schedule from '../pages/Schedule';
import Confirmation from '../pages/Confirmation';
import Category from '../pages/Category';
import Food from '../pages/Food';

import colors from '../styles/colors';
import Header from '../components/Header';
import Drinks from '../pages/Drinks';
import Cosmetics from '../pages/Cosmetics';
import Hygiene from '../pages/Hygiene';
import Cleaning from '../pages/Cleaning';
import Others from '../pages/Others';
import Pets from '../pages/Pets';
import Medicine from '../pages/Medicine';
import Paint from '../pages/Paint';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: true, cardStyle: { backgroundColor: colors.background } }} >
                <Screen
                    name={'Welcome'}
                    component={Welcome}
                    options={{ headerShown: false, detachPreviousScreen: true}}
                />

                <Screen
                    name={'UserIdentification'}
                    component={UserIdentification}
                    options={{ headerShown: false }}
                />

                <Screen
                    name={'Schedule'}
                    component={Schedule}
                    options={{ headerShown: false }}
                />

                <Screen
                    name={'Confirmation'}
                    component={Confirmation}
                    options={{ headerShown: false }}
                />

                <Screen
                    name={'Category'}
                    component={Category}
                    options={{
                        headerShown: true,
                        detachPreviousScreen: true,
                        header: () => <Header title={''} showBack={false} showCalendar={true} />
                    }}
                />
                <Screen
                    name={'Food'}
                    component={Food}
                    options={{
                        headerShown: true,
                        header: () => <Header title={'Alimentos'} showBack={true} showCalendar={true} />
                    }}
                />

                <Screen
                    name={'Drinks'}
                    component={Drinks}
                    options={{
                        headerShown: true,
                        header: () => <Header title={'Bebidas'} showBack={true} showCalendar={true} />
                    }}
                />

                <Screen
                    name={'Cosmetics'}
                    component={Cosmetics}
                    options={{
                        headerShown: true,
                        header: () => <Header title={'Cosméticos'} showBack={true} showCalendar={true} />
                    }}
                />

                <Screen
                    name={'Hygiene'}
                    component={Hygiene}
                    options={{
                        headerShown: true,
                        header: () => <Header title={'Higiene'} showBack={true} showCalendar={true} />
                    }}
                />

                <Screen
                    name={'Cleaning'}
                    component={Cleaning}
                    options={{
                        headerShown: true,
                        header: () => <Header title={'Limpeza'} showBack={true} showCalendar={true} />
                    }}
                />

                <Screen
                    name={'Others'}
                    component={Others}
                    options={{
                        headerShown: true,
                        header: () => <Header title={'Outros'} showBack={true} showCalendar={true} />
                    }}
                />

                <Screen
                    name={'Pets'}
                    component={Pets}
                    options={{
                        headerShown: true,
                        header: () => <Header title={'Pets'} showBack={true} showCalendar={true} />
                    }}
                />

                <Screen
                    name={'Medicine'}
                    component={Medicine}
                    options={{
                        headerShown: true,
                        header: () => <Header title={'Remédios'} showBack={true} showCalendar={true} />
                    }}
                />

                <Screen
                    name={'Paint'}
                    component={Paint}
                    options={{
                        headerShown: true,
                        header: () => <Header title={'Tintas'} showBack={true} showCalendar={true} />
                    }}
                />
            </Navigator>
        </NavigationContainer>
    )
}
