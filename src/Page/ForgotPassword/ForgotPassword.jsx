
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';

import Button from '../../Components/Button';
import CustomTextInput from '../../Components/CustomTextInput';
import styles from './forgotpasswordstyle';
import ErrorModal from '../../Components/ErrorModal';
import { forgotPasswordApi } from '../../api/axiosApi';
import CustomHeader from '../../Components/CustomHeader';
import AlertModal from '../../Components/AlertModal';
import { useNavigation } from '@react-navigation/native';


const vtmimg = require('../../assets/images/Logo.png');
const arrowimg = require('../../assets/images/back.png')

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [erroModal, setErrorModal] = useState(false);
  const [email, setEmail] = useState('');
  const [alertModalvisible, setAlertModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const emailTextInput = 'Email';
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const handleOnOKClick = () => {
    setAlertModalVisible(false);
    navigation.navigate('Login');
  }


  const forgotPasswordHandle = async () => {
    if (emailRegex.test(email)) {
      console.log('api')
      const emailResponse = await forgotPasswordApi(
        email,
      );
      if (emailResponse?.status === 200) {
        //setLoaderModal(false);
        setAlertMessage('We have e-mailed your password reset link !');
        setAlertModalVisible(true);


      }
      if (emailResponse?.data?.result === 'failure') {
        //setLoaderModal(true);
        setAlertMessage('We cant find a user with that e-mail address');
        setAlertModalVisible(true)

      }
      return;
    }

    console.log('inside forgotpassword');
    if (email === '') {
      console.log('email')
      console.log('inside email if');
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 2000)
      return;
    }
    if (email !== '') {
      console.log('! email')
      console.log('inside email if');
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 2000)
      return;
    }
  }
  return (
    <View style={styles.outerContainer}>
      <CustomHeader headerTitle={'Forgot Password'} require={arrowimg} />
      <View>
        <View style={styles.conatiner}>
          <View>
            <Image source={vtmimg} style={styles.imageContainer} />
          </View>
          <View style={styles.forgotpasswordContainer}>
            <Text style={styles.forgotpasswordText}>Forgot Password?</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.noticeText}>Don't worry,we will send your revised password over email.</Text>
          </View>
          <CustomTextInput
            email={email}
            setEmail={setEmail}
            emailTextInput={emailTextInput}
            position={10}
          />
          <View
            style={styles.buttonSend}>
            <Button label={'Send'} onPress={() => {
              forgotPasswordHandle()
            }} />
          </View>
          <AlertModal visible={alertModalvisible} message={alertMessage} onOk={handleOnOKClick} />
          {/* <LoaderModal visible={loaderModal} transparent={true} /> */}
        </View>
      </View>
      <ErrorModal
        erroModal={erroModal}
        setErrorModal={setErrorModal}
        email={email}
      />

    </View>
  );
};

export default ForgotPassword;


