import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import theme from "../../../theme";

const OrderListDishes = ({item}) => {
    return (
        <View style={styles.dishesListContainer}>
            <View style={styles.dishWrapper}>
                <Text style={styles.dish}>
                    --- {item.name}
                </Text>
                <Text>x</Text>
                <Text style={{fontSize: 18}}>{item.OrdersDishesModel.quantity}</Text>
            </View>
            <Text style={styles.price}>( {item.price} ) {item.price * item.OrdersDishesModel.quantity} $</Text>
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
        fontSize:16
    }
})

export default OrderListDishes;
