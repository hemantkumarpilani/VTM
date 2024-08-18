import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Colors from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import styles from '../ComponentsStyles/customheaderstyle';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';

const CustomHeader = props => {
  const myManualIsFocused = useSelector(state => state.reducer);
  const navigation = useNavigation();

  return (
    <View
      style={[
        {
         flexDirection:  props?.require ? 'row' : null,
        
          width: props?.editManual ? '112%' : null,
          right: props?.editManual ? 20 : null,
          bottom: props?.editManual ? 22 : null,
        },
        styles.outerContainer,
      ]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
        {props?.require && (
          <Image source={props?.require} style={styles.image} />
        )}
      </TouchableOpacity>
      <View style={{flexDirection:'row'}}>
      <Text
        style={[
          {
            textAlign: props?.require ? 'center' : null,
            width: props?.require ? '90%' : null,
            left : myManualIsFocused?.myManualIsFocused ?  12 : null
          },
          styles.text,
        ]}>
        {props?.headerTitle}
      </Text>
      {myManualIsFocused?.myManualIsFocused &&
       (
        <TouchableOpacity
          style={{
            left: myManualIsFocused?.myManualIsFocused ? 120 : null
          }}
          onPress={() => navigation.navigate('CreateManual')}>
          <PlusIcon name={'pluscircleo'} size={25} color={Colors.lightblue} style={{}} />
        </TouchableOpacity>
      )}
      </View>
      
    </View>
  );
};

export default CustomHeader;
