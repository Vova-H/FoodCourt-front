import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import CustomButton from "./UI/CustomButton";
import theme from "../../theme";

const Discount = ({active = true, title, subtitle, image}) => {
    const bgImage = require("../../assets/img/bgDiscount.png")
    return (
        active ?
            <View style={styles.container}>
                <ImageBackground source={bgImage} resizeMode="cover" style={styles.backgroundImage}>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>{subtitle}</Text>
                        <CustomButton title="Get Voucher"
                                      propsButtonStyles={styles.getVoucherBtn}
                                      propsTitleStyles={styles.getVoucherBtnTitle}
                        />
                    </View>
                    <View style={styles.imageWrapper}>
                        <Image source={image} style={styles.image} resizeMode={"contain"}/>
                    </View>
                </ImageBackground>
            </View> : null
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    backgroundImage: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%"
    },
    infoWrapper: {
        paddingLeft: 15,
        marginRight: "auto"
    },
    title: {
        marginTop: 15,
        fontFamily: theme.fonts.robotoRegular
    },
    subtitle: {
        fontSize: 26,
        fontFamily: theme.fonts.robotoBlack,
        marginBottom: 5
    },
    getVoucherBtn: {
        marginBottom: 15,
        maxWidth: "55%",
        height: "23%",
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    getVoucherBtnTitle: {
        fontSize: 12,
        fontFamily: theme.fonts.robotoMedium,
    },
    imageWrapper: {
        justifyContent: "center",

    },
    image: {
        height: 120,
        width: 120,
        marginRight: 20
    },


})

export default Discount;
