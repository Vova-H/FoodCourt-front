import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import theme from "../../../theme";
import {useDispatch, useSelector} from "react-redux";
import {changeQuantityProduct, removeFromCart} from "../../redux/features/CartSlice";
import {useGetCartQuery, useRemoveOneFromCartMutation} from "../../redux/services/CartsService";

const CartItem = ({product}) => {
    const dish = product[0]
    const quantity = product[1]
    const user = useSelector(state => state.authReducer.userFromJWT)
    const dispatch = useDispatch()
    const [removeOneFromCart] = useRemoveOneFromCartMutation()
    const [stateQuantity, setStateQuantity] = useState(quantity)
    const increaseQuantity = () => {
        setStateQuantity(stateQuantity + 1)
        dispatch(changeQuantityProduct({dishId: dish.id, quantity: stateQuantity + 1}))
    }
    const decreaseQuantity = () => {
        if (stateQuantity > 1) {
            setStateQuantity(stateQuantity - 1)
            dispatch(changeQuantityProduct({dishId: dish.id, quantity: stateQuantity - 1}))
        }
    }

    const removeFromCartHandler = (dishId, userId) => {
        dispatch(removeFromCart(dishId))
        removeOneFromCart({cartItemId: dishId, userId: userId})
    }

    return (
        <View style={styles.itemContainer}>
            <View style={styles.imageWrapper}>
                <Image
                    source={{uri: `data:image/jpeg;base64,${dish.image}`}}
                    resizeMode={"cover"}
                    style={styles.image}
                />
            </View>
            <View style={{marginRight: "auto"}}>
                <Text style={styles.title}>{dish.name}</Text>
                <Text style={styles.price}>{dish.price * stateQuantity}$</Text>
            </View>
            <TouchableOpacity onPress={() => decreaseQuantity(quantity)}>
                <Ionicons name={"remove"} size={40} color={"#000000"}/>
            </TouchableOpacity>
            <Text style={styles.quantity}>{stateQuantity}</Text>
            <TouchableOpacity onPress={() => increaseQuantity(quantity)}>
                <Ionicons name={"add"} size={40} color={"#000000"}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeFromCartHandler(dish.id, user.id)}
                              style={{marginLeft: 10}}>
                <Ionicons name={"trash"} size={30} color={"#000000"}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: theme.colors.yellow,
        minWidth: "90%",
        flexDirection: "row",
        marginBottom: 20,
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderStyle: "solid",
        borderWidth: 2
    },
    imageWrapper: {
        width: 50,
        height: 50,
        marginRight: 20
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 50,
    },
    title: {
        paddingHorizontal: 10,
        fontFamily: theme.fonts.robotoRegular,
        fontSize: 24,
        textTransform: "capitalize",
        marginBottom: 5,
        width: 130,
        flexWrap:"wrap"
    },
    price: {
        paddingHorizontal: 10,
        fontFamily: theme.fonts.robotoBold,
        fontSize: 18,
    },
    quantity: {
        fontFamily: theme.fonts.latoRegular,
        fontSize: 20,
        marginHorizontal: 10
    }

})

export default CartItem;
