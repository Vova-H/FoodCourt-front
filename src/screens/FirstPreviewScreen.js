import React from 'react';
import PreviewComponent from "../components/PreviewComponent";


const FirstPreviewScreen = () => {

    const title = "choose your favorite food"
    const subtitle = "Ayo pilih makanan favorit pilihan Anda dengan aplikasi kami."
    const mainImg = require("../../assets/img/preview1.png")
    const sideNextAriaImg = require("../../assets/img/sideAriaNext1.png")


    return (
        <PreviewComponent
            mainImg={mainImg}
            sideNextAriaImg={sideNextAriaImg}
            title={title}
            subtitle={subtitle}
            activePage={1}
        />
    );
};


export default FirstPreviewScreen;
