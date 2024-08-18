

import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
//import { toggleSwitch1, toggleSwitch2 } from 'path/to/your/actions'; // Import your action creators
import { toggleSwitch1,toggleSwitch2 } from '../../../Redux/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../../../Components/CustomHeader';
import styles from './AccountStyle/notificationsstyle'; 
import axios from 'axios'; // Import Axios 

const arrowimg = require('../../../assets/images/back.png');

const Notifications = ({ route, navigation }) => {
  const isenabled1 = useSelector(state => state.reducer.isenabled1); // Assuming reducer is your combined reducer
  const isEnabled2 = useSelector(state => state.reducer.isEnabled2);
  const dispatch = useDispatch();
  const { userInfo } = route.params;

  const handleToggleSwitch1 = () => {
    dispatch(toggleSwitch1()); 
    updateNotificationSettings(isenabled1, isEnabled2);
  };

  const handleToggleSwitch2 = () => {
    dispatch(toggleSwitch2()); 
    updateNotificationSettings(isenabled1, isEnabled2);
  };

  const updateNotificationSettings = async (emailEnabled, notificationEnabled) => {
         console.log("Inside updateNotifications")
   
      try{
        let token= await AsyncStorage.getItem('sessiontoken');

        headers={
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token,
        }
        let data=JSON.stringify({
        users: {
          user_firstname: userInfo?.user?.user_firstname,
      
             user_lastname: userInfo?.user?.user_lastname,
           email_yn: emailEnabled ? 'Y' : 'N',
         // email_yn: 'N' ,
           notification_yn: notificationEnabled ? 'Y' : 'N',
         // notification_yn: 'N',
        }
      });

      const response=await axios.post('http://3.21.214.37/admin/api/V1/general/editUser',
      data,
      {headers}
 );

      console.log('API Response:', response.data);
    } catch (error) {
      console.error('API Error:', error);
  }
  }
  return (
    <View>
      <CustomHeader headerTitle={'Notifications'} require={arrowimg} />
      <View style={styles.container}>
        <View style={styles.container1}>
          <Text style={styles.label}>Email</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: '#eaedf6', true: '#eaedf6' }}
            thumbColor={isenabled1 ? '#007ac3' : '#ffffff'}
            onValueChange={handleToggleSwitch1} 
            value={isenabled1}
          />
        </View>
        <View style={styles.border}></View>
        <View style={styles.container1}>
          <Text style={styles.label}>All Notifications:</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: '#eaedf6', true: '#eaedf6' }}
            thumbColor={isEnabled2 ? '#007ac3' : '#ffffff'}
            onValueChange={handleToggleSwitch2} 
            value={isEnabled2}
          />
        </View>
        <View style={styles.border}></View>
      </View>
    </View>
  );
};

export default Notifications;

