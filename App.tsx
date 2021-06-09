import React from 'react';
import Routes from './src/routes/routes';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';

export default function App() {

  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if(!fontsLoaded){
    return(
      <AppLoading />
    );
  }

  return (
    <Routes />
  );
}