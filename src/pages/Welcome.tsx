//React imports
import { useEffect, useState } from 'react';
import {
    SafeAreaView, 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    Dimensions 
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Expo imports
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

//Assets imports
import purchases from '../images/purchases.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function Welcome() {

    const navigation = useNavigation<NavigationProp<any>>();
    const [name, setName] = useState<string>('');

    useEffect(() => {
        async function loadStorageUserName() {

            try {
                const user = await AsyncStorage.getItem('@productmanager:user');
                setName(user || '');
            } catch (error) {
                console.log(error);
            }

        }
        loadStorageUserName();
    }, []);

    function handleNavigateToUserIdentification(){
        navigation.navigate('UserIdentification');
    }

    function handleNavigateToCategory(){
        navigation.navigate('Category');
    }

return (
        <SafeAreaView style={styles.container}>

        <View style={styles.wrapper}>

            <StatusBar
                style={'dark'}
                backgroundColor='#FFFFFF'
                translucent={false}
                hidden={false}
            />

            <Text style={styles.title}>
                Gerencie a data de{'\n'}
                validade de seus produtos{'\n'}
                de forma simples
            </Text>

            <Image 
            source={purchases} 
            style={styles.image}     
            resizeMode={'contain'} />

            <Text style={styles.subtitle}>
                Não esqueça produtos vencidos em sua casa. 
                Nós cuidamos de lembrar você sempre que precisar
            </Text>

            <TouchableOpacity 
            style={styles.button}
            activeOpacity={0.7}
            onPress={ name == '' ? handleNavigateToUserIdentification : handleNavigateToCategory}
            >
                <Feather name='chevron-right' size={24} color="#FFF" />
            </TouchableOpacity>

            </View>

        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    wrapper: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.title,
        marginTop: 30,
        fontFamily: fonts.title,
        lineHeight: 34,
    },

    image: {
        height: Dimensions.get('window').width * 0.7,
    },

    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.text,
        fontFamily: fonts.text,
    },

    button: {
        backgroundColor: colors.theme,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 40,
        height: 56,
        width: 56,
    }

});