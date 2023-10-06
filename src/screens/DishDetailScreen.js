import React, {useEffect, useState} from 'react';
import {Alert, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import theme from "../../theme";
import DishCounter from "../components/DishCounter";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {
    useAddToFavoritesMutation,
    useCheckIsFavoritesMutation,
    useRemoveFromFavoritesMutation
} from "../redux/services/DishesService";
import {addFavoriteDish, removeFavoriteDish} from "../redux/features/DishesSlice";
import CustomButton from "../components/UI/CustomButton";
import {i18n} from "../redux/features/LangSlice";
import {useAddCartMutation} from "../redux/services/CartsService";
import defineCurrency from "../helpers/defineCurrency";
import {formatterServerData} from "../helpers/formaterServerData";
import {saveCartFromServer} from "../redux/features/CartSlice";

const headerImg = require("../../assets/img/MenuItemHeader.png")
const flame = require("../../assets/img/Flame.png")


const DishDetailScreen = (props) => {
    const dish = props.route.params.dish
    const user = useSelector(state => state.authReducer.userFromJWT)
    const lang = useSelector(state => state.langReducer.lang)
    const currencies = useSelector(state => state.currencyReducer.currencies)
    const discount = useSelector(state => state.dishesReducer.discount)
    const navigation = useNavigation()
    const price = () => {
        if (discount) {
            return defineCurrency(lang, currencies, dish.price / 2)
        }
        return defineCurrency(lang, currencies, dish.price)
    }
    const [checkIsFavorites] = useCheckIsFavoritesMutation()
    const [addCart] = useAddCartMutation()
    const [addToFavorites] = useAddToFavoritesMutation()
    const [removeFromFavorites] = useRemoveFromFavoritesMutation()
    const dispatch = useDispatch()
    const [, setTotalPrice] = useState(price())
    const [quantity, setQuantity] = useState(1)
    const [isLiked, setIsLiked] = useState(false)
    const cart = useSelector(state => state.cartReducer.cart)
    const locPlaceOrder = i18n.t("homeScreen.placeOrder")
    const locExistDishErrTitle = i18n.t("modals.dishDetails.existDishErr.title")
    const locExistDishErrMessage = i18n.t("modals.dishDetails.existDishErr.message")
    const locDishDetail = i18n.t("dishDetails.foodDetail")

    const checkingIsFavorites = async (userId, dishId) => {
        return await checkIsFavorites(userId, dishId)
    }
    const addFavoriteHandler = async (userId, dishId) => {
        const result = await addToFavorites({userId: userId, dishId: dishId})
        dispatch(addFavoriteDish(dish))
        setIsLiked(result.data)
    }
    const removeFavoriteHandler = async (userId, dishId) => {
        const result = await removeFromFavorites({userId: userId, dishId: dishId})
        dispatch(removeFavoriteDish(dishId))
        setIsLiked(result.data)
    }

    const addToCartHelper = async (dish, quantity) => {
        let error = false
        cart.map(cartItem => {
            if (cartItem[0].id === dish.id) {
                error = true
            }
        })
        if (error === false) {
            const updatedCart = await addCart({dishId: dish.id, userId: user.id, quantity: quantity, lang: lang})
            const formattedUpdatedCart = await formatterServerData(updatedCart.data)
            await dispatch(saveCartFromServer(formattedUpdatedCart))
            navigation.navigate("Cart")
        } else {
            Alert.alert(locExistDishErrTitle, locExistDishErrMessage)
        }


    }

    useEffect(() => {
        checkingIsFavorites({userId: user.id, dishId: dish.id}).then(res => setIsLiked(res.data))
    }, [isLiked])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ImageBackground source={headerImg}
                                 style={styles.headerImg}
                >
                    <View style={styles.headerIcons}>
                        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                            <Ionicons name={"md-arrow-back"} size={40} color="#000"/>
                        </TouchableOpacity>
                        {isLiked ?
                            <TouchableOpacity onPress={() => removeFavoriteHandler(user.id, dish.id)}>
                                <Ionicons name={"heart"} size={40} color="#000"/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => addFavoriteHandler(user.id, dish.id)}>
                                <Ionicons name={"heart-outline"} size={40} color="#000"/>
                            </TouchableOpacity>
                        }
                    </View>
                    <View><Text style={styles.headerTitle}>{dish.name}</Text></View>
                    <View>
                        <Text style={styles.headerSubtitle}>
                            <Image source={flame}/> {dish.calories} - kcal {dish.weight}g
                        </Text>
                    </View>
                    <View style={{alignItems: "center"}}>
                        <Image
                            source={{uri: `data:image/jpeg;base64,${dish.image}`}}
                            style={styles.dishImage}
                        />
                    </View>
                    <DishCounter price={price()}
                                 quantity={quantity}
                                 setTotalPrice={setTotalPrice}
                                 setQuantity={setQuantity}
                    />
                    <View>
                        <Text style={styles.detailTitle}>{locDishDetail}</Text>
                        <Text style={styles.detailDescription}>{dish.description}</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.orderBtnWrapper}>
                <CustomButton title={locPlaceOrder}
                              propsButtonStyles={styles.orderBtn}
                              pressFunc={() => addToCartHelper(dish, quantity)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },
    header: {},
    headerImg: {
        height: "80%",
        maxHeight: "83%",
        paddingTop: 40,
        paddingHorizontal: 30
    },
    headerIcons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "10%"
    },
    headerTitle: {
        textAlign: "center",
        marginBottom: 5,
        fontFamily: theme.fonts.robotoBold,
        fontSize: 24,
        letterSpacing: 1
    },
    headerSubtitle: {
        textAlign: "center",
        marginBottom: "10%",
        fontFamily: theme.fonts.robotoRegular,
        fontSize: 16,
        opacity: .9,
        letterSpacing: 1
    },
    dishImage: {
        width: 250,
        height: 250,
        borderRadius: 125,
        marginBottom: 25
    },
    detailTitle: {
        fontFamily: theme.fonts.robotoMedium,
        fontSize: 20,
        marginBottom: 5
    },
    detailDescription: {
        fontFamily: theme.fonts.robotoRegular,
        fontSize: 15
    },
    orderBtnWrapper: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        flex: 1,
        bottom: 10,
        right: 0,
        left: 0
    },
    orderBtn: {}
})

export default DishDetailScreen;
