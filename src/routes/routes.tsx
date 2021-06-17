import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../pages/Welcome';
import UserIdentification from '../pages/UserIdentification';
import Confirmation from '../pages/Confirmation';
import Category from '../pages/Category';
import Food from '../pages/Food';

import colors from '../styles/colors';
import Drinks from '../pages/Drinks';
import Cosmetics from '../pages/Cosmetics';
import Hygiene from '../pages/Hygiene';
import Cleaning from '../pages/Cleaning';
import Others from '../pages/Others';
import Pets from '../pages/Pets';
import Medicine from '../pages/Medicine';
import Paint from '../pages/Paint';
import Expired from '../pages/Expired';
import Register from '../pages/Register';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: colors.background } }} >
                <Screen
                    name={'Welcome'}
                    component={Welcome}
                />

                <Screen
                    name={'UserIdentification'}
                    component={UserIdentification}
                />

                <Screen
                    name={'Confirmation'}
                    component={Confirmation}
                />

                <Screen
                    name={'Category'}
                    component={Category}
                />

                <Screen
                    name={'Register'}
                    component={Register}
                />

                <Screen
                    name={'Food'}
                    component={Food}
                />

                <Screen
                    name={'Drinks'}
                    component={Drinks}
                />

                <Screen
                    name={'Cosmetics'}
                    component={Cosmetics}
                />

                <Screen
                    name={'Hygiene'}
                    component={Hygiene}
                />

                <Screen
                    name={'Cleaning'}
                    component={Cleaning}
                />

                <Screen
                    name={'Others'}
                    component={Others}
                />

                <Screen
                    name={'Pets'}
                    component={Pets}
                />

                <Screen
                    name={'Medicine'}
                    component={Medicine}
                />

                <Screen
                    name={'Paint'}
                    component={Paint}

                />

                <Screen
                    name={'Expired'}
                    component={Expired}

                />

            </Navigator>
        </NavigationContainer>
    )
}
