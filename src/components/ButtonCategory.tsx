import React from 'react';
import { StyleSheet, 
        Text, 
        Image, 
        TouchableOpacity, 
        TouchableOpacityProps, 
        ImageSourcePropType 
    } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface BotaoLinguagemCorporalProps extends TouchableOpacityProps {
    title: string;
    image: ImageSourcePropType;
}

export default function ButtonCategory({ title, image, ...rest }: BotaoLinguagemCorporalProps) {

    return (
        <TouchableOpacity 
            activeOpacity={0.7} 
            style={styles.container} 
            {...rest}
        >
            <Image source={image} resizeMode={'contain'} />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.shape,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.theme,
        borderRadius: 10,
        width: 120,
        height: 120,
        elevation: 10,
    },

    text: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: fonts.text,
        color: colors.text,
        paddingBottom: 5,
    }
});