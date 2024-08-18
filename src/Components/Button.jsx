import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import styles from '../ComponentsStyles/buttonstyle';

const Button = ({label, onPress, temporaryProp, particularStyle, bookmarkVideo, add}) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {
          width: particularStyle ? '25%' : null,
          alignSelf: particularStyle ? 'center' : null,
          top : particularStyle ? 5 : null,
          borderRadius : bookmarkVideo ? 20 : null,
          width : bookmarkVideo ? '105%' : null,
          right : bookmarkVideo ? '2%' : null,
          borderRadius : label=='Login' ? 3 : null,
          borderRadius : label=='Save' || 'Cancel' ? 5 : null,
          width : add ? '15%' : null
        },
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.buttonText,
          {fontWeight: temporaryProp ? '500' : '900'},
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
