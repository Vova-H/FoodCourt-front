import React from 'react';
import {Image, View} from "react-native";

const LoadingScreen = () => {

    return (
        <View>
            <Image
                source={require('../../assets/img/loadingScreen.png')}
            />
        </View>
    );
};

export default LoadingScreen;
