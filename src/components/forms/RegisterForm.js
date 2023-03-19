import React from 'react';
import {Alert, StyleSheet, Text, View} from "react-native";
import {useLoginMutation, useRegistrationMutation} from "../../redux/services/AuthService";
import {Formik} from 'formik';
import CustomInput from "../UI/CustomInput";
import CustomButton from "../UI/CustomButton";
import theme from "../../../theme";
import {i18n} from "../../redux/store/reducers/LangSlice";
import registrationValidationSchema from "../../validations/registration-validation.Schema";
import {useNavigation} from "@react-navigation/native";

const RegisterForm = () => {

    const [register] = useRegistrationMutation()
    const navigation = useNavigation()
    const registerHandler = async (values) => {
        try {
            const response = await register(values);
            if (response?.error) {
                Alert.alert("Registration Error", response.error.data.message)
            }
            if (response?.data?.message) {
                Alert.alert("Message", response?.data?.message)
                navigation.navigate("LoginScreen")
            }

        } catch (e) {
            console.log(e);
        }
    };


    return (

        <Formik
            initialValues={{username: "test2", email: "test2@gmail.com", password: "12345678"}}
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
                        propsButtonStyles={{marginTop: 10}}
                        title={i18n.t("registerScreen.btnRegister")}
                        pressFunc={props.handleSubmit}
                    />
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

    }
})

export default RegisterForm;
