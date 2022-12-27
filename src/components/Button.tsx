//React imports
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native';

//Assets imports
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
    title: string
}

export default function Button({ title, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.container}
            {...rest}
        >
            <Text style={styles.text}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.theme,
        height: 56,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 16,
        color: colors.textWhite,
        fontFamily: fonts.text,
    },
});