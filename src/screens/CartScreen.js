import React, {useCallback} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import CartItem from "../components/UI/CartItem";
import theme from "../../theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/UI/CustomButton";
import {useCreateOrderMutation} from "../redux/services/OrdersService";
import {useNavigation} from "@react-navigation/native";
import {cleanCart} from "../redux/features/CartSlice";
import {i18n} from "../redux/features/LangSlice";
import {useGetCartQuery, useRemoveCartMutation} from "../redux/services/CartsService";

const CartScreen = () => {

    const user = useSelector(state => state.authReducer.userFromJWT)
    const cart = useSelector(state => state.cartReducer.cart)
    const orders = useSelector(state => state.orderReducer.orders)
    const lang = useSelector(state => state.langReducer.lang)
    const dispatch = useDispatch()
    const [createOrder] = useCreateOrderMutation()
    const navigation = useNavigation()
    const locTitle = i18n.t("cartScreen.title")
    const locOrderBtn = i18n.t("cartScreen.orderBtn")
    const locLoading = i18n.t("global.loading")
    const [removeCart] = useRemoveCartMutation()
    const {data: cartFromServer, isLoading, refetch} = useGetCartQuery(user.id)

    const createOrderHandler = async (cart, clientId) => {
        const body = []
        cart.map(product => {
            body.push([{id: product[0].id}, product[1]])
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
    ), [cart, cartFromServer])
    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                {
                    isLoading ?
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text style={styles.title}>{locLoading}</Text>
                        </View>
                        :
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
                <CustomButton title={locOrderBtn} pressFunc={() => createOrderHandler(cart, user.id)}/>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.yellow
    },
    contentWrapper: {
        height: "80%",
        marginBottom: 30,
        justifyContent: "center",
    },
    title: {
        fontFamily: theme.fonts.playfairDisplayBold,
        fontSize: 30,
        paddingHorizontal: "5%"
    }
})

export default CartScreen;
