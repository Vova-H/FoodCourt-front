import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import MenuItem from "./UI/MenuItem";
import image1 from "../../assets/img/food1.png";
import image2 from "../../assets/img/food2.png";
import image3 from "../../assets/img/food3.png";
import image4 from "../../assets/img/food4.png";


const Menu = () => {


    const dishes = [
        {
            id: 1, img: image1, title: "Salmon Sambal Matah", price: "Rp 80.000"
        }, {
            id: 2, img: image2, title: "Ayam Asam Manis", price: "Rp 55.000"
        },
        {
            id: 3, img: image3, title: "Kari Ayam + Nasi", price: "Rp 65.000"
        },
        {
            id: 4, img: image4, title: "Gulai Kakap Asam Segar", price: "Rp 78.000"
        },
        {
            id: 5, img: image1, title: "Salmon Sambal Matah", price: "Rp 80.000"
        }, {
            id: 6, img: image2, title: "Ayam Asam Manis", price: "Rp 55.000"
        },
        {
            id: 7, img: image3, title: "Kari Ayam + Nasi", price: "Rp 65.000"
        },
        {
            id: 8, img: image4, title: "Gulai Kakap Asam Segar", price: "Rp 78.000"
        }
    ]

    const renderDishes = useCallback(({item}) => (
        <MenuItem dish={item}/>
    ), [])

    return (
        <View style={styles.container}>
            <FlatList data={dishes}
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
    container: {
    }
})

export default Menu;
