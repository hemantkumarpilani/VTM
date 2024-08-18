import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoaderModal from '../../Components/LoaderModal';
import SignupModal from '../../Components/SignupModal';
import Colors from '../../utils/Colors';

import Button from '../../Components/Button';
import styles from './loginstyle';
import {useIsFocused} from '@react-navigation/native';
import CustomTextInput from '../../Components/CustomTextInput';
import ErrorModal from '../../Components/ErrorModal';
import {encryptedPasswordApi, loginApi} from '../../api/axiosApi';
import ToastModal from '../../Components/ToastModal';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const Login = ({navigation, route}) => {
  const {width, height} = useWindowDimensions();
  const [signupModal, setSignUpModal] = useState(false);
  const [loaderModal, setLoaderModal] = useState(false);
  const [email, setEmail] = useState('');
  const emailTextInput = 'Email';
  const [password, setPassword] = useState('');
  const passwordTextInput = 'Email';
  const focused = useIsFocused();
  let firstTimeLogin = 'yes';
  const [erroModal, setErrorModal] = useState(false);
  const [invalidCredentialModal, setInvalidCredentialModal] = useState(false);
  const isFocused = useIsFocused();
  const [toastModal, setToastModal] = useState(false);

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const [accountClosed, setAcountClosed] = useState(false);

  useEffect(() => {
    if (route.params?.AccountClosed) {
      setToastModal(true);
      setTimeout(() => {
        setToastModal(false);
      }, 1500);
    }

    // const backHandler = ()=>{
    //   BackHandler
    // }

    return () => {
      setEmail('');
      setPassword('');
    };
  }, [isFocused]);

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      // return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
  }, []);

  const signUpHandle = () => {
    setLoaderModal(true);
    setTimeout(() => {
      setLoaderModal(false);
      setSignUpModal(true);
    }, 1000);
  };

  const loginHandle = async () => {
    
    
    if (emailRegex.test(email)) {
      setLoaderModal(true);

      const response = await encryptedPasswordApi(password.trim());
      const loginResponse = await loginApi(
        email,
        response?.data?.encrypted_password,
      );
      console.log('responses',loginResponse?.data)

      if (loginResponse?.data?.message ==
        "This account has beed closed, Please contact to administrator.") {
        setLoaderModal(false);
        setAcountClosed(true);
        setTimeout(() => {
          setAcountClosed(false);
        }, 1200);
      } else {
        
        if (
          loginResponse?.data?.message ==
          "Invalid credentials"
        ) {
          setLoaderModal(false);
          setInvalidCredentialModal(true);
          setTimeout(() => {
            setInvalidCredentialModal(false);
          }, 1200);
        } else {
          setLoaderModal(false);
          navigation.replace('BottomTabNavigation', {
            firstTimeLogin: firstTimeLogin,
          });
        }
      }
      return;
    }

    if (email == '') {
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 1000);
      return;
    }

    if (email != '') {
      if (password == '') {
        setErrorModal(true);
        setTimeout(() => {
          setErrorModal(false);
        }, 1000);
        return;
      }
    }
  };

  return (
    <View style={[styles.outerContainer]}>
      {console.log('inside return',email)}
      {/* logo */}
      <ScrollView
        style={{height: height, marginTop: responsiveScreenHeight(10)}}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/Logo.png')}
            style={styles.logoImage}
          />
        </View>

        <CustomTextInput
          email={email}
          setEmail={setEmail}
          emailTextInput={emailTextInput}
        />

        <CustomTextInput
          password={password}
          setPassword={setPassword}
          passwordTextInput={passwordTextInput}
        />
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forGotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Button label={'Login'} onPress={loginHandle} />
        </View>

        <Text style={styles.dontHaveAccountText}>
          Don't have an account?{' '}
          <Text onPress={() => signUpHandle()} style={styles.signUpText}>
            Sign Up
          </Text>
        </Text>
      </ScrollView>
      {/* loaderModal */}
      <LoaderModal visible={loaderModal} transparent={true} />
      <SignupModal
        visible={signupModal}
        transparent={true}
        setSignUpModal={setSignUpModal}
      />
      <ErrorModal
        erroModal={erroModal}
        setErrorModal={setErrorModal}
        email={email}
      />

      <ToastModal
        visible={invalidCredentialModal}
        label={'Invalid credentials'}
      />

      <ToastModal visible={toastModal} label={'Account has been closed'} />

      <ToastModal
        visible={accountClosed}
        label={'This account has been closed. Please contact to administrator.'}
      />
    </View>
  );
};

export default Login;
