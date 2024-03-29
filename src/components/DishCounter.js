import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import theme from "../../theme";

const DishCounter = ({price, quantity, setTotalPrice, setQuantity}) => {

    const minusHandler = () => {
        if (quantity > 1) {
            setQuantity(quantity => quantity - 1)
            setTotalPrice(price.price * quantity)
        }
    }
    const plusHandler = () => {
        setQuantity(quantity => quantity + 1)
        setTotalPrice(price.price * quantity)
    }

    return (
        <View style={styles.container}>
            <View style={styles.bg}>
                <Text style={styles.price}>{price.price * quantity}{price.sign}</Text>
                <View style={styles.countWrapper}>
                    <TouchableOpacity onPress={minusHandler}><Text
                        style={styles.minusBtn}>-</Text></TouchableOpacity>
                    <Text style={styles.count}>{quantity}</Text>
                    <TouchableOpacity onPress={plusHandler}><Text
                        style={styles.plusBtn}>+</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-end",
        marginBottom: Platform.OS === 'ios' ? 10 : 30,

    },
    bg: {
        height: 40,
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.yellow,
        borderRadius: 40
    },
    price: {
        width: "55%",
        textAlign: "center",
    },
    countWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        borderLeftWidth: 6,
        borderColor: "#fff",
        height: "100%",
    },

    minusBtn: {
        fontSize: 30,
        lineHeight: 35
    },
    plusBtn: {
        fontSize: 25,
    },
    count: {
        marginHorizontal: "17%",
        fontSize: 20
    }
})

export default DishCounter;
