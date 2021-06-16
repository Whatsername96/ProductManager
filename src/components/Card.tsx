import React from 'react';
import {
    StyleSheet,
    Text,
    Image,
    ImageSourcePropType,
    View
} from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Feather } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

interface BotaoLinguagemCorporalProps extends RectButtonProps {
    title: string;
    image: ImageSourcePropType;
    description: string;
    date: string;
    handleRemove: () => void; 
}

export default function Card({ title, image, description, date, handleRemove, ...rest }: BotaoLinguagemCorporalProps) {

    

    function RightActions() {
        return (
            <RectButton
                style={styles.containerButton}
                activeOpacity={0.7}
                onPress={handleRemove}
                {...rest}
            >
                <Feather
                    name={"trash"}
                    color={colors.background}
                    size={32}
                />
            </RectButton>
        );
    }

    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={RightActions}
            containerStyle={styles.container}
        >
            <View style={styles.content}>
                <Image source={image} resizeMode={'contain'} style={styles.image} />
                <View style={styles.containerTexts}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.text}>{description}</Text>
                </View>
                <View style={styles.containerDate}>
                    <Text style={styles.titleDate}>Valido até:</Text>
                    <Text style={styles.textDate}>{date}</Text>
                </View>
            </View>
        </Swipeable>

    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 120,
        borderWidth: 1,
        borderColor: colors.theme,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 10,
    },

    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },

    image: {
        width: '15%',
        marginHorizontal: 10,
    },

    containerTexts: {
        width: '45%',
        marginRight: 20,
    },

    title: {
        textAlign: 'left',
        fontSize: 18,
        fontFamily: fonts.text,
        color: colors.text,
        paddingBottom: 5,
    },

    text: {
        textAlign: 'left',
        fontSize: 14,
        fontFamily: fonts.text,
        color: colors.text,
        paddingBottom: 5,
    },

    containerDate: {
        paddingHorizontal: 20,
        width: '40%'
    },

    titleDate: {
        textAlign: 'left',
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.text,
        paddingBottom: 10,
    },

    textDate: {
        textAlign: 'left',
        fontSize: 14,
        fontFamily: fonts.text,
        color: colors.text,
        paddingBottom: 5,
    },

    containerButton: {
        backgroundColor: colors.theme,
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    }
});