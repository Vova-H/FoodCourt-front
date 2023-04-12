import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import theme from "../../../theme";
import CustomButton from "./CustomButton";
import {useDispatch} from "react-redux";
import {loadContent, openModal} from "../../redux/features/OrderModalSlice";

const OrdersItem = ({order}) => {
    const [totalPrice, setTotalPrice] = useState(0)
    const dispatch = useDispatch()
    const calcTotalPrice = (order) => {
        order.dishes.map(dish => {
            setTotalPrice(prevState => prevState += dish.OrdersDishesModel.quantity * dish.price)
        })
    }

    const getStatus = (status) => {
        switch (status) {
            case true:
                return "Completed"
            case false:
                return "in Process"
        }
    }

    useEffect(() => {
        setTotalPrice(0)
        calcTotalPrice(order)
    }, [])

    const detailHandler = (order) => {
        dispatch(loadContent(order))
        dispatch(openModal())
    }

    return (
        order &&
        <View style={styles.orderContainer}>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.orderNumber}>№ {order.id}</Text>
                <View style={{alignItems: "flex-end"}}>
                    <Text style={styles.time}>{order.time}</Text>
                    <Text style={styles.date}>{order.date}</Text>
                </View>
            </View>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <View style={{marginRight: "auto"}}>
                    <Text style={styles.orderStatus}>Status: {getStatus(order.status)}</Text>
                    <Text style={styles.totalPrice}>Total price for pay: {totalPrice}$</Text>
                </View>
                <CustomButton title={"Details"}
                              propsButtonStyles={{width: "30%", height: "70%"}}
                              propsTitleStyles={{fontSize: 16}}
                              pressFunc={() => detailHandler(order)}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    orderContainer: {
        flex: 1,
        backgroundColor: theme.colors.gray,
        marginVertical: 10,
        minWidth: "90%",
        paddingHorizontal: 10,
        paddingVertical: 5
    },

    orderNumber: {
        marginRight: "auto",
        fontFamily: theme.fonts.latoBold,
        fontSize: 20,
    },

    date: {
        fontFamily: theme.fonts.latoRegular,
        fontSize: 16
    },

    time: {
        fontFamily: theme.fonts.latoRegular,
        fontSize: 15
    },

    orderStatus: {
        fontFamily: theme.fonts.latoRegular,
        fontSize: 15,
        marginBottom: 5
    },

    totalPrice: {
        fontFamily: theme.fonts.latoRegular,
        fontSize: 16,
        textDecorationLine: "underline"
    }
})
export default OrdersItem;
