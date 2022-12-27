//React imports
import { View, StyleSheet, Text } from 'react-native';

//Assets imports
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function EmptyCategory() {
    return (
        <View style={styles.empty}>

            <Text style={styles.emoji}>
                😕
            </Text>

            <Text style={styles.text}>
                Não há produtos{'\n'}
                cadastrados nessa{'\n'}
                categoria
            </Text>

        </View>
    );
}
const styles = StyleSheet.create({
    empty: {
        alignItems: 'center',
        width: '100%',
        marginTop: 20,

    },

    emoji: {
        fontSize: 48,
        marginBottom: 20,
    },

    text: {
        fontFamily: fonts.text,
        fontSize: 24,
        textAlign: 'center',
        color: colors.text,
    },
});
