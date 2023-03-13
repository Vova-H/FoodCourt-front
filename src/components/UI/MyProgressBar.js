import React from 'react';
import {View, StyleSheet} from "react-native";
import theme from "../../../theme";

const MyProgressBar = ({activePage}) => {
    return (
        <View style={styles.progressBar}>
            {
                activePage === 1 ? <View style={[styles.progressBarItem, styles.activeItem]}></View> :
                    <View style={styles.progressBarItem}></View>
            }
            {
                activePage === 2 ? <View style={[styles.progressBarItem, styles.activeItem]}></View> :
                    <View style={styles.progressBarItem}></View>
            }
            {
                activePage === 3 ? <View style={[styles.progressBarItem, styles.activeItem]}></View> :
                    <View style={styles.progressBarItem}></View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    progressBar: {
        flexDirection: "row",
    },
    progressBarItem: {
        width: 10,
        height: 10,
        marginRight: 5,
        borderStyle: 'solid',
        borderColor: theme.colors.black,
        borderWidth: 1,
        borderRadius: 2
    },
    activeItem: {
        backgroundColor: theme.colors.black
    }
})
export default MyProgressBar;
