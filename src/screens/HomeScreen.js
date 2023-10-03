import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import theme from "../../theme";
import WelcomeInfo from "../components/WelcomeInfo";
import Discount from "../components/Discount";
import Menu from "../components/Menu";
import {useDispatch, useSelector} from "react-redux";
import {useGetUserByIdQuery} from "../redux/services/UsersService";
import {saveUser} from "../redux/features/UserSlice";
import {i18n} from "../redux/features/LangSlice";
import {useGetCurrenciesQuery} from "../redux/services/CurrenciesService";
import {saveCurrencies} from "../redux/features/CurrenciesSlice";
import MySpinner from "../components/UI/MySpiner";
import {cleanCart} from "../redux/features/CartSlice";
import {logoutUser} from "../redux/features/AuthSlice";

const imageForDisc = require("../../assets/img/food1.png")

const HomeScreen = () => {
    useSelector(state => state.langReducer.lang)
    const dispatch = useDispatch()
    const user = useSelector(state => state.authReducer.userFromJWT)
    const discount = useSelector(state => state.dishesReducer.discount)
    const {data, isLoading} = useGetUserByIdQuery(user.id)
    const locDiscountTitle = i18n.t("homeScreen.discount.title")
    const locDiscountOff = i18n.t("homeScreen.discount.off")
    const locMenu = i18n.t("homeScreen.menu")

    const currencies = useGetCurrenciesQuery()

    useEffect(() => {
        if (!isLoading) {
            dispatch(saveUser(data));
        }
        if (!currencies.isLoading && currencies.isSuccess) {
            dispatch(saveCurrencies(currencies.data));
        }
    }, [isLoading, currencies.isLoading]);


    useEffect(() => {
        return () => {
            dispatch(cleanCart());
            dispatch(logoutUser())
        };
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <View style={styles.welcomeInfoWrapper}>
                    {data ? (
                        <WelcomeInfo/>
                    ) : (
                        <MySpinner colorProps={"#000"}/>
                    )}
                </View>
                {!user.discount_is_using && !discount && (
                    <ScrollView style={styles.discountWrapper}>
                        <Discount
                            image={imageForDisc}
                            title={locDiscountTitle}
                            subtitle={`50% ${locDiscountOff}`}
                        />
                    </ScrollView>
                )}
                {!user.discount_is_using && !discount ? (
                    <View>
                        <Text style={styles.title}>{locMenu}</Text>
                        <View style={{height: "75%", width: "100%"}}>
                            <Menu/>
                        </View>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.title}>{locMenu}</Text>
                        <View style={{height: "83%", width: "100%"}}>
                            <Menu/>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.gray,
    },
    contentWrapper: {
        paddingHorizontal: 20,
        paddingTop: 30,
        flex: 1
    },
    welcomeInfoWrapper: {
        marginBottom: 10
    },
    discountWrapper: {
        height: "20%",
        minHeight: "20%",
    },
    title: {
        fontFamily: theme.fonts.robotoMedium,
        fontSize: 20,
        marginBottom: 10
    }
})

export default HomeScreen;
