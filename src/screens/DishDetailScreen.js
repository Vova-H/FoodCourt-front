import React, {useState} from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import theme from "../../theme";
import DishCounter from "../components/DishCounter";
import {useDispatch} from "react-redux";
import {addFavoriteDish, removeFavoriteDish} from "../redux/features/DishesSlice";
import {useNavigation} from "@react-navigation/native";


const DishDetailScreen = (props) => {
    const dish = props.route.params.dish
    const headerImg = require("../../assets/img/MenuItemHeader.png")
    const flame = require("../../assets/img/Flame.png")
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [, setTotalPrice] = useState(dish.price)
    const [quantity, setQuantity] = useState(1)
    const [isLiked, setIsLiked] = useState(false)

    const addFavoriteHandler = () => {
        setIsLiked(true)
        dispatch(addFavoriteDish(dish))
    }
    const removeFavoriteHandler = () => {
        setIsLiked(false)
        dispatch(removeFavoriteDish(dish))
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ImageBackground source={headerImg}
                                 style={styles.headerImg}
                >
                    <View style={styles.headerIcons}>
                        <TouchableOpacity onPress={()=>navigation.navigate("HomeScreen")}>
                            <Ionicons name={"md-arrow-back"} size={40} color="#000"/>
                        </TouchableOpacity>
                        {isLiked ?
                            <TouchableOpacity onPress={removeFavoriteHandler}>
                                <Ionicons name={"heart"} size={40} color="#000"/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={addFavoriteHandler}>
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
                    <DishCounter price={dish.price}
                                 quantity={quantity}
                                 setTotalPrice={setTotalPrice}
                                 setQuantity={setQuantity}
                    />
                    <View>
                        <Text style={styles.detailTitle}>Food Detail</Text>
                        <Text style={styles.detailDescription}>{dish.description}</Text>
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    header: {},
    headerImg: {
        height: "83%",
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
    }
})

export default DishDetailScreen;
