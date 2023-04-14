import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {Alert, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import headerImg from "../../assets/img/MenuItemHeader.png";
import Ionicons from "react-native-vector-icons/Ionicons";
import flame from "../../assets/img/Flame.png";
import CustomButton from "../components/UI/CustomButton";
import theme from "../../theme";

const UnauthorizedDishDetailScreen = (props) => {

    const dish = props.route.params.dish
    const navigation = useNavigation()

    const tryAddFavoriteHandler = () => {
        Alert.alert("Login Message", "You need to log in to add this dish to your favorites")
    }
    const tryAddToCartHelper = () => {
        Alert.alert("Login Message", "You need to log in to order dishes")
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ImageBackground source={headerImg}
                                 style={styles.headerImg}
                >
                    <View style={styles.headerIcons}>
                        <TouchableOpacity onPress={() => navigation.navigate("UnauthorizedHomeScreen")}>
                            <Ionicons name={"md-arrow-back"} size={40} color="#000"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={tryAddFavoriteHandler}>
                            <Ionicons name={"heart-outline"} size={40} color="#000"/>
                        </TouchableOpacity>
                    </View>
                    <View><Text style={styles.headerTitle}>{dish.name}</Text></View>
                    <View>
                        <Text style={styles.headerSubtitle}>
                            <Image source={flame}/> {dish.calories} - kcal {dish.weight}g
                        </Text>
                    </View>
                    <View style={{alignItems: "center"}}>
                        <Image
                            source={{uri: `data:image/jpeg;base64,${dish.image}`}}
                            style={styles.dishImage}
                        />
                    </View>
                    <View style={styles.containerPriceInfo}>
                        <View style={styles.bg}>
                            <Text style={styles.price}>{dish.price} $</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.detailTitle}>Food Detail</Text>
                        <Text style={styles.detailDescription}>{dish.description}</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.orderBtnWrapper}>
                <CustomButton title={"Place Order"}
                              propsButtonStyles={styles.orderBtn}
                              pressFunc={tryAddToCartHelper}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },
    headerImg: {
        height: "80%",
        maxHeight: "83%",
        paddingTop: 40,
        paddingHorizontal: 30
    },
    headerIcons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "10%"
    },
    headerTitle: {
        textAlign: "center",
        marginBottom: 5,
        fontFamily: theme.fonts.robotoBold,
        fontSize: 24,
        letterSpacing: 1
    },
    headerSubtitle: {
        textAlign: "center",
        marginBottom: "10%",
        fontFamily: theme.fonts.robotoRegular,
        fontSize: 16,
        opacity: .9,
        letterSpacing: 1
    },
    dishImage: {
        width: 250,
        height: 250,
        borderRadius: 125,
        marginBottom: 25
    },
    detailTitle: {
        fontFamily: theme.fonts.robotoMedium,
        fontSize: 20,
        marginBottom: 5
    },
    detailDescription: {
        fontFamily: theme.fonts.robotoRegular,
        fontSize: 15
    },
    orderBtnWrapper: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        flex: 1,
        bottom: 10,
        right: 0,
        left: 0
    },

    containerPriceInfo: {
        alignItems: "flex-end",
        marginBottom: 30
    },
    bg: {
        height: 30,
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.yellow,
        borderRadius: 40
    },
    price: {
        width: "40%",
        textAlign: "center",
        fontSize: 20
    },
    countWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        borderLeftWidth: 6,
        borderColor: "#fff",
        height: "100%"
    },
})

export default UnauthorizedDishDetailScreen;
