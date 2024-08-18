import {
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import Colors from '../utils/Colors';
import styles from '../ComponentsStyles/signupmodalstyle';

const SignupModal = ({visible, transparent, setSignUpModal}) => {
  const registerAccount = () => {
    Linking.openURL('http://3.21.214.37/admin/register');
    setSignUpModal(!visible);
  };
  return (
    <Modal visible={visible} transparent={transparent}>
      <View
        style={styles.outerContainer}>
        <View
          style={styles.innerContainer}>
          <Text
            style={styles.text}>
            Welcome to VTM, please use link
            <Text
              style={styles.linkText}
              onPress={() =>
                Linking.openURL('http://3.21.214.37/admin/register')
              }>
              {' '}
              http://3.21.214.37/admin/register
            </Text>{' '}
            to connect for your dental practice
          </Text>
          <View
            style={styles.buttonsContainer}>
            <TouchableOpacity onPress={()=>setSignUpModal(false)} >
              <Text
                style={styles.cancelText}>
                CANCEL
              </Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>registerAccount()}>
              <Text
                style={styles.okText}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SignupModal;


