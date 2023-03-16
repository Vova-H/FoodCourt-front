import React from 'react';
import Swiper from 'react-native-swiper'
import FirstPreviewScreen from "./FirstPreviewScreen";
import SecondPreviewScreen from "./SecondPreviewScreen";
import GetStartedScreen from "./GetStartedScreen";

const PreviewScreen = () => {

    return (
        <Swiper loop={false} showsPagination={false}>
            <FirstPreviewScreen/>
            <SecondPreviewScreen/>
            <GetStartedScreen/>
        </Swiper>
    );
};

export default PreviewScreen;
