import React, {useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, View} from "react-native";
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
        <View style={styles.container}>
            <FlatList data={data}
                      renderItem={renderDishes}
                      keyExtractor={item => {
                          return item.id
                      }}
                      numColumns={2}
                      columnWrapperStyle={{alignItems: "flex-start"}}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {height: "100%"}
})

export default Menu;
