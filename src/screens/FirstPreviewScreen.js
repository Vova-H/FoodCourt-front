import React from 'react';
import PreviewComponent from "../components/PreviewComponent";
import {i18n} from "../redux/store/reducers/LangSlice";


const FirstPreviewScreen = () => {

    const title = i18n.t("previewScreen1.title")
    const subtitle = i18n.t("previewScreen1.subtitle")
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
