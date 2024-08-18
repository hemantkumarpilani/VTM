import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Page/BottomTabScreens/Home';
import UploadVideo from '../Page/BottomTabScreens/UploadVideo';
import Favourites from '../Page/BottomTabScreens/Favourites';
import Account from '../Page/BottomTabScreens/Account/Account';
import HomeIcon from 'react-native-vector-icons/Entypo';
import VideoIcon from 'react-native-vector-icons/FontAwesome5';
import HeartIcon from 'react-native-vector-icons/AntDesign';
import AccountIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../utils/Colors';
const BottomTab = createBottomTabNavigator();
const BottomTabNavigation = ({route}) => {
  return (
    <BottomTab.Navigator
    initialRouteName='Home'
    screenOptions={{
      tabBarHideOnKeyboard : true
    }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        initialParams={{'firstTimeLogin': route?.params?.firstTimeLogin}}

        options={{
          headerShown : false,
          
          tabBarLabelStyle: {
            fontSize: 13,
            bottom: 3,
          },
          tabBarStyle: {
            height: '8%',
          },
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <HomeIcon
                  name={'home'}
                  color={focused ? Colors.lightblue : Colors.bottomTabIconColorUnfocuesd}
                  style={{bottom: -2}}
                  size={28}
                />
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        name="UploadVideo"
        component={UploadVideo}
        options={{
          headerTitle: 'Upload Video',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: Colors.lightblue,
          },
          tabBarLabelStyle: {
            fontSize: 13,
            bottom: 3,
          },
          tabBarStyle: {
            height: '8%',
          },
          headerStyle:{
            borderBottomWidth:1,
            borderBottomColor:'grey',
          },
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <VideoIcon
                  name={'video'}
                  color={focused ? Colors.lightblue : Colors.bottomTabIconColorUnfocuesd}
                  size={22}
                />
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={Favourites}
        options={{
          headerTitle: 'Favorites',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: Colors.lightblue,
          },
          tabBarLabelStyle: {
            fontSize: 13,
            bottom: 3,
          },
          tabBarStyle: {
            height: '8%',
          },
          headerStyle:{
            borderBottomWidth:1,
            borderBottomColor:'grey',
          },
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <HeartIcon
                  name={'heart'}
                  color={focused ? Colors.lightblue : Colors.bottomTabIconColorUnfocuesd}
                  size={22}
                />
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 13,
            bottom: 3,
          },
          tabBarStyle: {
            height: '8%',
          },
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <AccountIcon
                  name={'account-cog'}
                  color={focused ? Colors.lightblue : Colors.bottomTabIconColorUnfocuesd}
                  size={28}
                />
              </View>
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({});
