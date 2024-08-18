import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '90%',
    elevation: 1,
    borderRadius: 3,
    backgroundColor: Colors.white,
    paddingVertical: '5%',
    paddingHorizontal: '5%',
  },
  text: {
    color: Colors.black,
    fontSize: 17,
    textAlign: 'justify',
  },
  linkText: {
    color: Colors.urlColor,
    fontWeight: '400',
    textDecorationLine: 'underline',
    textDecorationColor: Colors.urlColor,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '5%',
  },
  cancelText: {
    color: Colors.darkSkyblue,
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: '400',
    right: 50,
  },
  okText: {
    color: Colors.darkSkyblue,
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: '400',
  },
});

export default styles;
