import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import theme from "../../../theme";
import MySpinner from "./MySpiner";

const width = Dimensions.get("window").width / 100 * 85
const height = Dimensions.get("window").height / 100 * 8

const CustomButton = ({title, inActive, pressFunc, propsTitleStyles, propsButtonStyles, propsIsLoading}) => {

    const _title = title ?? ""
    const _inActive = inActive ?? false
    const _propsTitleStyles = propsTitleStyles ?? null
    const _propsButtonStyles = propsButtonStyles ?? null
    const _isLoading = propsIsLoading ?? false
    const _pressFunc = pressFunc ?? function () {
        return null
    }

    return (
        _isLoading ?
            <View style={[styles.btn, _inActive && styles.inActiveBtn, _propsButtonStyles ?? null,]}>
                <MySpinner/>
            </View> :
            <TouchableOpacity
                style={[styles.btn, _inActive && styles.inActiveBtn, _propsButtonStyles ?? null,]}
                onPress={_pressFunc}
            >
                <Text
                    style={[styles.btnTitle, _inActive && styles.inActiveBtnTitle, _propsTitleStyles ?? null]}
                >
                    {_title}
                </Text>
            </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        width: width,
        height: height,
        backgroundColor: theme.colors.black,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    btnTitle: {
        color: theme.colors.wight,
        fontFamily: theme.fonts.robotoBold,
        fontSize: 19,
        lineHeight: 22,
        letterSpacing: -0.408,
        textTransform: "capitalize"
    },

    inActiveBtnTitle: {
        color: theme.colors.black,
        fontFamily: theme.fonts.robotoBold,
        fontSize: 19,
        lineHeight: 22,
        letterSpacing: -0.408,
        textTransform: "capitalize",
    },

    inActiveBtn: {
        width: width,
        height: height,
        backgroundColor: theme.colors.yellow,
        borderWidth: 2,
        borderRadius: 16,
        borderColor: theme.colors.black,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default CustomButton;
