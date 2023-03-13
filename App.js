import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import {useFonts} from 'expo-font';
import {useEffect, useState} from "react";
import LoadingScreen from "./src/screens/LoadingScreen";
import {setupStore} from "./redux/store/store";
import {Provider} from "react-redux";
import FirstPreviewScreen from "./src/screens/FirstPreviewScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import SecondPreviewScreen from "./src/screens/SecondPreviewScreen";

export default function App() {

    const [loaded, setLoaded] = useState(false);
    const [fontsLoaded] = useFonts({
        'Roboto-thin': require('./assets/fonts/Roboto-Thin.ttf'),
        'Roboto-light': require('./assets/fonts/Roboto-Light.ttf'),
        'Roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'Roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-black': require('./assets/fonts/Roboto-Black.ttf'),

        'Lato-thin': require('./assets/fonts/Lato-Thin.ttf'),
        'Lato-light': require('./assets/fonts/Lato-Light.ttf'),
        'Lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
        'Lato-bold': require('./assets/fonts/Lato-Bold.ttf'),
        'Lato-black': require('./assets/fonts/Lato-Black.ttf'),

        'PlayfairDisplay-regular': require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
        'PlayfairDisplay-medium': require('./assets/fonts/PlayfairDisplay-Medium.ttf'),
        'PlayfairDisplay-bold': require('./assets/fonts/PlayfairDisplay-Bold.ttf'),
        'PlayfairDisplay-semiBold': require('./assets/fonts/PlayfairDisplay-SemiBold.ttf'),
        'PlayfairDisplay-extraBold': require('./assets/fonts/PlayfairDisplay-ExtraBold.ttf'),
        'PlayfairDisplay-black': require('./assets/fonts/PlayfairDisplay-Black.ttf'),

    });
    const store = setupStore();
    useEffect(() => {
        if (fontsLoaded) {
            var timer = setTimeout(() => {
                setLoaded(true);
            }, 2000);
        }
        return () => timer && clearTimeout(timer);
    }, [fontsLoaded]);

    const Stack = createNativeStackNavigator();

    return (
        <Provider store={store}>
            <View style={styles.container}>
                {
                    loaded ?
                        <NavigationContainer>
                            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="FirstPreviewScreen">
                                <Stack.Screen name="FirstPreviewScreen" component={FirstPreviewScreen}/>
                                <Stack.Screen name="SecondPreviewScreen" component={SecondPreviewScreen}/>
                            </Stack.Navigator>
                        </NavigationContainer>
                        :
                        <LoadingScreen/>
                }
                <StatusBar style="auto"/>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
