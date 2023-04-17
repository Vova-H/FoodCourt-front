import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import theme from "../../theme";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {i18n} from "../redux/features/LangSlice";

const MySettingsScreen = () => {
    const navigation = useNavigation()
    const lang = useSelector(state => state.langReducer.lang)
    const locChangeLang = i18n.t("mySettingsScreen.changeLanguage")
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.linkWrapper}
                              onPress={() => navigation.navigate("ChangeLanguageScreen")}
            >
                <Ionicons name={"flag-outline"} size={40} color={"#000000"}/>
                <Text style={styles.link}>{locChangeLang}</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.yellow,
    },
    linkWrapper: {
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20
    },
    link: {
        fontFamily: theme.fonts.robotoMedium,
        fontSize: 25,
        letterSpacing: 1,
        marginLeft: 10,
    }
})

export default MySettingsScreen;
