import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import theme from "../../theme";
import {useSelector} from "react-redux";
import {useGetOrdersQuery} from "../redux/services/OrdersService";


const MyOrdersScreen = () => {

    const client = useSelector(state => state.authReducer.userFromJWT)
    const {data} = useGetOrdersQuery(client.id)
    return (

        <View style={styles.container}>
            {data && data.map(el =>
                <View key={el.id}>
                    <Text>id:{el.id} date:{el.date}, time:{el.time}</Text>
                </View>
            )}
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
})

export default MyOrdersScreen;
