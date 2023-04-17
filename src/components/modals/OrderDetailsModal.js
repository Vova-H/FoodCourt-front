import React, {useCallback} from 'react';
import {FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../../redux/features/OrderModalSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import OrderListDishes from "../UI/OrderListDishes";
import theme from "../../../theme";
import {i18n} from "../../redux/features/LangSlice";

const OrderDetailsModal = () => {

    const dispatch = useDispatch()
    const content = useSelector(state => state.orderModalReducer.content)
    const isOpen = useSelector(state => state.orderModalReducer.isOpen)
    const lang = useSelector(state => state.langReducer.lang)
    const locOrder = i18n.t("modals.order.order")
    const locListOfDishes = i18n.t("modals.order.listOfDishes")

    const renderListOfDishes = useCallback(({item}) => (
        <OrderListDishes item={item}/>
    ), [content])

    return (
        content && <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={() => dispatch(closeModal())}
        >
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={() => dispatch(closeModal())}>
                    <Ionicons name={"close"} size={30}/>
                </TouchableOpacity>
                <View style={styles.modalContentWrapper}>
                    <Text style={styles.order}>{locOrder} №{content.id}</Text>
                    <Text style={styles.listOfDishesTitle}>{locListOfDishes}:</Text>
                    <View style={{height: "70%"}}>
                        <FlatList data={content.dishes}
                                  renderItem={renderListOfDishes}
                                  keyExtractor={item => {
                                      return item.OrdersDishesModel.dishId
                                  }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({

    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingTop: 50,
        marginTop: "30%",
        margin: 40,
        height: "60%",
        borderStyle: "solid",
        borderWidth: 1,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    modalContentWrapper: {},
    order: {
        alignSelf: "center",
        marginVertical: 20,
        fontFamily: theme.fonts.latoRegular,
        fontSize: 30
    },
    listOfDishesTitle: {
        marginBottom: 10,
        fontFamily: theme.fonts.robotoRegular,
        fontSize: 20,
        textTransform: "capitalize"
    }

});
export default OrderDetailsModal;
