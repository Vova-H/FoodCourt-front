import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import theme from "../../theme";
import WelcomeInfo from "../components/WelcomeInfo";
import Discount from "../components/Discount";
import Menu from "../components/Menu";
import {useDispatch, useSelector} from "react-redux";
import {useGetUserByIdQuery} from "../redux/services/UsersService";
import {saveUser} from "../redux/features/UserSlice";
import {i18n} from "../redux/features/LangSlice";
import {useGetCartQuery} from "../redux/services/CartsService";
import {saveCartFromServer} from "../redux/features/CartSlice";
import {retry} from "@reduxjs/toolkit/query";

const imageForDisc = require("../../assets/img/food1.png")


const HomeScreen = () => {

    const dispatch = useDispatch()
    const favorites = useSelector(state => state.dishesReducer.favoriteDishes)
    const user = useSelector(state => state.authReducer.userFromJWT)
    const [isDiscount, setIsDiscount] = useState(true)
    const {data, isLoading} = useGetUserByIdQuery(user.id)
    const lang = useSelector(state => state.langReducer.lang)
    const locDiscountTitle = i18n.t("homeScreen.discount.title")
    const locDiscountOff = i18n.t("homeScreen.discount.off")
    const locMenu = i18n.t("homeScreen.menu")
    const cartFromServer = useGetCartQuery(user.id) // cartFromServer.currentData = cart[{dish}, quantity]
    const formatterServerData = (data) => {
        return data.map(product => [product[0].dish, product[1]])
    }
    useEffect(() => {
        if (!isLoading) {
            dispatch(saveUser(data))
        }
        if (!cartFromServer.isLoading) {
            dispatch(saveCartFromServer(formatterServerData(cartFromServer.currentData)))
        }
    }, [isLoading, favorites, cartFromServer.isLoading])

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <View style={styles.welcomeInfoWrapper}>
                    {data &&
                        <WelcomeInfo/>
                    }
                </View>
                {isDiscount && <View style={styles.discountWrapper}>
                    <Discount image={imageForDisc} title={locDiscountTitle} subtitle={`80% ${locDiscountOff}`}/>
                </View>}
                <Text style={styles.title}>{locMenu}</Text>
                <View style={{height: "63%", width: "100%"}}>
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

export default HomeScreen;
