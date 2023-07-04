import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const MySpinner = ({colorProps, styleProps}) => {
    const color = colorProps ?? 'white'
    const style = styleProps ?? null
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={color} style={style}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MySpinner;
