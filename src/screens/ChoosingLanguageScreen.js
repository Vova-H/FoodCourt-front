import React, {useCallback} from 'react';
import {BackHandler, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {changeLanguage, i18n} from "../redux/features/LangSlice";
import {useDispatch, useSelector} from "react-redux";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
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

    useFocusEffect(
        useCallback(() => {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
            return () => backHandler.remove();
        }, [])
    );

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
                propsTitleStyles={{color: theme.colors.white}}
                propsButtonStyles={{backgroundColor: theme.colors.primary}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginBottom: 40,
        fontFamily: theme.fonts.robotoBold,
        textTransform: 'capitalize',
        fontSize: 35,
        color: theme.colors.textPrimary
    },
    flag: {
        marginBottom: 40,
        borderColor: theme.colors.surface,
        borderWidth: 2,
        borderRadius: 15
    }
});

export default ChoosingLanguageScreen;
