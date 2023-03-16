import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import theme from "../../../theme";


const CustomInput = ({inputLabel = "", placeholder = "", onBlur, onChangeText, value, isPassword}) => {
    const _inputLabel = inputLabel ?? ""
    const _isPassword = isPassword ?? false
    const openedEye = require("../../../assets/img/openedEye.png")
    const closedEye = require("../../../assets/img/closedEye.png")
    const [hidden, changeVisibility] = useState(true)

    return (
        _isPassword ?
            <View>
                <Text style={styles.label}>{_inputLabel}</Text>
                <TextInput
                    style={styles.passwordInput}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry={hidden}
                />
                <View style={styles.inputIcons}>
                    <TouchableOpacity onPress={() => changeVisibility(true)}>
                        <Image
                            source={closedEye}
                            style={styles.iconItem}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeVisibility(false)}>
                        <Image
                            source={openedEye}
                            style={styles.iconItem}
                        />
                    </TouchableOpacity>
                </View>
            </View> :

            <View>
                <Text style={styles.label}>{_inputLabel}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    value={value}
                />
            </View>

    );
};

const styles = StyleSheet.create({
    label: {
        marginBottom: 5,
        fontSize: 16,
        fontFamily: theme.fonts.robotoRegular
    },
    input: {
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16
    },

    passwordInput: {
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        position: "relative"
    },

    inputIcons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 30,
        right: 10
    },
    iconItem: {
        marginRight: 10
    }
})

export default CustomInput;
