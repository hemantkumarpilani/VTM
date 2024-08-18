import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import styles from '../ComponentsStyles/loadermodalstyle';

const LoaderModal = ({visible, transparent}) => {
  return (
    <Modal visible={visible} transparent={transparent}>
      <View
        style={styles.outerContainer}>
        <ActivityIndicator size={45} color={Colors.darkSkyblue} />
      </View>
    </Modal>
  );
};

export default LoaderModal;


