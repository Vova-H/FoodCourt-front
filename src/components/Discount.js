import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import CustomButton from "./UI/CustomButton";
import theme from "../../theme";

const Discount = ({title, subtitle, image}) => {
    const bgImage = require("../../assets/img/bgDiscount.png")
    return (
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
                    <Image
                        // source={{uri: `data:image/jpeg;base64,${image}`}}
                        source={image}
                        style={styles.image}
                        resizeMode={"cover"}
                    />
                </View>
            </ImageBackground>
        </View>
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
        height: 100,
        width: 100,
        marginRight: 20,
        borderRadius: 50
    },


})

export default Discount;
