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
import GetStartedScreen from "./src/screens/GetStartedScreen";
import customFonts from "./src/components/UI/CustomFonts";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import PreviewScreen from "./src/screens/PreviewScreen";

export default function App() {

    const [loaded, setLoaded] = useState(false);
    const [fontsLoaded] = useFonts(customFonts);
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
                            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="PreviewScreen">
                                {/*<Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="LoginScreen">*/}
                                <Stack.Screen name="PreviewScreen" component={PreviewScreen}/>
                                <Stack.Screen name="GetStartedScreen" component={GetStartedScreen}/>
                                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
                                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
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
