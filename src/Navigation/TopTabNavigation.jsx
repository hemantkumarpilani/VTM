import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Videos from '../Page/TopTabScreens/Videos';
import Categories from '../Page/TopTabScreens/Categories';
import MyManuals from '../Page/TopTabScreens/MyManuals';
import Colors from '../utils/Colors';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import StarIcon from 'react-native-vector-icons/AntDesign';
import PlusIcon from 'react-native-vector-icons/AntDesign';

const TopTabNavigator = createMaterialTopTabNavigator();

const TopTabNavigation = props => {
  const focusedd = useIsFocused();
  const {navigation} = props;

  return (
    <TopTabNavigator.Navigator
    initialRouteName='Videos'
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.darkGrey,
          height: 40,
        },
        tabBarActiveTintColor: Colors.white,
        swipeEnabled: false,

        tabBarIndicatorStyle: {
          backgroundColor: Colors.lightblue,
          bottom: '0%',
          height: '100%',
          borderRadius: 20,
        },
        tabBarPressColor: Colors.darkGrey,
      }}
      >
      <TopTabNavigator.Screen
        name="Videos"
        component={Videos}
        initialParams={{firstTimeLogin: props?.firstTimeLogin}}
        options={{
          tabBarLabel: ({focused}) => {
            return (
              <View style={{bottom: 5}}>
                <Text style={{color: focused ? Colors.white : null}}>
                  Videos
                </Text>
              </View>
            );
          },
        }}
      />
      <TopTabNavigator.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarLabel: ({focused}) => {
            return (
              <View style={{bottom: 5}}>
                <Text style={{color: focused ? Colors.white : null}}>
                  Categories
                </Text>
              </View>
            );
          },
        }}
      />
      <TopTabNavigator.Screen
        name="MyManuals"
        component={MyManuals}
        options={{
          // tabBarIcon : ({focused})=>{
          //   return(
          //     <View>
          //      {focused ? <Text></Text> : null}
          //     </View>
          //   )
          // },
          tabBarLabel: ({focused}) => {
            return (
              <View
                style={{
                  bottom: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // borderWidth: 1,
                }}>
                <StarIcon
                  name={'staro'}
                  size={20}
                  color={focused ? Colors.white : '#838484'}
                  style={{
                    borderWidth: 1,
                    borderColor: focused ? Colors.white : '#838484',
                    right: 5,
                    padding: 2,
                    borderRadius: 20,
                  }}
                />
                <Text
                  style={{
                    color: focused ? Colors.white : null,
                    textAlignVertical: 'center',
                  }}>
                  My Manuals
                </Text>
              </View>
            );
          },
          // tabBarIcon: () => {
          //   return (
          //     <View>
          //       <StarIcon
          //         name={'staro'}
          //         size={20}
          //         color={'red'}
          //         style={
          //           {
          //             // borderWidth: 1,
          //             // borderColor: 'red',
          //             // padding: 5,
          //             // borderRadius: 20,
          //           }
          //         }
          //       />
          //     </View>
          //   );
          // },
        }}
      />
    </TopTabNavigator.Navigator>

    //
  );
};

export default TopTabNavigation;
