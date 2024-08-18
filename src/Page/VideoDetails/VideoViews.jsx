import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../Components/CustomHeader';
import {getVideoViewsApi} from '../../api/axiosApi';
import Colors from '../../utils/Colors';
import LoaderModal from '../../Components/LoaderModal';

let count = 0;
const VideoViews = ({route}) => {
  const arrowimg = require('../../assets/images/back.png');
  const [videoViewData, setVideoViewData] = useState([]);
  const [totalViews, setTotalViews] = useState();
  const [loaderModal, setLoaderModal] = useState(false)

  useEffect(() => {
    setLoaderModal(true)
    getVideoViewReponse();
  }, []);


  const getVideoViewReponse = async () => {
    const response = await getVideoViewsApi(route?.params?.item?.video_id);
    setTotalViews(response?.data?.videoView?.length)
    setVideoViewData(response?.data?.videoView);
    setLoaderModal(false)
  };
  return (
    <View style={{flex: 1}}>
      <CustomHeader headerTitle={'Video Views'} require={arrowimg} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: '2%',
          borderBottomWidth: 1,
          marginHorizontal: '1%',
          borderBottomColor: Colors.videoViewsBottomWidthColor,
        }}>
        <Text
          style={{
            width: '70%',
            color: Colors.videoViewsTextColor,
            fontSize: 15,
          }}>
          {route?.params?.item?.video_name}
        </Text>
        <Text style={{color: Colors.videoViewsTextColor, fontSize: 15}}>
          Total Views{' '}
          <Text style={{color: Colors?.black, fontWeight: '900'}}>
            {totalViews}
          </Text>{' '}
        </Text>
      </View>
      <FlatList
        data={videoViewData}
        renderItem={({item}) => {
          return (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: '1%',

                  borderBottomColor: Colors.videoViewsBottomWidthColor,
                }}>
                <Text
                  style={{
                    marginTop: '2%',
                    color: Colors.videoViewsTextColor,
                    fontSize: 15,
                  }}>
                  {item?.user_name}
                </Text>

                <Text style={{color: Colors.videoViewsTextColor, fontSize: 15}}>
                  Total Views
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  //   paddingVertical: '2%',
                  borderBottomWidth: 1,
                  marginHorizontal: '1%',
                  borderBottomColor: Colors.videoViewsBottomWidthColor,
                }}>
                <Text
                  style={{
                    width: '70%',
                    marginBottom: '2%',
                    color: Colors.videoViewsTextColor,
                    fontSize: 14,
                  }}>
                  {item?.email}
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',
                    marginRight: '8%',
                    marginBottom: '2%',
                    color: Colors.videoViewsTextColor,
                    fontSize: 15,
                  }}>
                  {item?.Num}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <LoaderModal visible={loaderModal} transparent={true}/>
    </View>
  );
};

export default VideoViews;

const styles = StyleSheet.create({});
