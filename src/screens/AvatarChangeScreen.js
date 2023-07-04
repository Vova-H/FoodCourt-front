import React, {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import theme from "../../theme";
import * as ImagePicker from "expo-image-picker"
import CustomButton from "../components/UI/CustomButton";
import {useChangeAvatarMutation} from "../redux/services/AvatarService";
import {changeAvatarInSlice} from "../redux/features/UserSlice";
import {i18n} from "../redux/features/LangSlice";


const AvatarChangeScreen = () => {

    const lang = useSelector(state => state.langReducer.lang)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [hasGalleryPermission, setHasGalleryPermission] = useState(false)
    const [image, setImage] = useState("")
    const currentAvatar = useSelector(state => state.userReducer.user.avatar)
    const userId = useSelector(state => state.authReducer.userFromJWT.id)
    const [changeAvatar] = useChangeAvatarMutation();
    const locChangeBtn = i18n.t('avatarChangeScreen.changeAvatarButton')
    const locSaveBtn = i18n.t('global.saveBtn')


    const galleryStatusHandler = async () => {
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
        setHasGalleryPermission(galleryStatus.status === "granted")
    }

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
    }

    const updateAvatarHandler = async () => {
        try {
            const formData = new FormData();
            formData.append('value', {
                uri: image,
                name: 'avatar.png',
                type: 'image/png',
            });
            formData.append('userId', userId);
            const result = await changeAvatar(formData).unwrap()
            dispatch(changeAvatarInSlice(result.avatar))
            Alert.alert("Message", "Your avatar was been updated")
            setImage("")

        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        galleryStatusHandler()
    }, [])


    return (
        <View style={styles.container}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                {
                    image.length ?
                        <View style={styles.avatarWrapper}>
                            <Image source={{uri: image}} style={styles.avatar}/>
                        </View>
                        :
                        <View style={styles.avatarWrapper}>
                            <Image source={{uri: `data:image/jpeg;base64,${currentAvatar}`}}
                                   style={styles.avatar}
                            />
                        </View>
                }
                <CustomButton
                    title={locChangeBtn}
                    pressFunc={pickImage}
                />
            </View>
            {
                !image ?
                    <CustomButton
                        title={locSaveBtn}
                        inActive={true}
                    />
                    :
                    <CustomButton
                        title={locSaveBtn}
                        pressFunc={updateAvatarHandler}
                    />
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
        marginBottom: 10
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 100
    }
});

export default AvatarChangeScreen;
