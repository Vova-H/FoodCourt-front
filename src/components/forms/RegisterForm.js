import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Formik} from 'formik';
import CustomInput from "../UI/CustomInput";
import CustomButton from "../UI/CustomButton";
import theme from "../../../theme";
import {i18n} from "../../redux/features/LangSlice";
import registrationValidationSchema from "../../validations/registration-validation.Schema";
import {useNavigation} from "@react-navigation/native";
import {useRegisterMutation} from "../../redux/services/AuthService";
import {useSelector} from "react-redux";


const RegisterForm = () => {

    const lang = useSelector(state => state.langReducer.lang)
    const navigation = useNavigation()
    const [register] = useRegisterMutation();
    const registerHandler = async (values) => {
        try {
            const formData = {
                'username': values.username,
                'email': values.email,
                'password': values.password
            }
            const result = await register(formData).unwrap()
            Alert.alert("Message", result.message)
            navigation.navigate("LoginScreen")

        } catch (e) {
            console.log(e);
            Alert.alert("Registration Error", e.data.message)
        }
    };


    return (
        <Formik
            initialValues={{username: "", email: "", password: ""}}
            validationSchema={registrationValidationSchema(lang)}
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
