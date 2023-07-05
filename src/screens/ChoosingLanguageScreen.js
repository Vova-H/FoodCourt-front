import React, {useEffect} from 'react';
import {BackHandler, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {changeLanguage, i18n} from "../redux/features/LangSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import theme from "../../theme";
import CountryFlag from "react-native-country-flag";
import CustomButton from "../components/UI/CustomButton";

const ChoosingLanguageScreen = () => {

    const lang = useSelector(state => state.langReducer.lang)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const changeLng = (loc) => {
        dispatch(changeLanguage(loc))
    }

    const nextScreenHandler = async () => {
        navigation.navigate("PreviewScreen")
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}> {i18n.t("choosingLanguage.titleFirstTime")}</Text>
            <TouchableOpacity onPress={() => changeLng("en")}>
                <CountryFlag isoCode="us" size={85} style={styles.flag}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLng("ua")}>
                <CountryFlag isoCode="ua" size={85} style={styles.flag}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLng("pl")} style={{marginBottom: "20%"}}>
                <CountryFlag isoCode="pl" size={85} style={styles.flag}/>
            </TouchableOpacity>

            <CustomButton
                title={i18n.t("choosingLanguage.btnFirstTime")}
                pressFunc={nextScreenHandler}
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
