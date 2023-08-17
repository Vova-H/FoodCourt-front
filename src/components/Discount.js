import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import CustomButton from "./UI/CustomButton";
import theme from "../../theme";
import {i18n} from "../redux/features/LangSlice";
import {useDispatch, useSelector} from "react-redux";
import {changeDiscountStatus} from "../redux/features/AuthSlice";
import {hideDiscount} from "../redux/features/DishesSlice";
import {useChangeDiscountStatusMutation} from "../redux/services/UsersService";

const Discount = ({title, subtitle, image}) => {
    const lang = useSelector(state => state.langReducer.lang)
    const bgImage = require("../../assets/img/bgDiscount.png")
    const locDiscountBtn = i18n.t("homeScreen.discount.btn")
    const dispatch = useDispatch()
    const [data] = useChangeDiscountStatusMutation()
    const user = useSelector(state => state.authReducer.userFromJWT)

    const changeDiscountStatusHandler = async () => {
        dispatch(changeDiscountStatus())
        dispatch(hideDiscount())
        await data(user.id)
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={bgImage} resizeMode="cover" style={styles.backgroundImage}>
                <View style={styles.infoWrapper}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                    <CustomButton title={locDiscountBtn}
                                  propsButtonStyles={styles.getVoucherBtn}
                                  propsTitleStyles={styles.getVoucherBtnTitle}
                                  pressFunc={changeDiscountStatusHandler}
                    />
                </View>
                <View style={styles.imageWrapper}>
                    <Image
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
        maxWidth: "60%",
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
