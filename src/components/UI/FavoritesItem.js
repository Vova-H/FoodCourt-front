import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import theme from "../../../theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useDispatch, useSelector} from "react-redux";
import {removeFavoriteDish} from "../../redux/features/DishesSlice";
import {useRemoveFromFavoritesMutation} from "../../redux/services/DishesService";
import defineCurrency from "../../helpers/defineCurrency";


const FavoritesItem = ({dish}) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const user = useSelector(state => state.authReducer.userFromJWT)
    const [removeFromFavorites] = useRemoveFromFavoritesMutation()
    const lang = useSelector(state => state.langReducer.lang)
    const currencies = useSelector(state => state.currencyReducer.currencies)
    const price = defineCurrency(lang, currencies, dish.price)

    const removeFromFavoriteHandler = async (userId, dishId) => {
        await removeFromFavorites({userId, dishId})
        await dispatch(removeFavoriteDish(dishId))
    }

    return (
        <Pressable onPress={() => {
            navigation.navigate('DishDetailScreen', {
                dish
            })
        }} style={styles.itemContainer}
        >
            <View style={styles.imageWrapper}>
                <Image
                    source={{uri: `data:image/jpeg;base64,${dish.image}`}}
                    resizeMode={"cover"}
                    style={styles.image}
                />
            </View>
            <View style={{marginRight: "auto"}}>
                <Text style={styles.title}>{dish.name}</Text>
                <Text style={styles.price}>{price.price} {price.sign}</Text>
            </View>
            <TouchableOpacity
                onPress={() => removeFromFavoriteHandler(user.id, dish.id)}
            >
                <Ionicons name={"remove"} size={40} color={"#000000"}/>
            </TouchableOpacity>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: theme.colors.yellow,
        minWidth: "90%",
        flexDirection: "row",
        marginBottom: 20,
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderStyle: "solid",
        borderWidth: 2
    },
    imageWrapper: {
        width: 100,
        height: 100,
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
        fontSize: 22,
        marginBottom: 5,
        maxWidth: 130,
        textTransform: "capitalize"
    },
    price: {
        paddingHorizontal: 10,
        fontFamily: theme.fonts.robotoBold,
        fontSize: 18,
    }
});


export default FavoritesItem;
