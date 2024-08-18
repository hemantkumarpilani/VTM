import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import { responsiveScreenWidth, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: Colors.white,
      width: responsiveScreenWidth(80),
      borderRadius: 10,
      overflow: 'hidden',
    },
    body: {
      padding: responsiveWidth(3),
      alignItems: 'center'
    },
    VTM: {
      color: Colors.black,
      fontSize: responsiveFontSize(3)
    },
    bodyText: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: 'center'
    },
    okButton: {
      width: responsiveWidth(50),
      padding: 8,
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: Colors.lightblue,
      borderRadius: 7,
    },
    textStyle: {
      color: Colors.white,
      fontWeight: '900',
      fontSize: 18,
      letterSpacing: 2,
    }
  });
  
  export default styles;  