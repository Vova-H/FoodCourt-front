import React, {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import theme from '../../theme';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../components/UI/CustomButton';
import {useChangeAvatarMutation} from '../redux/services/AvatarService';
import {changeAvatarInSlice} from '../redux/features/UserSlice';
import {i18n} from '../redux/features/LangSlice';

const AvatarChangeScreen = () => {
    const lang = useSelector((state) => state.langReducer.lang);
    const dispatch = useDispatch();
    const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
    const [image, setImage] = useState('');
    const [loader, setLoader] = useState(false)
    const currentAvatar = useSelector((state) => state.userReducer.user.avatar);
    const userId = useSelector((state) => state.authReducer.userFromJWT.id);
    const [changeAvatar] = useChangeAvatarMutation();
    const locChangeBtn = i18n.t('avatarChangeScreen.changeAvatarButton');
    const locSaveBtn = i18n.t('global.saveBtn');
    const locMessage = i18n.t('global.message')
    const locUpdateAvatarSuccess = i18n.t('avatarChangeScreen.successUpdateAvatarMessage')
    const locUpdateAvatarFailed = i18n.t('avatarChangeScreen.failedUpdateAvatarMessage')

    useEffect(() => {
        galleryStatusHandler();
    }, []);

    const galleryStatusHandler = async () => {
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermission(galleryStatus.status === 'granted');
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 0.2,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    const updateAvatarHandler = async (retryCount = 0) => {
        try {
            setLoader(true);
            const formData = new FormData();
            formData.append('value', {
                uri: image,
                name: 'avatar.png',
                type: 'image/png',
            });
            formData.append('userId', userId);
            setTimeout(async () => {
                const response = await changeAvatar(formData);
                dispatch(changeAvatarInSlice(response.data.avatar));
                Alert.alert(locMessage, locUpdateAvatarSuccess);
                setImage('');
                setLoader(false);
            }, 1500)
        } catch (e) {
            console.log('Update Avatar Error:', e);
            if (e.message.includes("avatar")) {
                if (retryCount < 5) {
                    await updateAvatarHandler(retryCount + 1);
                } else {
                    setLoader(false);
                    console.log('Update Avatar Failed after retries');
                    Alert.alert(locMessage, locUpdateAvatarFailed);
                }
            } else {
                setLoader(false);
                console.log('Update Avatar Failed:', e);
                Alert.alert(locMessage, locUpdateAvatarFailed);
            }
        }
    };

    const isImageSelected = image !== '';

    return (
        <View style={styles.container}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={styles.avatarWrapper}>
                    <Image
                        source={isImageSelected ? {uri: image} : {uri: `data:image/jpeg;base64,${currentAvatar}`}}
                        style={styles.avatar}
                    />
                </View>
                <CustomButton title={locChangeBtn} pressFunc={pickImage}/>
            </View>

            {loader ?
                (<CustomButton title={locSaveBtn} propsIsLoading={true}/>) :
                isImageSelected ? (<CustomButton title={locSaveBtn} pressFunc={updateAvatarHandler}/>)
                    :
                    (<CustomButton title={locSaveBtn} inActive={true}/>)
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.yellow,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarWrapper: {
        marginBottom: 10,
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
});

export default AvatarChangeScreen;
