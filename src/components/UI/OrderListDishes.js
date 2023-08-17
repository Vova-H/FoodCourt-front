import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from "react-native";
import theme from "../../../theme";
import {useSelector} from "react-redux";
import defineCurrency from "../../helpers/defineCurrency";

const OrderListDishes = ({item, discount}) => {
    const lang = useSelector(state => state.langReducer.lang)
    const currencies = useSelector(state => state.currencyReducer.currencies)
    const price = useMemo(() => {
        if (discount) {
            return defineCurrency(lang, currencies, item.price / 2)
        }
        return defineCurrency(lang, currencies, item.price)
    }, [lang, currencies, item.price])

    return (
        <View style={styles.dishesListContainer}>
            <View style={styles.dishWrapper}>
                <Text style={styles.dish}>
                    --- {item.name}
                </Text>
                <Text>x</Text>
                <Text style={{fontSize: 18}}>{item.OrdersDishesModel.quantity}</Text>
            </View>
            {discount ?
                <Text style={styles.price}>
                    (<Text style={{textDecorationLine: "line-through"}}>{price.price * 2}</Text>
                    <Text style={{color: "red"}}>  {price.price}</Text>)
                    <Text>  {price.price * item.OrdersDishesModel.quantity} {price.sign}</Text>
                </Text>
                :
                <Text style={styles.price}>
                    <Text>({price.price}) {price.price * item.OrdersDishesModel.quantity} {price.sign}</Text>
                </Text>
            }

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
        width: "50%",
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
