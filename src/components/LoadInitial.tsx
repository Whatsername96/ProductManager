import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import loadingAnimation from '../images/loading_purple.json';
import colors from '../styles/colors';

export function LoadInitial() {
    return (
        <View style={styles.container}>
            <LottieView
                source={loadingAnimation}
                autoPlay
                loop
                style={styles.animation}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    animation: {
        backgroundColor: colors.background,
    }
});