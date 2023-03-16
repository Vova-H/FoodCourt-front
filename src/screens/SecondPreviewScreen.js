import React from 'react';
import PreviewComponent from "../components/PreviewComponent";
import theme from "../../theme";


const FirstPreviewScreen = () => {

    const title = "delicious food menu"
    const subtitle = "pesanan Anda siap akan segera diambil dan dikirim secara langsung oleh kurir kami."
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
