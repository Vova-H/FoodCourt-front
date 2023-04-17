import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import theme from "../../../theme";
import CustomButton from "./CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {loadContent, openModal} from "../../redux/features/OrderModalSlice";
import {i18n} from "../../redux/features/LangSlice";

const OrdersItem = ({order}) => {
    const [totalPrice, setTotalPrice] = useState(0)
    const dispatch = useDispatch()
    const lang = useSelector(state => state.langReducer.lang)
    const locStatus = i18n.t("myOrdersScreen.status")
    const locStatusValue1 = i18n.t("myOrdersScreen.statusValue1")
    const locStatusValue2 = i18n.t("myOrdersScreen.statusValue2")
    const locDetailsBtn = i18n.t("myOrdersScreen.detailsBtn")
    const locTotalPrice = i18n.t("myOrdersScreen.totalPrice")

    const calcTotalPrice = (order) => {
        order.dishes.map(dish => {
            setTotalPrice(prevState => prevState += dish.OrdersDishesModel.quantity * dish.price)
        })
    }

    const getStatus = (status) => {
        switch (status) {
            case true:
                return locStatusValue1
            case false:
                return locStatusValue2
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
                    <Text style={styles.orderStatus}>{locStatus}: {getStatus(order.status)}</Text>
                    <Text style={styles.totalPrice}>{locTotalPrice}: {totalPrice}$</Text>
                </View>
                <CustomButton title={locDetailsBtn}
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
