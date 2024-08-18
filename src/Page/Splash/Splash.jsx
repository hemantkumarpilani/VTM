
import { Animated, Image, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import styles from './splashstyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const imgvtm = require('../../assets/images/Logo.png');

let sessionToken;
let encryptedPassword;
let userid;
const Splash = () => {
    useEffect(() => {
        const getSessionToken = async () => {
          sessionToken = await AsyncStorage.getItem('sessiontoken');
        };

        const checkUserId = async () => {
            try {
                const userid = await AsyncStorage.getItem('userid');
            } catch (error) {
                console.error('Error fetching userId:', error);
            }
        };

        getSessionToken();
        checkUserId();
        // getEncryptedPassword();
      }, []);
    const translateY = useRef(new Animated.Value(300)).current;
    const navigation = useNavigation();

    useEffect(() => {
        const animateImage = () => {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
            }).start();
        };

        const handleLogin = setTimeout(() => {
            if(sessionToken){
                navigation.navigate('BottomTabNavigation');
            }
            else{
                navigation.navigate('Login');
            }
          
        }, 2000);

        animateImage();

        return () => {
            translateY.setValue(300);
            clearTimeout(handleLogin);
        };
    }, [navigation, translateY]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.animatedContainer, { transform: [{ translateY }] }]}>
                <Image
                    source={imgvtm}
                    style={styles.img}
                />
            </Animated.View>
        </View>
    )
}

export default Splash;
