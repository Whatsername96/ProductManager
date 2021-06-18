import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import fonts from '../styles/fonts';
import colors from '../styles/colors';

interface ModalAppProps {
    show: boolean;
    close: Function;
    title: string;
    description?: string;
}

export default function ModalApp({
    show,
    close,
    title,
    description,
}: ModalAppProps) {

    const [modal, setModal] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        setModal(show);
    }, [show]);

    if (show) {

        return (

            <Modal
                animationType="fade"
                statusBarTranslucent
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    navigation.navigate('Category');
                }}
            >
                <View style={styles.modalContainer}>

                    <View style={styles.modalView}>

                        {title && <Text style={styles.modalTitle}>{title}</Text>}
                        {description && <Text style={styles.modalText}>{description}</Text>}

                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.modalButton}
                            onPress={() => { close(!modal); navigation.navigate('Category'); }}
                        >
                            <Text style={styles.modalButtonText}>Ok</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </Modal>

        )
    } else {
        return (<View style={{ width: 0, height: 0 }}></View>);
    }

}

const styles = StyleSheet.create({

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },

    modalView: {
        margin: 0,
        width: '70%',
        backgroundColor: colors.background,
        borderRadius: 6,
        padding: 30,
        alignItems: 'center',
    },

    modalTitle: {
        textAlign: 'center',
        fontSize: 48,
    },

    modalText: {
        marginVertical: 30,
        textAlign: 'center',
        color: colors.text,
        fontFamily: fonts.text,
        fontSize: 20,
    },

    modalButton: {
        backgroundColor: colors.theme,
        borderRadius: 6,
        elevation: 2,
        width: '80%',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalButtonText: {
        color: colors.textWhite,
        textAlign: 'center',
        fontFamily: fonts.text,
        fontSize: 20,
    },
})