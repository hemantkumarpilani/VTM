import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  useWindowDimensions,
  BackHandler,
} from 'react-native';
import React, {Children, useEffect, useState} from 'react';
import SearchIcon from 'react-native-vector-icons/Feather';
import Colors from '../../utils/Colors';
import {communityVideoApi, groupApi, searchVideoApi} from '../../api/axiosApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarIcon from 'react-native-vector-icons/AntDesign';
import HeartIcon from 'react-native-vector-icons/Entypo';
import LoaderModal from '../../Components/LoaderModal';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ToastModal from '../../Components/ToastModal';
import {AddFavourite} from './AddFavourite';
import {RemoveFavourite} from './RemoveFavourite';
import FastImage from 'react-native-fast-image';
import CustomBottomSheet from '../../Components/CustomBottomSheet';

let response;
let searchVideos;
let searchVideosFlag = false;
const Videos = ({route}) => {
  const navigation = useNavigation();
  const [videosData, setVideosData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loaderState, setLoaderState] = useState(false);
  const [toastModal, setToastModal] = useState(false);
  const [addlikedVideo, setAddlikedVideo] = useState(false);
  const [removelikedVideo, setRemovelikedVideo] = useState(false);
  const [videos, setVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const isFocused = useIsFocused();
  const [likedVideoIds, setLikedVideoIds] = useState([]);
  const [searchVideosData, setSearchVideosData] = useState([]);
  const [videoState, setVideosState] = useState(false);
  const [bottomSheeetModal, setBottomSheetModal] = useState(false);
  const [videoBookmarkData, setVideoBookMarkData] = useState();
  // const [bookmark, setBookmark] = useState([]);
  const [videoAddedInManualToastModal, setVideoAddedInManualToastModal] =
    useState(false);
  const [manualShouldAddedToastModal, setManualShouldAddedToastModal] =
    useState(false);

  const getCommunityVideoResponse = async () => {
    setLoaderState(true);
    const token = await AsyncStorage.getItem('sessiontoken');

    response = await communityVideoApi(token, currentPage);

    if (response?.data?.videos) {
      if (searchVideos?.length >= 0 && !searchVideosFlag) {
        setVideosData(response?.data?.videos);
      } else {
        if (currentPage == 0) {
          setVideosData(response?.data?.videos);
        } else {
          setVideosData([...videosData, ...response?.data?.videos]);
        }
      }

      setLoaderState(false);
    } else {
      setLoaderState(false);
    }
  };

  const formatDate = timestamp => {
    const date = new Date(parseInt(timestamp));
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    if (route?.params?.firstTimeLogin) {
      navigation.setParams({
        firstTimeLogin: undefined,
      });
      setToastModal(true);
      setTimeout(() => {
        setToastModal(false);
      }, 1500);
    }

    if (videosData?.length == 0) {
      getCommunityVideoResponse();
      return;
    } else {
      setLoaderState(true);
      getCommunityVideoResponse();
    }
  }, [currentPage]);

  const loadMoreItem = () => {
    if (searchVideos?.length > 0) {
    } else {
      searchVideosFlag = true;
      setCurrentPage(currentPage + 1);
    }
  };

  const navigateToVideoDetails = item => {
    navigation.navigate('VideoDetails', {item});
  };

  const handleToggleFavorite = async item => {
    try {
      if (item?.status_fav === 1) {
        await RemoveFavourite(item?.video_id);
        setRemovelikedVideo(true);
        setTimeout(() => {
          setRemovelikedVideo(false);
        }, 1000);
        setVideosData(prevVideos =>
          prevVideos.map(video => {
            if (video?.video_id === item?.video_id) {
              return {...video, status_fav: 0};
            }
            return video;
          }),
        );
      } else {
        await AddFavourite(item?.video_id);
        setAddlikedVideo(true);
        setTimeout(() => {
          setAddlikedVideo(false);
        }, 1000);
        setVideosData(prevVideos =>
          prevVideos.map(video => {
            if (video?.video_id === item?.video_id) {
              return {...video, status_fav: 1};
            }
            return video;
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchVideo = async text => {
    text = text?.toLowerCase();
    if (text.length > 2) {
      const response = await searchVideoApi(text);
      if (response?.data?.videos) {
        if (searchVideos?.length > 0) {
          searchVideosFlag = true;
        }
        searchVideos = response.data?.videos;
        setVideosData(searchVideos);
      } else {
        searchVideosFlag = false;

        setVideosState(true);
      }
    } else if (text == '') {
      setCurrentPage(0);

      setVideosState(false);
      searchVideos = [];
      searchVideosFlag = false;
      getCommunityVideoResponse();
    }
  };

  useEffect(() => {
    if (isFocused) {
      getCommunityVideoResponse();
    }
  }, [isFocused]);

  const bookmarkVideo = async item => {
    const response = await groupApi();
    if (response.data.groups?.length == 0) {
      setManualShouldAddedToastModal(true);
      setTimeout(() => {
        setManualShouldAddedToastModal(false);
      }, 1000);
    }
    else{
      setVideoBookMarkData(item);
      setBottomSheetModal(true);
    }
    
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{marginTop: 10, padding: 10, backgroundColor: Colors.darkGrey}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: Colors.white,
            borderRadius: 10,
          }}>
          <SearchIcon
            name={'search'}
            size={22}
            color={Colors.searchIconColor}
            style={{left: 20}}
          />
          <TextInput
            placeholder="Search By Name"
            placeholderTextColor={Colors.mediumGrey}
            style={{
              width: '90%',
              left: 15,
              fontSize: 17,
              color: Colors.black,
              fontWeight: '400',
            }}
            onChangeText={text => searchVideo(text)}
          />
        </View>
      </View>

      {videoState ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <FastImage
            style={{width: '25%', height: '25%'}}
            source={require('../../assets/images/empty.gif')}
          />
          <Text style={{color: Colors.black}}>No Record Found</Text>
        </View>
      ) : (
        <FlatList
        
          data={videosData}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View>
                <View>
                  <Pressable
                    style={{top: 5, marginHorizontal: '2%', borderRadius: 10}}
                    onPress={() => navigateToVideoDetails(item)}>
                    <ImageBackground
                      source={{uri: item?.video_thumbnail}}
                      borderRadius={15}
                      style={{
                        height: 200,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity
                        style={{
                          padding: 10,
                        }}
                        onPress={() => bookmarkVideo(item)}>
                        {item?.group_count ? (
                          <Image
                            source={require('../../assets/images/book_mark.png')}
                            style={{width: 25, height: 25}}
                          />
                        ) : (
                          <Image
                            source={require('../../assets/images/book_unmark.png')}
                            style={{width: 25, height: 25}}
                          />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          padding: 10,
                        }}
                        onPress={() => {
                          handleToggleFavorite(item);
                        }}>
                        {/* <Image source={likedVideoIds.includes(item?.video_id) ? require('../../assets/images/fav_mark_video.png') : require('../../assets/images/fav_unmark.png')} style={{width:25, height:25}}/> */}
                        {item?.status_fav === 1 ? (
                          <Image
                            source={require('../../assets/images/fav_mark_video.png')}
                            style={{width: 25, height: 25}}
                          />
                        ) : (
                          <Image
                            source={require('../../assets/images/fav_unmark.png')}
                            style={{width: 25, height: 25}}
                          />
                        )}
                      </TouchableOpacity>
                    </ImageBackground>
                  </Pressable>
                  <ToastModal
                    visible={addlikedVideo}
                    label={'Video marked as favorite successfully'}
                  />
                  <ToastModal
                    visible={removelikedVideo}
                    label={'Video is removed from favorite'}
                  />
                </View>

                <View
                  style={{
                    marginTop: 10,
                    marginBottom: 2,
                    marginHorizontal: '2%',
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontWeight: '500',
                      fontSize: 14,
                    }}>
                    {item.video_name}
                  </Text>
                  <Text style={{color: Colors.black}}>
                    Created on {formatDate(item?.dt_created)} by{' '}
                    {item.user_name}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      )}

      {isFocused && <LoaderModal visible={loaderState} transparent={true} />}
      <ToastModal visible={toastModal} label={'User login successfully'} />
      {isFocused ? (
        <CustomBottomSheet
          bottomSheeetModal={bottomSheeetModal}
          setBottomSheetModal={setBottomSheetModal}
          videoBookmarkData={videoBookmarkData}
          allVideosData={videosData}
          setVideosData={setVideosData}
          setVideoAddedInManualToastModal={setVideoAddedInManualToastModal}
          videosBookmark={'videosBookmark'}
        />
      ) : null}
      <ToastModal
        visible={videoAddedInManualToastModal}
        label={'Videos added to manual successfully'}
      />

      <ToastModal
        visible={manualShouldAddedToastModal}
        label={'Please add a manual if you want to bookmark this video'}
      />
    </View>
  );
};

export default Videos;

const styles = StyleSheet.create({});
