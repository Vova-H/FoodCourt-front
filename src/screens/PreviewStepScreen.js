import React from 'react';
import { View, StyleSheet, Pressable, Text, Dimensions } from 'react-native';
import PreviewComponent from '../components/PreviewComponent';
import { i18n } from '../redux/features/LangSlice';
import theme from '../../theme';

const { width } = Dimensions.get('window');

const PreviewStepScreen = ({ item, onNextPress, onSkip }) => {
    return (
        <View style={styles.container}>
            <PreviewComponent
                mainImg={item.mainImg}
                sideNextAriaImg={item.sideNextAriaImg}
                title={i18n.t(item.titleKey)}
                subtitle={i18n.t(item.subtitleKey)}
                activePage={item.key}
                backgroundColor={theme.colors.background}
                onNextPress={onNextPress}
            />

            <Pressable style={styles.skipBtn} onPress={onSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width,
        flex: 1,
    },
    skipBtn: {
        position: 'absolute',
        top: 50,
        right: 20,
        padding: 8,
        zIndex: 10,
    },
    skipText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});

export default PreviewStepScreen;
