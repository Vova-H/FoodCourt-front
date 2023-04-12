import React, {useCallback, useEffect, useRef} from 'react';
import {Animated, FlatList, StyleSheet, Text, View} from "react-native";
import theme from "../../theme";
import {useDispatch, useSelector} from "react-redux";
import {useGetOrdersQuery} from "../redux/services/OrdersService";
import {saveOrders} from "../redux/features/OrdersSlice";
import OrdersItem from "../components/UI/OrdersItem";
import OrderDetailsModal from "../components/UI/OrderDetailsModal";


const MyOrdersScreen = () => {
    const dispatch = useDispatch()
    const userAuth = useSelector(state => state.authReducer.userFromJWT)
    const {data, isLoading, refetch} = useGetOrdersQuery(userAuth.id)
    const orders = useSelector(state => state.orderReducer.orders)
    const isOpen = useSelector(state => state.orderModalReducer.isOpen)



    useEffect(() => {
        if (!isLoading) {
            refetch()
            dispatch(saveOrders(data))
        }
    }, [isLoading])



    const renderOrder = useCallback(({item}) => (
        <OrdersItem order={item}/>
    ), [orders])

    return (
        <View style={styles.container}>
            {
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
                        <Text style={styles.title}>You don't have any orders yet</Text>
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
})

export default MyOrdersScreen;
