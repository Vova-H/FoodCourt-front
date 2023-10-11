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
import {useGetCartQuery, useRemoveCartMutation} from "../redux/services/CartsService";
import {cancelDiscount} from "../redux/features/DishesSlice";
import {formatterServerData} from "../helpers/formaterServerData";

const CartScreen = () => {

    const user = useSelector(state => state.authReducer.userFromJWT)
    const cart = useSelector(state => state.cartReducer.cart)
    const lang = useSelector(state => state.langReducer.lang)
    const dispatch = useDispatch()
    const [createOrder] = useCreateOrderMutation()
    const navigation = useNavigation()
    const locTitle = i18n.t("cartScreen.title")
    const locOrderBtn = i18n.t("cartScreen.orderBtn")
    const locMessage = i18n.t("global.message")
    const [removeCart] = useRemoveCartMutation()
    const discount = useSelector(state => state.dishesReducer.discount)
    const cartFromServer = useGetCartQuery({userId: user.id, lang: lang}, {forceRefetch: true})

    useEffect(() => {
        cartHandler()
    }, [cartFromServer]);

    useEffect(() => {
        cartFromServer.refetch()
    }, [cart?.length]);

    const cartHandler = async () => {
        if (!cartFromServer.isLoading && cartFromServer.isSuccess) {
            const formattedData = await formatterServerData(cartFromServer.currentData);
            await dispatch(saveCartFromServer(formattedData));
        }
    }


    const createOrderHandler = useCallback(async (cart, clientId) => {
        const body = []
        cart.map(product => {
            body.push([{id: product[0].id}, product[1]])
        })
        try {
            const result = await createOrder({body, clientId, lang, discount})
            await removeCart({userId: clientId})
            dispatch(cleanCart())
            await dispatch(cancelDiscount())
            navigation.navigate("Home")
            cartFromServer.refetch()
            Alert.alert(`${locMessage}`, `${result.data.message}`)
        } catch (error) {
            console.error("Error creating order:", error)
        }
    }, [cartFromServer, dispatch, user.id, lang, discount]);

    const renderCartItem = ({item}) => (
        <CartItem product={item}/>
    )
    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                {
                    cart?.length ?
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
                cart?.length !== 0 &&
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
