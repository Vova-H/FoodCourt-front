const defineCurrency = (lang, currencies, price = 1) => {
    if (lang === "en" || lang === "en-US") {
        return {
            "price": price,
            "sign": "$"
        }
    }
    if (lang === "ua") {
        return {
            "price": Math.ceil(price * currencies.USDUAH),
            "sign": "₴"
        }
    }
    if (lang === "pl") {
        return {
            "price": Math.ceil(price * currencies.USDPLN),
            "sign": "zl"
        }
    }

}

export default defineCurrency
