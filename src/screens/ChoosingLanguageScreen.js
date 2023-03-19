import React, {useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {changeLanguage, i18n} from "../redux/store/reducers/LangSlice";
import {useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import CountryFlag from "react-native-country-flag";
import theme from "../../theme";
import CustomButton from "../components/UI/CustomButton";

const ChoosingLanguageScreen = () => {

    const [lang, setLang] = useState("en")
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const changeLng = (loc) => {
        dispatch(changeLanguage(loc))
        setLang(loc)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}> {i18n.t("choosingLanguage.title")}</Text>
            <TouchableOpacity onPress={() => changeLng("en")}>
                <CountryFlag isoCode="us" size={85} style={styles.flag}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLng("ua")}>
                <CountryFlag isoCode="ua" size={85} style={styles.flag}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLng("pl")} style={{marginBottom:"20%"}}>
                <CountryFlag isoCode="pl" size={85} style={styles.flag}/>
            </TouchableOpacity>
            <CustomButton
                title={i18n.t("choosingLanguage.btn")}
                pressFunc={() => navigation.navigate("PreviewScreen")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.yellow,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginBottom: 40,
        fontFamily: theme.fonts.robotoBold,
        textTransform: 'capitalize',
        fontSize: 35
    },
    flag: {
        marginBottom: 40,

    }
});

export default ChoosingLanguageScreen;
