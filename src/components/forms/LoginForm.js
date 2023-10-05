import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useLoginMutation} from "../../redux/services/AuthService";
import * as SecureStore from 'expo-secure-store';
import {Formik} from 'formik';
import LoginSchema from "../../validations/login-validation.Schema";
import CustomInput from "../UI/CustomInput";
import CustomButton from "../UI/CustomButton";
import theme from "../../../theme";
import {i18n} from "../../redux/features/LangSlice";
import ParseJWTHelper from "../../helpers/parseJWTHelper";
import {useDispatch, useSelector} from "react-redux";
import {authorizeUser, saveJWT, saveUserFromJWT} from "../../redux/features/AuthSlice";
import {useNavigation} from "@react-navigation/native";


const LoginForm = () => {

    const lang = useSelector(state => state.langReducer.lang)
    const [login] = useLoginMutation()
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false);
    const locLoginError = i18n.t("modals.loginScreen.loginError")

    const loginHandler = async (values, resetForm) => {
        values.lang = lang
        setIsLoading(true);
        try {
            const response = await login(values);
            if (response?.error?.data) {
                switch (typeof response.error.data === "object" && !Array.isArray(response.error.data)) {
                    case true :
                        if (response.error.data) {
                            Alert.alert(`${locLoginError}`, response.error.data.message.toString())
                        }
                        break
                    case false:
                        if (response?.error?.data) {
                            Alert.alert(`${locLoginError}`, response.error.data[0].split("-")[1])
                        }
                        break
                }
            } else if (response?.data?.token) {
                const userFromJWT = ParseJWTHelper(response.data.token)
                const token = response.data.token
                if (token?.length) {
                    await SecureStore.setItemAsync("token", token)
                    dispatch(authorizeUser())
                    dispatch(saveUserFromJWT(userFromJWT))
                    dispatch(saveJWT(token))
                    navigation.navigate("HomeScreen")
                    resetForm();
                }
            }
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    };

    return (
        <Formik
            initialValues={{email: "", password: ""}}
            validationSchema={LoginSchema(lang)}
            onSubmit={(values, {resetForm}) => {
                loginHandler(values, resetForm);
            }}
        >
            {(props) => (
                <View>
                    <CustomInput
                        inputLabel={i18n.t("loginScreen.emailLabel")}
                        placeholder={i18n.t("loginScreen.emailLabel")}
                        onChangeText={props.handleChange('email')}
                        onBlur={props.handleBlur('email')}
                        value={props.values.email}
                    />
                    {
                        props.errors.email && props.touched.email ? (
                            <Text style={styles.validationErrorText}>{props.errors.email}</Text>
                        ) : <View></View>
                    }

                    <CustomInput
                        inputLabel={i18n.t("loginScreen.passwordLabel")}
                        placeholder={i18n.t("loginScreen.passwordLabel")}
                        onChangeText={props.handleChange('password')}
                        onBlur={props.handleBlur('password')}
                        value={props.values.password}
                        isPassword={true}
                    />
                    {
                        props.errors.password && props.touched.password ? (
                            <Text style={styles.validationErrorText}>{props.errors.password}</Text>
                        ) : <View style={{height: 20}}></View>
                    }
                    {isLoading ? <CustomButton
                            propsIsLoading={true}
                            propsButtonStyles={{marginBottom: 20}}
                            title={i18n.t("loginScreen.btnLogin")}
                            pressFunc={props.handleSubmit}
                        /> :
                        <CustomButton
                            propsButtonStyles={{marginBottom: 20}}
                            title={i18n.t("loginScreen.btnLogin")}
                            pressFunc={props.handleSubmit}
                        />}

                    <TouchableOpacity
                        onPress={() => navigation.navigate("RegisterScreen")}
                        style={{alignItems: "center"}}
                    >
                        <Text style={styles.goToRegisterLink}>
                            {i18n.t("loginScreen.registerLink")}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    );
};


const styles = StyleSheet.create({
    validationErrorText: {
        textAlign: "center",
        marginTop: -10,
        marginBottom: 5,
        fontFamily: theme.fonts.latoRegular,
        lineHeight: 17,
        fontSize: 14,
        letterSpacing: .4,
        color: "#d91717"
    },
    goToRegisterLink: {
        fontSize: 14,
        fontFamily: theme.fonts.robotoRegular,
        marginBottom: 20
    }
})

export default LoginForm;
