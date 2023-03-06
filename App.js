import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {useFonts} from 'expo-font';
import {useEffect, useState} from "react";
import LoadingScreen from "./src/screens/LoadingScreen";
import theme from "./theme";
import {setupStore} from "./redux/store/store";
import {Provider} from "react-redux";

export default function App() {

    const [loaded, setLoaded] = useState(false);
    const [fontsLoaded] = useFonts({
        'Roboto-thin': require('./assets/fonts/Roboto-Thin.ttf'),
        'Roboto-light': require('./assets/fonts/Roboto-Light.ttf'),
        'Roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'Roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-black': require('./assets/fonts/Roboto-Black.ttf'),
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

    return (
        <Provider store={store}>
            <View style={styles.container}>
                {
                    loaded ?
                        <Text style={{fontFamily: theme.fonts.robotoRegular}}>Main screen</Text> :
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
