import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import Menu from "../components/Menu";
import theme from "../../theme";
import Discount from "../components/Discount";
import imageForDisc from "../../assets/img/food1.png";
import WelcomeInfo from "../components/WelcomeInfo";
import {useDispatch, useSelector} from "react-redux";
import {i18n} from "../redux/features/LangSlice";
import {useGetCurrenciesQuery} from "../redux/services/CurrenciesService";
import {saveCurrencies} from "../redux/features/CurrenciesSlice";


const UnauthorizedHomeScreen = () => {
    const [isDiscount, setIsDiscount] = useState(true)
    const dispatch = useDispatch()
    const lang = useSelector(state => state.langReducer.lang)
    const locDiscountTitle = i18n.t("homeScreen.discount.title")
    const locDiscountOff = i18n.t("homeScreen.discount.off")
    const locMenu = i18n.t("homeScreen.menu")
    const currencies = useGetCurrenciesQuery()

    useEffect(() => {
        if (!currencies.isLoading && currencies.isSuccess) {
            dispatch(saveCurrencies(currencies.data))
        }
    }, [currencies.isLoading])


    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <View style={styles.welcomeInfoWrapper}>
                    <WelcomeInfo/>
                </View>
                {isDiscount && <View style={styles.discountWrapper}>
                    <Discount image={imageForDisc} title={locDiscountTitle} subtitle={`80% ${locDiscountOff}`}/>
                </View>}
                <Text style={styles.title}>{locMenu}</Text>
                <View style={{height: "62%", width: "100%"}}>
                    <Menu/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: theme.colors.gray
    },
    contentWrapper: {
        paddingHorizontal: 20,
        paddingTop: 30
    },

    welcomeInfoWrapper: {
        marginBottom: 10
    },

    discountWrapper: {
        height: "20%",
        maxHeight: "20%",
    },

    title: {
        fontFamily: theme.fonts.robotoMedium,
        fontSize: 20,
        marginBottom: 30
    }
})

export default UnauthorizedHomeScreen;
