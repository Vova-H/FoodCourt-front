import React, {useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import {useGetAllFavoritesQuery} from "../redux/services/DishesService";
import {useDispatch, useSelector} from "react-redux";
import {saveFavoritesDishes} from "../redux/features/DishesSlice";
import FavoritesItem from "../components/UI/FavoritesItem";
import theme from "../../theme";

const FavoriteDishesScreen = () => {

    const dispatch = useDispatch()
    const userAuth = useSelector(state => state.authReducer.userFromJWT)
    const {data, isLoading} = useGetAllFavoritesQuery(userAuth.id)
    const fav = useSelector(state => state.dishesReducer.favoriteDishes)

    useEffect(() => {
        if (!isLoading) {
            dispatch(saveFavoritesDishes(data))
        }
    }, [isLoading])

    const renderFavoritesDishes = useCallback(({item}) => (
        <FavoritesItem dish={item}/>
    ), [fav])
    return (
        <View style={styles.container}>
            {
                fav.length ?
                    <View style={styles.itemsWrapper}>
                        <FlatList data={fav}
                                  renderItem={renderFavoritesDishes}
                                  keyExtractor={item => {
                                      return item.id
                                  }}
                                  numColumns={1}
                        />
                    </View>
                    :
                    <View>
                        <Text style={styles.title}>You don't have any favorite dishes yet</Text>
                    </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    itemsWrapper: {
        paddingTop: 50
    },
    title: {
        fontFamily: theme.fonts.playfairDisplayBold,
        fontSize: 30,
        paddingHorizontal: 30
    }
})

export default FavoriteDishesScreen;
