import React, {useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import {useGetAllFavoritesQuery} from "../redux/services/DishesService";
import {useDispatch, useSelector} from "react-redux";
import {saveFavoritesDishes} from "../redux/features/DishesSlice";
import FavoritesItem from "../components/UI/FavoritesItem";
import theme from "../../theme";
import {i18n} from "../redux/features/LangSlice";

const FavoriteDishesScreen = () => {

    const dispatch = useDispatch()
    const userAuth = useSelector(state => state.authReducer.userFromJWT)
    const lang = useSelector(state => state.langReducer.lang)
    const {data, isLoading} = useGetAllFavoritesQuery({"id": userAuth.id, lang})
    const fav = useSelector(state => state.dishesReducer.favoriteDishes)
    const locTitle = i18n.t("favoritesScreen.title")
    const locLoading = i18n.t("global.loading")

    useEffect(() => {
        if (!isLoading) {
            dispatch(saveFavoritesDishes(data))
        }
    }, [isLoading])

    const renderFavoritesDishes = useCallback(({item}) => (
        <FavoritesItem dish={item}/>
    ), [fav, data])
    return (
        <View style={styles.container}>
            {
                isLoading ?
                    <View style={styles.itemsWrapper}>
                        <Text style={styles.title}>{locLoading}</Text>
                    </View>
                    :
                    fav && fav.length ?
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
                            <Text style={styles.title}>{locTitle}</Text>
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
        backgroundColor: theme.colors.yellow
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
