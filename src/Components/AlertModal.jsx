
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styles from '../ComponentsStyles/alertmodal';

const AlertModal = ({ visible, message, onOk }) => {

  const handleOnOk = () => {
    onOk();
  }
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={onOk}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View style={styles.body}>
            <Text style={styles.VTM}>VTM</Text>
            <Text style={styles.bodyText}>{message}</Text>
            <TouchableOpacity style={styles.okButton} onPress={handleOnOk}>
              <Text style={styles.textStyle}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default AlertModal;
