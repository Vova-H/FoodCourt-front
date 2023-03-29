import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import CustomButton from "../components/UI/CustomButton";
import {mainStyles} from "../styles/global.styles";
import {useNavigation} from "@react-navigation/native";
import {i18n} from "../redux/features/LangSlice";

const GetStartedScreen = () => {

    const title = i18n.t("getStartedScreen.title")
    const subtitle = i18n.t("getStartedScreen.subtitle")
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
                    {title}
                </Text>
                <Text style={styles.subtitle}>
                    {subtitle}
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
    ...mainStyles
});

export default GetStartedScreen;
