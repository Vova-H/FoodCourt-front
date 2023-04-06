import React, {useCallback} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from "react-native";
import {useSelector} from "react-redux";
import CartItem from "../components/UI/CartItem";
import theme from "../../theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/UI/CustomButton";
import {useCreateOrderMutation} from "../redux/services/OrdersService";

const CartScreen = () => {

    const cart = useSelector(state => state.cartReducer.cart)
    const [createOrder] = useCreateOrderMutation()

    const createOrderHandler = async (cart) => {
        const body = []
        cart.map(product => {
            body.push([{id: product[0].id}, product[1]])
        })
        const result = await createOrder(body)
        console.log(result)
        Alert.alert("Message", `${result.data.message}`)
    }

    const renderCartItem = useCallback(({item}) => (
        <CartItem product={item}/>
    ), [cart])
    return (
        <View style={styles.container}>
            <View style={{height: "80%", marginBottom: 30}}>
                {
                    cart.length ?
                        <View style={styles.itemsWrapper}>
                            <FlatList data={cart}
                                      renderItem={renderCartItem}
                                      keyExtractor={item => {
                                          return item[0].id
                                      }}
                                      numColumns={1}
                            />
                        </View>
                        :
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Ionicons name={"cart-outline"} size={40} color={"#000000"}/>
                            <Text style={styles.title}>Cart is empty</Text>
                        </View>
                }
            </View>
            <CustomButton title={"Confirm Order"} pressFunc={() => createOrderHandler(cart)}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    title: {
        fontFamily: theme.fonts.playfairDisplayBold,
        fontSize: 30,
        paddingHorizontal: 30
    }

})

export default CartScreen;
