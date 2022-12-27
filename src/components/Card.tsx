//React imports
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    ImageSourcePropType,
    View
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

//Expo imports
import { Feather } from '@expo/vector-icons';
import {
    InterstitialAd,
    AdEventType
} from 'react-native-google-mobile-ads';

//Scripts imports
import { format } from 'date-fns';

//Internal imports
import { UNIT_ID_INTERSTITIAL } from '@env';

//Assets imports
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface BotaoLinguagemCorporalProps {
    title: string;
    image: ImageSourcePropType;
    description: string;
    date: string;
    handleRemove: Function;
}

export default function Card({ title, image, description, date, handleRemove }: BotaoLinguagemCorporalProps) {

    const [countShowAdsNavigate, setCountShowAdsNavigate] = useState(0);
    const [countAdsAndDelete, setCountAdsAndDelete] = useState(0);
    const navigation = useNavigation<NavigationProp<any>>();

    const day = format(new Date(date), 'dd/MM/yyyy');

    function countToShowAdsAndGoToRoute(route: string, params: Object) {
        setCountShowAdsNavigate(countShowAdsNavigate + 1);
        if (countShowAdsNavigate === 2) {
            setCountShowAdsNavigate(0);
            let adsInterstitial = InterstitialAd.createForAdRequest(UNIT_ID_INTERSTITIAL, {
                requestNonPersonalizedAdsOnly: false,
            });
            adsInterstitial.load();
            adsInterstitial.addAdEventListener(AdEventType.LOADED, () => {
                adsInterstitial.show();
            });
            navigation.navigate(route, params);
        } else {
            navigation.navigate(route, params);
        }
    }

    function countToShowAdsAndDelete() {
        setCountAdsAndDelete(countAdsAndDelete + 1);
        if (countAdsAndDelete === 2) {
            setCountAdsAndDelete(0);
            let adsInterstitial = InterstitialAd.createForAdRequest(UNIT_ID_INTERSTITIAL, {
                requestNonPersonalizedAdsOnly: false,
            });
            adsInterstitial.load();
            adsInterstitial.addAdEventListener(AdEventType.LOADED, () => {
                adsInterstitial.show();
            });
            handleRemove();
        } else {
            handleRemove();
        }
    }

    function RightActions() {
        return (
            <RectButton
                style={styles.containerButton}
                activeOpacity={0.7}
                onPress={countToShowAdsAndDelete}
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
            <RectButton
                style={styles.content}
                activeOpacity={0.7}
                onPress={() => countToShowAdsAndGoToRoute('Register', { id: title, description: description, date: date })}
            >
                <Image source={image} resizeMode={'contain'} style={styles.image} />
                <View style={styles.containerTexts}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.text}>{description}</Text>
                </View>

                <View style={styles.containerDate}>
                    <Text style={styles.titleDate}>Valido até:</Text>
                    <Text style={styles.textDate}>{day}</Text>
                </View>
                <View style={styles.containerIcon}>
                    <Feather name={'chevron-left'} size={30} color={colors.gray} />
                </View>
            </RectButton>
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
        paddingHorizontal: 10,
    },

    image: {
        width: '15%',
        height: '100%',
    },

    containerTexts: {
        width: '40%',
        height: '100%',
        justifyContent: 'center',
        marginHorizontal: 10,
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
        width: '25%',
        height: '100%',
        justifyContent: 'center',
        marginHorizontal: 10,
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

    containerIcon: {
        justifyContent: 'center',
        width: '28%',
        height: '100%',
    },

    containerButton: {
        backgroundColor: colors.theme,
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    }
});