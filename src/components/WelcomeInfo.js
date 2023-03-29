import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const WelcomeInfo = ({user}) => {
    const avatarImg = require("../../assets/img/avatar.png")
    const profileSmallBtn = require("../../assets/img/profileSmallBtn.png")
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.infoWrapper}>
                <View style={styles.imageWrapper}>
                    {user.avatar ?
                        <Image style={styles.avatar}
                               source={{uri: `data:image/jpeg;base64,${user.avatar}`}}
                               resizeMode={"cover"}
                        />
                        :
                        <Image style={styles.avatar}
                               source={avatarImg}
                               resizeMode={"cover"}
                        />
                    }
                </View>
                <Text style={styles.title}>
                    Welcome {"\n"}{user.username}
                </Text>
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
