import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, TextInput, View} from "react-native";
import MenuItem from "./UI/MenuItem";
import {useGetAllDishesQuery, useGetDishesByKeywordsMutation} from "../redux/services/DishesService";
import {useDispatch, useSelector} from "react-redux";
import {saveDishes} from "../redux/features/DishesSlice";
import MySpinner from "./UI/MySpiner";


const Menu = () => {
    const dispatch = useDispatch();
    const lang = useSelector(state => state.langReducer.lang)
    const user = useSelector(state => state.authReducer.userFromJWT)
    const [getDishesByKeywords] = useGetDishesByKeywordsMutation()
    const [searchQuery, setSearchQuery] = useState('');
    const dishesFromSlice = useSelector(state => state.dishesReducer.dishes)
    const {isLoading} = useGetAllDishesQuery({lang: lang, userId: user.id ? user.id : 0})
    const searchDishesHandler = async () => {
        return getDishesByKeywords({lang, words: searchQuery, userId: user.id ? user.id : 0})
    }
    useEffect(() => {
        const delayTimer = setTimeout(() => {
            searchDishesHandler().then(res => {
                dispatch(saveDishes(res.data))
            })
        }, 1000);
        return () => clearTimeout(delayTimer);
    }, [searchQuery, lang]);

    const renderDishes = useCallback(({item}) => (
        <MenuItem dish={item} isLoading={isLoading}/>
    ), [isLoading]);

    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <MySpinner colorProps={'#000'}/>
            </View>
        );
    }

    return (
        <View>
            <View style={styles.searchInputWrapper}>
                <TextInput
                    placeholder="Введите текст"
                    cursorColor={"black"}
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                />
            </View>
            <FlatList data={dishesFromSlice}
                      renderItem={renderDishes}
                      keyExtractor={item => {
                          return item.id
                      }}
                      numColumns={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchInputWrapper: {
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: .5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    searchInput: {}
})

export default Menu;
