import React from 'react';
import {View, Text, StyleSheet} from "react-native";

const FavoriteDishesScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Favorite dishes</Text>
        </View>
    );
};

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default FavoriteDishesScreen;
