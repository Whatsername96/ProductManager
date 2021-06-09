import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../pages/Welcome';
import UserIdentification from '../pages/UserIdentification';


const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: true}}>
                <Screen
                    name={"Welcome"}
                    component={Welcome}
                    options={{ headerShown: false }}
                />
                
                <Screen
                    name={"UserIdentification"}
                    component={UserIdentification}
                    options={{ headerShown: false }}
                />
                {/* <Screen
                    name={"Denunciar"}
                    component={Denunciar}
                    options={{
                        header: () => <Header title={'Denunciar'} logo={false} showBack={true} showEmergency={true} />
                    }}
                /> */}
            </Navigator>
        </NavigationContainer>
    )
}
