import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {useGetAllFavoritesQuery} from "../redux/services/DishesService";
import {useDispatch, useSelector} from "react-redux";
import {saveFavoritesDishes} from "../redux/features/DishesSlice";

const FavoriteDishesScreen = () => {

    const dispatch = useDispatch()
    const userAuth = useSelector(state => state.authReducer.userFromJWT)
    const {data, isLoading} = useGetAllFavoritesQuery(userAuth.id)

    const fav = useSelector(state => state.dishesReducer.favoriteDishes)
    useEffect(() => {
        if (!isLoading) {
            dispatch(saveFavoritesDishes(data))
            console.log(fav)
        }
    }, [isLoading, fav])

    return (
        <View style={styles.container}>
            <Text>Favorite dishes</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default FavoriteDishesScreen;
