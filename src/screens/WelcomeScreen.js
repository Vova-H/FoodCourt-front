import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import CustomButton from "../components/UI/CustomButton";
import {mainStyles} from "../styles/global.styles";
import theme from "../../theme";
import {useNavigation} from "@react-navigation/native";
import {i18n} from "../redux/features/LangSlice";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../redux/features/AuthSlice";

const WelcomeScreen = () => {
    const lang = useSelector(state => state.langReducer.lang)
    const locTitle = i18n.t("welcomeScreen.title")
    const locSubtitle = i18n.t("welcomeScreen.subtitle")
    const mainImg = require("../../assets/img/welcome.png")
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const enterWithoutAuthHandler = () => {
        dispatch(logoutUser())
        navigation.navigate("UnauthorizedHomeScreen")
    }
    const enterWithAuthHandler = () => {
        dispatch(logoutUser())
        navigation.navigate("LoginScreen")
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={mainImg}
            />
            <View style={styles.contentWrapper}>
                <Text style={styles.title}>
                    {locTitle}
                </Text>
                <Text style={[styles.subtitle]}>
                    {locSubtitle}
                </Text>
                <CustomButton
                    title={i18n.t("welcomeScreen.btnView")}
                    propsButtonStyles={{marginBottom: 10}}
                    pressFunc={enterWithoutAuthHandler}
                    inActive={true}
                />
                <CustomButton
                    title={i18n.t("welcomeScreen.btnLogin")}
                    propsButtonStyles={{marginBottom: "12%"}}
                    pressFunc={enterWithAuthHandler}
                />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    ...mainStyles,
    container: {
        flex: 1,
        backgroundColor: theme.colors.yellow,
        alignItems: "center"
    },
    title: {
        width: "55%",
        fontFamily: theme.fonts.robotoBold,
        color: theme.colors.black,
        textTransform: "capitalize",
        fontSize: 32,
        lineHeight: 40,
        marginBottom: 20,
        textAlign: "center",
        justifyContent: "center",
        marginTop: 10
    },

    subtitle: {
        width: "50%",
        fontFamily: theme.fonts.robotoRegular,
        lineHeight: 20,
        fontSize: 14,
        textTransform: "capitalize",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        height: "15%",
        marginBottom: "10%"
    },
});

export default WelcomeScreen;
