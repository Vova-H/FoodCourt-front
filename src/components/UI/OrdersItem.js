import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import theme from "../../../theme";
import CustomButton from "./CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {loadContent, openModal} from "../../redux/features/OrderModalSlice";
import {i18n} from "../../redux/features/LangSlice";
import defineCurrency from "../../helpers/defineCurrency";

const OrdersItem = ({order}) => {
    const [totalPrice, setTotalPrice] = useState(0)
    const dispatch = useDispatch()
    const lang = useSelector(state => state.langReducer.lang)
    const currencies = useSelector(state => state.currencyReducer.currencies)
    const locStatus = useMemo(() => i18n.t("myOrdersScreen.status"), []);
    const locStatusValue1 = useMemo(() => i18n.t("myOrdersScreen.statusValue1"), []);
    const locStatusValue2 = useMemo(() => i18n.t("myOrdersScreen.statusValue2"), []);
    const locDetailsBtn = useMemo(() => i18n.t("myOrdersScreen.detailsBtn"), []);
    const locTotalPrice = useMemo(() => i18n.t("myOrdersScreen.totalPrice"), []);
    const price = defineCurrency(lang, currencies)
    const calcTotalPrice = (order) => {
        const total = order.dishes.reduce((accumulator, dish) => {
            if (order.discount) {
                const dishPrice = defineCurrency(lang, currencies, dish.price);
                return accumulator + dish.OrdersDishesModel.quantity * (dishPrice.price / 2);
            } else {
                const dishPrice = defineCurrency(lang, currencies, dish.price);
                return accumulator + dish.OrdersDishesModel.quantity * dishPrice.price;
            }
        }, 0);
        setTotalPrice(total);
    };

    const getStatus = (status) => status ? locStatusValue1 : locStatusValue2;

    useEffect(() => {
        setTotalPrice(0)
        calcTotalPrice(order)
    }, [])

    const detailHandler = useCallback(() => {
        dispatch(loadContent(order));
        dispatch(openModal());
    }, [dispatch]);

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
                    <Text style={styles.totalPrice}>{locTotalPrice}: {totalPrice} {price.sign}</Text>
                </View>
                <CustomButton title={locDetailsBtn}
                              propsButtonStyles={{width: "30%", height: "70%"}}
                              propsTitleStyles={{fontSize: 16}}
                              pressFunc={() => detailHandler()}
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
