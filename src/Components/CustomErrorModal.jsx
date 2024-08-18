import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Colors from '../utils/Colors';
//import styles from '../ComponentsStyles/errormodalstyle';

const CustomErrorModal = (props) => {
  return (
    <ReactNativeModal isVisible={props.isVisible} backdropOpacity={0}>
      <View style={styles.outerContainer}>
        <Text style={styles.text}>{props.message}</Text>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
    outerContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      top: 10,
      width: '105%',
      //right: 15,
      marginBottom:10,
      alignSelf:'center'
    },
    text: {
      borderWidth: 1,
      padding: 12,
      backgroundColor: '#333333',
      color: Colors.white,
      borderRadius: 5,
    },
  });
  


export default CustomErrorModal;
