import React, {useCallback, useEffect} from 'react';
import {FlatList, View} from "react-native";
import MenuItem from "./UI/MenuItem";
import {useGetAllDishesQuery} from "../redux/services/DishesService";
import {useDispatch} from "react-redux";
import {saveDishes} from "../redux/features/DishesSlice";


const Menu = () => {
    const dispatch = useDispatch();
    const {data, isLoading} = useGetAllDishesQuery()
    useEffect(() => {
        if (!isLoading) {
            dispatch(saveDishes(data))
        }
    }, [isLoading])

    const renderDishes = useCallback(({item}) => (
        <MenuItem dish={item}/>
    ), [])

    return (
        <View>
            <FlatList data={data}
                      renderItem={renderDishes}
                      keyExtractor={item => {
                          return item.id
                      }}
                      numColumns={2}
            />
        </View>
    );
};


export default Menu;
