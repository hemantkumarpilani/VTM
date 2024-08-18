import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    backgroundColor : Colors.white
  },
  text: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    textAlign: 'center',
    color: Colors.black,
    backgroundColor: Colors.lightgrey,
    // borderWidth:1
  },
});
export default styles;
