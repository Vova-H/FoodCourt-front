import React from 'react';
import {Image, View, StyleSheet} from "react-native";

const LoadingScreen = () => {

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/img/loadingScreen.png')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default LoadingScreen;
