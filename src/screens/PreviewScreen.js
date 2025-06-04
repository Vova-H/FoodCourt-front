import React, {useRef, useState} from 'react';
import {Dimensions, FlatList, View,} from 'react-native';
import PreviewStepScreen from './PreviewStepScreen';
import GetStartedScreen from './GetStartedScreen';
import previewData from '../data/previewData';
import {useNavigation} from '@react-navigation/native';

const { width } = Dimensions.get('window');

const PreviewScreen = () => {
    const flatListRef = useRef(null);
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);

    const fullData = [...previewData, { isLast: true }];
    const goNext = () => {
        if (currentIndex < fullData.length - 1) {
            flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
        }
    };

    const skip = () => {
        navigation.navigate('WelcomeScreen');
    };

    const renderItem = ({ item }) => {
        if (item.isLast) {
            return (
                <View style={{ width, flex: 1 }}>
                    <GetStartedScreen />
                </View>
            );
        }

        return (
            <View style={{ width, flex: 1 }}>
                <PreviewStepScreen
                    item={item}
                    onNextPress={goNext}
                    onSkip={skip}
                />
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                ref={flatListRef}
                data={fullData}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                onMomentumScrollEnd={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
            />
        </View>
    );
};

export default PreviewScreen;
