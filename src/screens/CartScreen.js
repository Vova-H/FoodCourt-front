import React, {useCallback, useEffect} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import CartItem from "../components/UI/CartItem";
import theme from "../../theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/UI/CustomButton";
import {useCreateOrderMutation} from "../redux/services/OrdersService";
import {useNavigation} from "@react-navigation/native";
import {cleanCart, saveCartFromServer} from "../redux/features/CartSlice";
import {i18n} from "../redux/features/LangSlice";
import {saveOrders} from "../redux/features/OrdersSlice";
import {useGetCartQuery, useRemoveCartMutation, useRemoveCartQuery} from "../redux/services/CartsService";

const CartScreen = () => {

    const user = useSelector(state => state.authReducer.userFromJWT)
    const cart = useSelector(state => state.cartReducer.cart)
    const lang = useSelector(state => state.langReducer.lang)
    const dispatch = useDispatch()
    const [createOrder] = useCreateOrderMutation()
    const navigation = useNavigation()
    const locTitle = i18n.t("cartScreen.title")
    const locOrderBtn = i18n.t("cartScreen.orderBtn")
    const [removeCart] = useRemoveCartMutation()
    const {data, isLoading, refetch} = useGetCartQuery(user.id) // cartFromServer.currentData = cart[{dish}, quantity]

    useEffect(() => {
        if (!isLoading) {
            dispatch(saveOrders(data))
            // refetch()
        }
    }, [isLoading, cart, data])

    const createOrderHandler = async (cart, clientId) => {
        const body = []
        cart.map(product => {
            body.push([{id: product.dish.id}, product.quantity])
        })
        const result = await createOrder({body, clientId})
        navigation.navigate("Home")
        dispatch(cleanCart())
        refetch()
        Alert.alert("Message", `${result.data.message}`)
        await removeCart({userId: user.id})
    }

    const renderCartItem = useCallback(({item}) => (
        <CartItem product={item}/>
    ), [cart, data])
    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                {
                    cart.length ?
                        <View style={styles.itemsWrapper}>
                            <FlatList data={cart}
                                      renderItem={renderCartItem}
                                      keyExtractor={product => {
                                          return product[0].id
                                      }}
                                      numColumns={1}
                            />
                        </View>
                        :
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Ionicons name={"cart-outline"} size={40} color={"#000000"}/>
                            <Text style={styles.title}>{locTitle}</Text>
                        </View>
                }
            </View>
            {
                cart.length !== 0 &&
                <CustomButton title={locOrderBtn} pressFunc={() => createOrderHandler(data, user.id)}/>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    contentWrapper: {
        height: "80%",
        marginBottom: 30,
        justifyContent: "center"
    },
    title: {
        fontFamily: theme.fonts.playfairDisplayBold,
        fontSize: 30,
        paddingHorizontal: 30
    }

})

export default CartScreen;
