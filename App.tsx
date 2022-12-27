import 'react-native-gesture-handler';
import { View, StyleSheet } from 'react-native';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';

import Routes from './src/routes/routes';
import { LoadInitial } from './src/components/LoadInitial';

export default function App() {

  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  return (
    <View style={styles.container}>
      {
        fontsLoaded ? <Routes /> : <LoadInitial />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})