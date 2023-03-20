import React from 'react';
import {View, Text, Image, StyleSheet} from "react-native";
import theme from "../../../theme";

const MenuItem = ({dish}) => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.imageWrapper}>
                <Image source={dish.img} resizeMode={"contain"}/>
            </View>
            <Text style={styles.title}>{dish.title}</Text>
            <Text style={styles.price}>{dish.price}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        width: "20%",
        justifyContent: 'center',
        flexGrow: 1,
        backgroundColor: "white",
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 15,
        borderRadius: 5,
        paddingBottom: 10,
        paddingTop:10
    },
    imageWrapper: {
        alignSelf: "center"
    },
    title: {
        paddingHorizontal: 10,
        fontFamily: theme.fonts.robotoRegular,
        fontSize: 14
    },
    price: {
        paddingHorizontal: 10,
        fontFamily: theme.fonts.robotoBold,
    }
})

export default MenuItem;
