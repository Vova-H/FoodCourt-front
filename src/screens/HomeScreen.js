import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import theme from "../../theme";
import WelcomeInfo from "../components/WelcomeInfo";
import Discount from "../components/Discount";
import Menu from "../components/Menu";
import Ionicons from "react-native-vector-icons/Ionicons";


const HomeScreen = () => {
    const image = require("../../assets/img/food1.png")
    const title = "Popular Food"
    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <View style={styles.welcomeInfoWrapper}>
                    <WelcomeInfo/>
                </View>
                <View style={styles.discountWrapper}>
                    <Discount active={true} image={image} title="Get Special Discount" subtitle="80% OFF"/>
                </View>
                <Text style={styles.title}>{title}</Text>
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
    },

    title: {
        fontFamily: theme.fonts.robotoMedium,
        fontSize: 16,
        marginBottom: 30
    }
})

export default HomeScreen;
