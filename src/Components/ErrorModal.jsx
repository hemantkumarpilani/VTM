import {Modal, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import styles from '../ComponentsStyles/errormodalstyle';
// import Modal from "react-native-modal";

const ErrorModal = props => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


  return (
    <ReactNativeModal isVisible={props.erroModal} backdropOpacity={0}>
      <View style={styles.outerContainer}>
        <Text style={styles.text}>
          {(props.email == '' )
            ? 'Please enter email'
            : (emailRegex.test(props?.email) || props?.email?.trim())
            ? 'Please enter password'
            : emailRegex.test(props?.forgotEmail)
            ? 'Please enter valid email'
            : props.createManual
            ? 'Please enter manual name'
            : props.message
            ? 'Please enter manual name'
            : 'Please enter valid email'}
        </Text>
      </View>
    </ReactNativeModal>
  );
};

export default ErrorModal;
