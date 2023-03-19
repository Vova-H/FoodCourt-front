import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import MyProgressBar from "./UI/MyProgressBar";
import theme from "../../theme";


const PreviewComponent = ({backgroundColor, mainImg, sideNextAriaImg, title, subtitle, activePage, nextPage}) => {
    const nextScreenBtnImg = require("../../assets/img/nextScreenBtn.png")


    return (
        <View style={[styles.container, backgroundColor && {backgroundColor: backgroundColor}]}>

            <Image style={styles.nextScreenImg}
                   source={sideNextAriaImg}
            />

            <View style={styles.nextScreenImgBtn}>
                <Image
                    source={nextScreenBtnImg}
                />
            </View>


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
                <MyProgressBar activePage={activePage}/>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            position: "relative",
            zIndex: 1
        },

        nextScreenImg: {
            position: "absolute",
            height: "100%",
            width: "31%",
            top: 0,
            right: 0,
            zIndex: 2
        },

        nextScreenImgBtn: {
            position: "absolute",
            right: 10,
            bottom: "27%",
            zIndex: 3,
        },

        image: {
            marginTop: 60,
            marginBottom: 42,
        },
        contentWrapper: {
            width: "100%",
            paddingLeft: 20
        },
        title: {
            width: "70%",
            fontFamily: theme.fonts.playfairDisplayBlack,
            color: theme.colors.black,
            textTransform: "capitalize",
            fontSize: 30,
            lineHeight: 40,
            marginBottom: 20,
        },
        subtitle: {
            width: "80%",
            height: "30%",
            fontFamily: theme.fonts.latoRegular,
            lineHeight: 20,
            fontSize: 16,
            textTransform: "capitalize",
            paddingRight: 80,
            marginBottom: 20
        },

    })
;

export default PreviewComponent;
