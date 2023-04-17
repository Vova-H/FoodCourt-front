import React from 'react';
import PreviewComponent from "../components/PreviewComponent";
import {i18n} from "../redux/features/LangSlice";


const FirstPreviewScreen = () => {

    const locTitle = i18n.t("previewScreen1.title")
    const locSubtitle = i18n.t("previewScreen1.subtitle")
    const mainImg = require("../../assets/img/preview1.png")
    const sideNextAriaImg = require("../../assets/img/sideAriaNext1.png")


    return (
        <PreviewComponent
            mainImg={mainImg}
            sideNextAriaImg={sideNextAriaImg}
            title={locTitle}
            subtitle={locSubtitle}
            activePage={1}
        />
    );
};


export default FirstPreviewScreen;
