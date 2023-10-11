import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import CustomButton from "./UI/CustomButton";
import {i18n} from "../redux/features/LangSlice";


const WelcomeInfo = () => {

    const navigation = useNavigation()
    const profileSmallBtn = require("../../assets/img/profileSmallBtn.png")
    const isAuthorized = useSelector(state => state.authReducer.isAuthorized)
    const user = useSelector(state => state.userReducer.user)
    useSelector(state => state.langReducer.lang)
    const locWelcome = i18n.t("homeScreen.welcome")
    const loginBtn = i18n.t("welcomeScreen.btnLogin")
    const goMyProfileHandler = (isAuthorized) => {
        if (isAuthorized) {
            navigation.navigate("Profile")
        }
    }
    return (
        <TouchableOpacity style={styles.container} onPress={() => goMyProfileHandler(isAuthorized)}>
            <View style={styles.infoWrapper}>
                {isAuthorized ?
                    <View style={styles.imageWrapper}>
                        <Image style={styles.avatar}
                               source={{uri: `data:image/jpeg;base64,${user.avatar}`}}
                               resizeMode={"cover"}
                        />
                    </View> :
                    <View style={{width: "100%", marginLeft: 10}}>
                        <CustomButton title={loginBtn}
                                      pressFunc={() => navigation.navigate("LoginScreen")}
                                      propsButtonStyles={{
                                          width: "40%",
                                          height: "60%",
                                      }}
                        />
                    </View>
                }
                {
                    isAuthorized &&
                    <Text style={styles.title}>
                        {locWelcome} {"\n"}{user.username}
                    </Text>
                }
            </View>
            <View style={styles.profileSmallBtn}>
                <Image source={profileSmallBtn}/>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "center",
        height: 60,
    },
    imageWrapper: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        margin: 10
    },
    infoWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: "auto"
    },
    title: {},
    profileSmallBtn: {
        marginVertical: 20,
        marginRight: 15
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    }
})
export default WelcomeInfo;
