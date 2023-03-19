import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import {useFonts} from 'expo-font';
import {useEffect, useState} from "react";
import LoadingScreen from "./src/screens/LoadingScreen";
import {setupStore} from "./src/redux/store/store";
import {Provider} from "react-redux";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import GetStartedScreen from "./src/screens/GetStartedScreen";
import customFonts from "./src/components/UI/CustomFonts";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import PreviewScreen from "./src/screens/PreviewScreen";
import ChoosingLanguageScreen from "./src/screens/ChoosingLanguageScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

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
                            <Stack.Navigator screenOptions={{headerShown: false}}
                                             initialRouteName="ChoosingLanguageScreen">
                                <Stack.Screen name="ChoosingLanguageScreen" component={ChoosingLanguageScreen}/>
                                <Stack.Screen name="PreviewScreen" component={PreviewScreen}/>
                                <Stack.Screen name="GetStartedScreen" component={GetStartedScreen}/>
                                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
                                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                                <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
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
