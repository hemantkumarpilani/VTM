import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';

const styles = StyleSheet.create({
  outerContainer: {
    // borderWidth:1,
    gap: 20,
    marginTop: '8%',
    marginHorizontal:'4%'
   
  },
  innerContainer: {
    flexDirection: 'row',
  },
  emailOrLockIcon: {
    alignSelf: 'center',
    padding: 10,
  },
  textInputContainer: {
    flexDirection: 'row',
    borderWidth: 2,
  },
  textInput: {
    width: '100%',
    paddingLeft: 20,
    color: Colors.black,
  },
  passwordEyeContainer :{
    justifyContent: 'center', right: '80%'
  }
});

export default styles;
