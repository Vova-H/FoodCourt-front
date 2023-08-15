import React, {useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import theme from "../../theme";
import {useDispatch, useSelector} from "react-redux";
import {useGetOrdersQuery} from "../redux/services/OrdersService";
import {saveOrders} from "../redux/features/OrdersSlice";
import OrdersItem from "../components/UI/OrdersItem";
import OrderDetailsModal from "../components/modals/OrderDetailsModal";
import {i18n} from "../redux/features/LangSlice";


const MyOrdersScreen = () => {
    const dispatch = useDispatch()
    const userAuth = useSelector(state => state.authReducer.userFromJWT)
    const orders = useSelector(state => state.orderReducer.orders)
    const isOpen = useSelector(state => state.orderModalReducer.isOpen)
    const lang = useSelector(state => state.langReducer.lang)
    const {data, isLoading, refetch} = useGetOrdersQuery({"clientId": userAuth.id, lang})
    const locTitle = i18n.t("myOrdersScreen.title")
    const locLoading = i18n.t("global.loading")

    useEffect(() => {
        if (!isLoading) {
            refetch()
            dispatch(saveOrders(data))
        }
    }, [isLoading])

    const renderOrder = ({ item }) => <OrdersItem order={item} />;

    return (
        <View style={styles.container}>
            {
                isLoading ?
                    <View>
                        <Text style={styles.title}>{locLoading}</Text>
                    </View>
                    :

                    orders && orders.length ?
                        <View style={styles.itemsWrapper}>
                            <FlatList data={data}
                                      renderItem={renderOrder}
                                      keyExtractor={item => {
                                          return item.id
                                      }}
                                      numColumns={1}
                            />
                        </View>
                        :
                        <View>
                            <Text style={styles.title}>{locTitle}</Text>
                        </View>
            }

            {isOpen && <OrderDetailsModal/>}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.yellow,
        paddingTop: 30,
        position: "relative"
    },
    title: {
        fontFamily: theme.fonts.playfairDisplayBold,
        fontSize: 30,
        maxWidth: "90%"
    }
})

export default MyOrdersScreen;
