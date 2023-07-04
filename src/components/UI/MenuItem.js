import React, {useEffect} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import theme from "../../../theme";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import MySpinner from "./MySpiner";


const MenuItem = ({dish, isLoading}) => {
    const navigation = useNavigation()
    const isAuth = useSelector(state => state.authReducer.isAuthorized)

    const dishDetailHandler = (isAuth) => {
        if (isAuth) {
            navigation.navigate('DishDetailScreen', {
                dish
            })
        } else {
            navigation.navigate('UnauthorizedDishDetailScreen', {
                dish
            })
        }
    }

    return (
        isLoading ?
            <View style={styles.itemContainer}>
                <MySpinner colorProps={'black'}/>
            </View> :
            <Pressable onPress={() => dishDetailHandler(isAuth)}
                       style={styles.itemContainer}
            >
                <View style={styles.imageWrapper}>
                    <Image
                        source={{uri: `data:image/jpeg;base64,${dish.image}`}}
                        resizeMode={"cover"}
                        style={styles.image}
                    />
                </View>
                <Text style={styles.title}>{dish.name}</Text>
                <Text style={styles.price}>{dish.price}$</Text>
            </Pressable>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        justifyContent: 'center',
        flexGrow: 1,
        backgroundColor: "white",
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 15,
        borderRadius: 5,
        paddingBottom: 10,
        paddingTop: 10,
        maxWidth: "47%",
    },
    imageWrapper: {
        alignSelf: "center",
        marginBottom: 10,
        width: 100,
        height: 100,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 50,
    },
    title: {
        paddingHorizontal: 10,
        fontFamily: theme.fonts.robotoRegular,
        fontSize: 14,
        textTransform: "capitalize"
    },
    price: {
        paddingHorizontal: 10,
        fontFamily: theme.fonts.robotoBold,
    }
})

export default MenuItem;
