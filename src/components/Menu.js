import React, {useCallback, useEffect} from 'react';
import {FlatList} from "react-native";
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
        <MenuItem dish={item} isLoading={isLoading}/>
    ), [isLoading])

    return (
            <FlatList data={data}
                      renderItem={renderDishes}
                      keyExtractor={item => {
                          return item.id
                      }}
                      numColumns={2}
            />
    );
};


export default Menu;
