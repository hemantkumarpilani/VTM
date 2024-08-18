import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.lightblue,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    letterSpacing: 2,
  },
});

export default styles;
