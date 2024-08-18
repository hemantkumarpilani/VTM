import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopTabNavigation from '../../Navigation/TopTabNavigation';
import CustomHeader from '../../Components/CustomHeader';
import { useIsFocused, useRoute } from '@react-navigation/native';

const Home = ({route}) => {
  const route1 = useRoute();
  
  return (
    <>
      <CustomHeader headerTitle={'Home'} plusIcon ={'plusIcon'} />
      <TopTabNavigation
      firstTimeLogin = {route?.params?.firstTimeLogin}

       /> 
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
