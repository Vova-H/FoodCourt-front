import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {mainStyles} from "../styles/global.styles";
import theme from "../../theme";
import LoginForm from "../components/forms/LoginForm";

const LoginScreen = () => {

    const title = "Hello Again!"
    const subtitle = "Welcome back you’ve been missed!"
    const mainImg = require("../../assets/img/login.png")

    return (
        <View style={styles.container}>

            <Image
                style={[styles.image]}
                source={mainImg}
            />
            <View style={styles.contentWrapper}>
                <Text style={[styles.title, {fontFamily: theme.fonts.robotoBold, marginBottom: 0}]}>
                    {title}
                </Text>
                <Text style={[styles.subtitle]}>
                    {subtitle}
                </Text>
            </View>
            <View style={{marginBottom: "30%"}}>
                <LoginForm/>
            </View>

            <TouchableOpacity>
                <Text style={styles.goToRegisterLink}>
                    Don’t have an account? <Text style={{fontFamily: theme.fonts.robotoBold}}>Sign Up</Text>
                </Text>
            </TouchableOpacity>
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
    image: {
        marginTop: 20,
        marginBottom: 25,
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
    },

    subtitle: {
        width: "75%",
        fontFamily: theme.fonts.robotoRegular,
        lineHeight: 20,
        fontSize: 14,
        textTransform: "capitalize",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20
    },

    goToRegisterLink: {
        fontSize: 14,
        fontFamily: theme.fonts.robotoRegular
    }
});

export default LoginScreen;
