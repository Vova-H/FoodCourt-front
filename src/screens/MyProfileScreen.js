import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import theme from "../../theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {removeUser} from "../redux/features/UserSlice";
import {logoutUser} from "../redux/features/AuthSlice";

const MyProfileScreen = () => {

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const logOutHandler = () => {
        dispatch(logoutUser())
        dispatch(removeUser())
        navigation.pop()
    }

    return (

        <View style={styles.container}>
            <TouchableOpacity style={styles.linkWrapper}>
                <Ionicons name={"settings-outline"} size={40} color={"#000000"}/>
                <Text style={styles.link}>My Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkWrapper} onPress={() => navigation.navigate("MyOrdersScreen")}>
                <Ionicons name={"book-outline"} size={40} color={"#000000"}/>
                <Text style={styles.link}>My Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkWrapper}
                              onPress={logOutHandler}
            >
                <Ionicons name={"exit-outline"} size={40} color={"#000000"}/>
                <Text style={styles.link}>Log Out</Text>
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

export default MyProfileScreen;
