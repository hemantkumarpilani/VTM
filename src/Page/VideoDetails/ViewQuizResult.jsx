import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import CustomHeader from '../../Components/CustomHeader';
import LoaderModal from '../../Components/LoaderModal';
import FastImage from 'react-native-fast-image';

const arrowimg = require('../../assets/images/back.png');

const ViewQuizResult = ({ route }) => {
  const { videoId } = route.params;
  const isFocused = useIsFocused();
  const [quizResult, setQuizResult] = useState(null);
  const navigation = useNavigation();
  const [loaderState, setLoaderState] = useState(false);

  useEffect(() => {
    setLoaderState(true);
    setTimeout(() => {
    setLoaderState(false)
    }, 1000);
  }, [])

  useEffect(() => {
    const fetchQuizResult = async () => {
        let token = await AsyncStorage.getItem('sessiontoken');
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        };
        const response = await axios.get(
          `http://3.21.214.37/admin/api/V3/video/getVideoAnswer/${videoId}`,
          { headers }
        );
        setQuizResult(response.data.videoUserDetails);
        console.log('ViewQuizResult ',response.data.videoUserDetails)
        setLoaderState(false);
      } catch (error) {
        console.error('Error fetching quiz result:', error);
      }
    };

    fetchQuizResult();
  }, [videoId]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ViewResultAnswer', { userData: item })}>
      <View style={styles.itemContainer}>
        <View style={styles.userInfo}>
          <Text style={styles.itemText}>{item.user_name}</Text>
          <Text style={styles.itemText}>{item.user_email}</Text>
        </View>
        <Text style={styles.viewAllText}>View All</Text>
        <Image source={require('../../assets/images/right-arrow2.png')} style={styles.viewimage} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}> 
        <CustomHeader headerTitle={'View Quiz Result'} require={arrowimg} />
        {quizResult && quizResult.length === 0 ? (
        <View style={styles.gifStyle}>
          <View>
            <FastImage
              style={styles.gifImg}
             
 source={require('../../assets/images/empty.gif')}
   resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <Text style={styles.recordText}>No quiz results found</Text>
        </View>
      ) : (
        <FlatList
          data={quizResult}
          renderItem={renderItem}
          keyExtractor={(item) => item.user_id.toString()}
        />
      )}
     {isFocused && <LoaderModal visible={loaderState} transparent={true} />}
    </View>
  );
};

// source={require('../../assets/images/empty.gif')}
//resizeMode={FastImage.resizeMode.contain}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopWidth: 0.5
  },
  gifStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gifImg: {
    width: 160,
    height: 160
  },
  recordText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center'
  },
  itemContainer: {
    backgroundColor: '#e0e0e0',
    marginTop: '3%',
    padding: 10,
    marginVertical: 3,
    marginHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userInfo: {
    flex: 1
  },
  itemText: {
    fontSize: 16,
    color: 'black'
  },
  viewAllText: {
    fontSize: 15,
    color: '#565353'
  },
  viewimage: {
    height: 15,
    width: 15,
    tintColor: '#656262',
    marginLeft: '2%'
  }
});

export default ViewQuizResult;
