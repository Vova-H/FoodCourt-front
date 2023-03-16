import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import CustomButton from "../components/UI/CustomButton";
import {mainStyles} from "../styles/global.styles";
import {useNavigation} from "@react-navigation/native";

const GetStartedScreen = () => {

    const title = "we have 5000+ review on our app "
    const subtitle = "kami memiliki ulasan 5000+ pengguna, Anda dapat memeriksa di app store"
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
                    title={"get started"}
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
