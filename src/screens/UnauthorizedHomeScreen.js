import React, {useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import Menu from "../components/Menu";
import theme from "../../theme";
import Discount from "../components/Discount";
import imageForDisc from "../../assets/img/food1.png";
import WelcomeInfo from "../components/WelcomeInfo";

const title = "Menu"

const UnauthorizedHomeScreen = () => {
    const [isDiscount, setIsDiscount] = useState(true)

    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <View style={styles.welcomeInfoWrapper}>
                    <WelcomeInfo/>
                </View>
                {isDiscount && <View style={styles.discountWrapper}>
                    <Discount image={imageForDisc} title="Get Special Discount" subtitle="80% OFF"/>
                </View>}
                <Text style={styles.title}>{title}</Text>
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
