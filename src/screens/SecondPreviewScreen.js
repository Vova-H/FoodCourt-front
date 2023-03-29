import React from 'react';
import PreviewComponent from "../components/PreviewComponent";
import theme from "../../theme";
import {i18n} from "../redux/features/LangSlice";

const FirstPreviewScreen = () => {

    const title = i18n.t("previewScreen2.title")
    const subtitle = i18n.t("previewScreen2.subtitle")
    const mainImg = require("../../assets/img/preview2.png")
    const sideNextAriaImg = require("../../assets/img/sideAriaNext2.png")

    return (
        <PreviewComponent
            mainImg={mainImg}
            sideNextAriaImg={sideNextAriaImg}
            title={title}
            subtitle={subtitle}
            activePage={2}
            backgroundColor={theme.colors.yellow}
        />
    );
};


export default FirstPreviewScreen;
