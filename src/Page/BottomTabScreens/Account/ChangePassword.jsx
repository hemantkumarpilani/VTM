
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable } from 'react-native'; // Import Alert
import CustomHeader from '../../../Components/CustomHeader';
import CustomTextInput from '../../../Components/CustomTextInput';

import styles from './AccountStyle/changepasswordstyle';
import Button from '../../../Components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changePasswordApi, encryptedPasswordApi } from '../../../api/axiosApi';
import AlertModal from '../../../Components/AlertModal';
//import ErrorModal from '../../../Components/ErrorModal';
import CustomErrorModal from '../../../Components/CustomErrorModal';
import ToastModal from '../../../Components/ToastModal';


const arrowimg = require('../../../assets/images/back.png');
const chngpasswordimg = require('../../../assets/images/chngpassword.png');

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPasswordFocused, setOldPasswordFocused] = useState(false);
  const [newPasswordFocused, setNewPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [passwordVisible3, setPasswordVisible3] = useState(false);
  const [messageErrorModal,setMessageErrorModal]=useState('');
  const [erroModal, setErrorModal] = useState(false);

  const [toastModal, setToastModal] = useState(false);
  const [alertModalvisible, setAlertModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleOnOKClick = () => {
    setAlertModalVisible(false);
  }


  const handleChangePassword = async () => {
    console.log('oldpwd', oldPassword.trim.length)

    if (oldPassword === '' || oldPassword.trim().length ==0) {
      console.log('oldPassword1');
      setMessageErrorModal('Please enter old password')
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 2000)
      return;
    }
    if (newPassword === '' || newPassword.trim(' ').length ==0) {
      setMessageErrorModal('Please enter New password')
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 2000)
      return;
    }

    if (confirmPassword === '' || confirmPassword.trim(' ').length ==0) {
      setMessageErrorModal('Please enter Confirm password')
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 2000)
      return;
    }

    if (oldPassword === newPassword) {
      setAlertMessage('Old and New Password should be different');
      setAlertModalVisible(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setAlertMessage('New password and Confirm password are not matching');
      setAlertModalVisible(true);
      return;
    }
  
      if (!(passwordRegex.test(newPassword)) || !(passwordRegex.test(confirmPassword))) {
      setAlertMessage('Password should contain at least 8 characters,minimum 1 uppercase,1 lowercase,1 number and 1 special character');
      setAlertModalVisible(true);
      return;
    }
 
    const storedPassword = await AsyncStorage.getItem('userEnteredPassword');

    console.log('Retrieved user-entered password In change password file:', storedPassword);

    if (oldPassword !== storedPassword) {
      console.log('oldPassword');
      setMessageErrorModal('Your Old password is not correct')
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 2000)
      return;
    }

    const oldEncryptedPassword = await AsyncStorage.getItem('encryptedPassword1');
     
    console.log("oldEncryptedPassword=>>> ",oldEncryptedPassword);
  
    const newEncryptedPassword = await encryptedPasswordApi(newPassword);
    console.log("newEncryptedPassword=>>> ",newEncryptedPassword?.data?.encrypted_password,);
    
    const response = await changePasswordApi(oldEncryptedPassword);
    console.log(response.data);
    // console.log(response.status)
    setToastModal(true);
    setTimeout(() => {
      setToastModal(false);
      navigation.navigate('Login');
    }, 1700)
     
    await AsyncStorage.removeItem('encryptedPassword1');
  };


  const handleOldPasswordFocus = () => {
    setOldPasswordFocused(true);
  }

  const handlenewPasswordFocused = () => {
    setNewPasswordFocused(true);
  }

  const handleconfirmPasswordFocused = () => {
    setConfirmPasswordFocused(true);
  };

  function oldPasswordSetter(oldPassword) {
    setOldPassword(oldPassword);
  }

  function newPasswordSetter(newPassword) {
    setNewPassword(newPassword);
  }
  function confirmPasswordSetter(confirmPassword) {
    setConfirmPassword(confirmPassword);
  }


  const togglePasswordVisibility1 = () => {
    setPasswordVisible1(!passwordVisible1);

  };
  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);

  };
  const togglePasswordVisibility3 = () => {
    setPasswordVisible3(!passwordVisible3);

  };
  return (
    <View style={styles.keyboardAvoidingView} behavior='padding'>
    
        <View style={styles.container}>
          <View>
            <CustomHeader headerTitle={'Change Password'} require={arrowimg} />
          </View>
          <View style={styles.imgCon}>
            <Image source={chngpasswordimg} style={styles.img} />
          </View>
          <View style={styles.textInputContainer}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Image style={styles.logo} source={require('../../../assets/images/padlock.png')} />
              <Text style={[styles.placeholder, { marginTop: 20, marginLeft: 35, color: 'black', fontSize: 14, fontWeight: '500' }, { color: oldPasswordFocused ? '#007ac2' : 'gray' }, { top: oldPasswordFocused || oldPassword !== '' ? -20 : 7 }]}>Old Password</Text>
              <TextInput style={[styles.textInput, { borderWidth: oldPasswordFocused ? 2 : 1 }, { borderColor: oldPasswordFocused ? '#007ac2' : 'gray' }]}
                onChangeText={oldPasswordSetter}
                value={oldPassword}
                onFocus={handleOldPasswordFocus}
                onBlur={() => setOldPasswordFocused(false)}
                secureTextEntry={!passwordVisible1}
              />
              <Pressable onPress={togglePasswordVisibility1} style={styles.iconContainer} >
                <Image
                  style={styles.icon}
                  source={passwordVisible1 ? require('../../../assets/images/hidden.png') : require('../../../assets/images/show.png')}
                />
              </Pressable>
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Image style={styles.logo} source={require('../../../assets/images/padlock.png')} />
              <Text style={[styles.placeholder, { marginTop: 20, marginLeft: 35, color: 'black', fontSize: 14, fontWeight: '500' }, { color: newPasswordFocused ? '#007ac2' : 'gray' }, { top: newPasswordFocused || newPassword !== '' ? -20 : 7 }]}>New Password</Text>
              <TextInput style={[styles.textInput, { borderWidth: newPasswordFocused ? 2 : 1 }, { borderColor: newPasswordFocused ? '#007ac2' : 'gray' }]}
                onChangeText={newPasswordSetter}
                value={newPassword}
                onFocus={handlenewPasswordFocused}
                onBlur={() => setNewPasswordFocused(false)}
                secureTextEntry={!passwordVisible2}
              />
              <Pressable onPress={togglePasswordVisibility2} style={styles.iconContainer} >
                <Image
                  style={styles.icon}
                  source={passwordVisible2 ? require('../../../assets/images/hidden.png') : require('../../../assets/images/show.png')}
                />
              </Pressable>
            </View>

            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Image style={styles.logo} source={require('../../../assets/images/padlock.png')} />
              <Text style={[styles.placeholder, { marginTop: 20, marginLeft: 35, color: 'black', fontSize: 14, fontWeight: '500' }, { color: confirmPasswordFocused ? '#007ac2' : 'gray' }, { top: confirmPasswordFocused || confirmPassword !== '' ? -20 : 7 }]}>Confirm Password</Text>
              <TextInput style={[styles.textInput, { borderWidth: confirmPasswordFocused ? 2 : 1 }, { borderColor: confirmPasswordFocused ? '#007ac2' : 'gray' }]}
                onChangeText={confirmPasswordSetter}
                value={confirmPassword}
                onFocus={handleconfirmPasswordFocused}
                onBlur={() => setConfirmPasswordFocused(false)}
                secureTextEntry={!passwordVisible3}
              />
              <Pressable onPress={togglePasswordVisibility3} style={styles.iconContainer} >
                <Image
                  style={styles.icon}
                  source={passwordVisible3 ? require('../../../assets/images/hidden.png') : require('../../../assets/images/show.png')}
                />
              </Pressable>
            </View>
            <View style={styles.submitButton}>
              <Button label={'Submit'} onPress={handleChangePassword} />
            </View>
            <AlertModal visible={alertModalvisible} message={alertMessage} onOk={handleOnOKClick} />
            <CustomErrorModal isVisible={erroModal} message={messageErrorModal} />
            <ToastModal visible={toastModal} label={'Password changes successfully'}  />
          </View>
        </View>
    
    </View>
  );
};


export default ChangePassword;
