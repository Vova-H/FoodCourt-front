import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Formik} from 'formik';
import CustomInput from "../UI/CustomInput";
import CustomButton from "../UI/CustomButton";
import theme from "../../../theme";
import {i18n} from "../../redux/features/LangSlice";
import registrationValidationSchema from "../../validations/registration-validation.Schema";
import {useNavigation} from "@react-navigation/native";
import {Asset} from "expo-asset";


const RegisterForm = () => {
    const avatarImg = require("../../../assets/img/emptyAvatar.png")
    const navigation = useNavigation()

    const registerHandler = async (values) => {
        try {
            const formData = new FormData();
            formData.append('avatar', {
                uri: Asset.fromModule(avatarImg).uri,
                name: 'emptyAvatar.png',
                type: 'image/png',
            });
            formData.append('username', values.username);
            formData.append("email", values.email)
            formData.append("password", values.password)
            const response = await fetch(`https://foodcourt-deploy.onrender.com/auth/registration`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const jsonResponse = await response.json();
            if (jsonResponse.message !== "The user has been created successfully") {
                Alert.alert("Registration Error", jsonResponse.message)
            } else {
                Alert.alert("Message", jsonResponse.message)
                navigation.navigate("LoginScreen")
            }

        } catch (e) {
            console.log(e);
        }
    };


    return (
        <Formik
            initialValues={{username: "", email: "", password: ""}}
            validationSchema={registrationValidationSchema}
            onSubmit={values => registerHandler(values)}
        >
            {(props) => (

                <View>
                    <CustomInput
                        inputLabel={i18n.t("registerScreen.emailLabel")}
                        placeholder={i18n.t("registerScreen.emailLabel")}
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
                        inputLabel={i18n.t("registerScreen.usernameLabel")}
                        placeholder={i18n.t("registerScreen.usernameLabel")}
                        onChangeText={props.handleChange('username')}
                        onBlur={props.handleBlur('username')}
                        value={props.values.username}
                    />
                    {
                        props.errors.username && props.touched.username ? (
                            <Text style={styles.validationErrorText}>{props.errors.username}</Text>
                        ) : <View></View>
                    }

                    <CustomInput
                        inputLabel={i18n.t("registerScreen.passwordLabel")}
                        placeholder={i18n.t("registerScreen.passwordLabel")}
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
                    <CustomButton
                        propsButtonStyles={{marginBottom: 20}}
                        title={i18n.t("registerScreen.btnRegister")}
                        pressFunc={props.handleSubmit}
                    />

                    <TouchableOpacity
                        onPress={() => navigation.navigate("LoginScreen")}
                        style={{alignItems: "center"}}
                    >
                        <Text style={styles.goToRegisterLink}>
                            {i18n.t("registerScreen.loginLink")}
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

export default RegisterForm;
