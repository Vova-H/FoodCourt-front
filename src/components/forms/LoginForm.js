import React from 'react';
import {Alert, StyleSheet, Text, View} from "react-native";
import {useLoginMutation} from "../../../redux/services/AuthService";
import * as SecureStore from 'expo-secure-store';
import {Formik} from 'formik';
import LoginSchema from "../../validations/login-validation.Schema";
import CustomInput from "../UI/CustomInput";
import CustomButton from "../UI/CustomButton";
import theme from "../../../theme";

const LoginForm = () => {

    const [login] = useLoginMutation()


    const loginHandler = async (values) => {
        try {
            const response = await login(values);
            if (response?.error?.data) {
                switch (typeof response.error.data === "object" && !Array.isArray(response.error.data)) {
                    case true :
                        if (response.error.data) {
                            Alert.alert("Login Error", response.error.data.message)
                        }
                        break
                    case false:
                        if (response?.error?.data) {
                            Alert.alert("Login Error", response.error.data[0].split("-")[1])
                        }
                        break
                }
            }
            const token = response?.data?.token
            if (token?.length) {
                await SecureStore.setItemAsync("token", token)
            }
        } catch (e) {
            console.log(e);
        }
    };


    return (

        <Formik
            initialValues={{email: "", password: ""}}
            validationSchema={LoginSchema}
            onSubmit={values => loginHandler(values)}
        >
            {(props) => (
                <View>
                    <CustomInput
                        inputLabel={"Email"}
                        placeholder={"Email"}
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
                        inputLabel={"Password"}
                        placeholder={"Password"}
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
                        title="Login"
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
        fontFamily: theme.fonts.playfairDisplayRegular,
        fontSize: 13,
        letterSpacing: .4,
        color: "#d91717"

    }
})

export default LoginForm;
