import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {mainStyles} from "../styles/global.styles";
import theme from "../../theme";
import LoginForm from "../components/forms/LoginForm";
import {i18n} from "../redux/features/LangSlice";
import {useDispatch, useSelector} from "react-redux";
import {cleanCart} from "../redux/features/CartSlice";
import {useNavigation} from "@react-navigation/native";


const LoginScreen = () => {

    const lang = useSelector(state => state.langReducer.lang)
    const locTitle = i18n.t("loginScreen.title")
    const locSubtitle = i18n.t("loginScreen.subtitle")
    const mainImg = require("../../assets/img/login.png")
    const dispatch = useDispatch()


    return (
        <View style={styles.container}>
            <Image
                style={[styles.image]}
                source={mainImg}
            />
            <View style={styles.contentWrapper}>
                <Text style={[styles.title, {fontFamily: theme.fonts.robotoBold, marginBottom: 0}]}>
                    {locTitle}
                </Text>
                <Text style={[styles.subtitle]}>
                    {locSubtitle}
                </Text>
            </View>
            <ScrollView>
                <View>
                    <LoginForm/>
                </View>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    ...mainStyles,
    container: {
        flex: 1,
        backgroundColor: theme.colors.yellow,
        alignItems: "center",
    },
    image: {
        marginTop: 20,
        marginBottom: 25,
    },
    title: {
        fontFamily: theme.fonts.robotoBold,
        color: theme.colors.black,
        textTransform: "capitalize",
        fontSize: 32,
        marginBottom: 20,
        textAlign: "center",
        justifyContent: "center",
    },

    subtitle: {
        width: "85%",
        fontFamily: theme.fonts.robotoRegular,
        lineHeight: 20,
        fontSize: 14,
        textTransform: "capitalize",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20
    },
});

export default LoginScreen;
