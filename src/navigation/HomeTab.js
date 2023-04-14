import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import FavoriteDishesScreen from "../screens/FavoriteDishesScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeTab = () => {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home-outline'
                            : 'home-outline';
                    } else if (route.name === 'Cart') {
                        iconName = focused
                            ? 'cart-outline'
                            : 'cart-outline';
                    } else if (route.name === 'Favorite') {
                        iconName = focused
                            ? 'heart-outline'
                            : 'heart-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused
                            ? 'person-circle-outline'
                            : 'person-circle-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
                tabBarActiveTintColor: '#FE8C00',
                tabBarInactiveTintColor: '#000',
                tabBarShowLabel: false,
            })}>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Cart" component={CartScreen}/>
            <Tab.Screen name="Favorite" component={FavoriteDishesScreen}/>
            <Tab.Screen name="Profile" component={MyProfileScreen}/>
        </Tab.Navigator>
    );
};

export default HomeTab;
