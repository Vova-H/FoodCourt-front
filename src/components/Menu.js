import React, {useCallback, useEffect} from 'react';
import {FlatList, View} from "react-native";
import MenuItem from "./UI/MenuItem";
import {useGetAllDishesQuery} from "../redux/services/DishesService";
import {useDispatch} from "react-redux";
import {saveDishes} from "../redux/features/DishesSlice";
import MySpinner from "./UI/MySpiner";


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
    ), [isLoading]);

    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <MySpinner colorProps={'#000'}/>
            </View>
        );
    }

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
