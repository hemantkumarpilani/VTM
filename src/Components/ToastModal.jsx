import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styles from '../ComponentsStyles/toastmodalstyle';

const ToastModal = props => {
  // console.log('proppsss',props)
  return (
    <Modal
      visible={props?.visible}
      transparent={true}
      animationType="fade">
      <View style={styles.outerContainer}>
        <Text
          style={styles.text}>
          {props?.label}
        </Text>
      </View>
    </Modal>
  );
};

export default ToastModal;


