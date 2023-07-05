import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import theme from "../../../theme";
import {useSelector} from "react-redux";
import defineCurrency from "../../helpers/defineCurrency";

const OrderListDishes = ({item}) => {
    const lang = useSelector(state => state.langReducer.lang)
    const currencies = useSelector(state => state.currencyReducer.currencies)
    const price = defineCurrency(lang, currencies, item.price)

    return (
        <View style={styles.dishesListContainer}>
            <View style={styles.dishWrapper}>
                <Text style={styles.dish}>
                    --- {item.name}
                </Text>
                <Text>x</Text>
                <Text style={{fontSize: 18}}>{item.OrdersDishesModel.quantity}</Text>
            </View>
            <Text
                style={styles.price}>( {price.price} ) {price.price * item.OrdersDishesModel.quantity} {price.sign}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    dishesListContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    dishWrapper: {
        marginRight: "auto",
        flexDirection: "row",
        alignItems: "center",
        width: "70%",
    },
    dish: {
        fontSize: 20,
        textTransform: "capitalize",
        marginRight: 5,
        maxWidth: "100%",
        fontFamily: theme.fonts.robotoRegular,
    },
    price: {
        fontFamily: theme.fonts.robotoRegular,
        fontSize: 16
    }
})

export default OrderListDishes;
