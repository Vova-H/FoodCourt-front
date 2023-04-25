import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import CustomButton from "../components/UI/CustomButton";
import {mainStyles} from "../styles/global.styles";
import {useNavigation} from "@react-navigation/native";
import {i18n} from "../redux/features/LangSlice";
import theme from "../../theme";

const GetStartedScreen = () => {

    const locTitle = i18n.t("getStartedScreen.title")
    const locSubtitle = i18n.t("getStartedScreen.subtitle")
    const mainImg = require("../../assets/img/preview3.png")
    const navigation = useNavigation()
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
                <Text style={styles.subtitle}>
                    {locSubtitle}
                </Text>
                <CustomButton
                    title={i18n.t("getStartedScreen.btn")}
                    pressFunc={() => navigation.navigate("WelcomeScreen")}
                />
            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    ...mainStyles,
    title:{
        width: "65%",
        fontFamily: theme.fonts.playfairDisplayBlack,
        color: theme.colors.black,
        textTransform: "capitalize",
        fontSize: 30,
        lineHeight: 40,
        marginBottom: 20,
        textAlign: "center",
        justifyContent: "center",
    }
});

export default GetStartedScreen;
