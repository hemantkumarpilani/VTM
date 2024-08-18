import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    top: 10,
    width: '108%',
    right: 15,
  },
  text: {
    borderWidth: 1,
    padding: 12,
    backgroundColor: '#333333',
    color: Colors.white,
    borderRadius: 5,
  },
});

export default styles;
