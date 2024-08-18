import React, { useState, useEffect, memo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarIcon from 'react-native-vector-icons/AntDesign';
import HeartIcon from 'react-native-vector-icons/Entypo';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Colors from '../../../utils/Colors';
import LoaderModal from '../../../Components/LoaderModal';
import CustomHeader from '../../../Components/CustomHeader';
import SearchIcon from 'react-native-vector-icons/Feather';
import Button from '../../../Components/Button';
import { addVideosInGroup } from '../../../api/axiosApi';
import ToastModal from '../../../Components/ToastModal';
import { AddFavourite } from '../../TopTabScreens/AddFavourite';
import { RemoveFavourite } from '../../TopTabScreens/RemoveFavourite';
import Dialog from 'react-native-dialog';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import DoubleRightIcon from 'react-native-vector-icons/FontAwesome5';

import FastImage from 'react-native-fast-image';
import CustomBottomSheet from '../../../Components/CustomBottomSheet';

const VideoItem = memo(
  ({ item, favoriteVideos, setFavoriteVideos, fetchFavoriteVideos }) => {
    const navigation = useNavigation();
    const { width } = useWindowDimensions();
    const [addlikedVideo, setAddlikedVideo] = useState(false);
    const [removelikedVideo, setRemovelikedVideo] = useState(false);
    const [visible, setVisible] = useState(false);
    const [likedVideoIds, setLikedVideoIds] = useState([]);
    const [toastModal, setToastModal] = useState(false);
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(false);
    const [bottomSheeetModal, setBottomSheetModal] = useState(false);
    const [videoBookmarkData, setVideoBookMarkData] = useState();
    const [videoAddedInManualToastModal, setVideoAddedInManualToastModal] =
      useState(false);
   
    const navigateToVideoDetails = item => {
      navigation.navigate('VideoDetails', { item });
    };

    const handleDelete = () => {

      setTimeout(() => {

      }, 700);
      setTimeout(() => {
        showDialog();
      }, 600);
    };
    const showDialog = () => {
      setVisible(true);
    };
    const handleCancel = () => {
      setVisible(false);
    };

    const deleteVideo = async () => {
      const token = await AsyncStorage.getItem('sessiontoken');

      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        };
        const videoId = item.video_id;
        console.log('VideoId =>>', videoId);
        const response = await axios.get(
          `http://3.21.214.37/admin/api/V3/video/deleteVideo/${videoId}`,
          { headers },
        );
        console.log(response.data);
        setVisible(false);
        fetchFavoriteVideos();
        setToastModal(true);
        setTimeout(() => {
          setToastModal(false);
        }, 1500);
      } catch (error) {
        console.error('Error deleting video:', error);
      }
    };

    const handleToggleFavorite = async item => {
      console.log('videossss', favoriteVideos)
      try {
        if (item?.status_fav === 1) {
          await RemoveFavourite(item?.video_id);
          setRemovelikedVideo(true);
          setTimeout(() => {
            setRemovelikedVideo(false);
          }, 1000);
          setFavoriteVideos((previous) => previous?.map(category => ({ ...category, video_details: category?.video_details?.map(video=>{
            if(video?.video_id == item?.video_id){
                console.log('condition satisfied');
                  return { ...video, status_fav: video.status_fav =0  };
            }
            else {
              return video;
            }
          }) })))

          
          console.log("favoriteVideos", favoriteVideos)
        } else {
          await AddFavourite(item?.video_id);
          setAddlikedVideo(true);

          setTimeout(() => {
            setAddlikedVideo(false);
          }, 1000);
          setFavoriteVideos((previous) => previous?.map(category => ({ ...category, video_details: category?.video_details?.map(video=>{
            if(video?.video_id == item?.video_id){
                console.log('condition satisfied');
                  return { ...video, status_fav: video.status_fav =1  };
            }
            else {
              return video;
            }
          }) })))
          console.log("favoriteVideos", favoriteVideos)
        }
        fetchFavoriteVideos();
      } catch (error) {
        console.error(error);
      }
    };

    const bookmarkVideo = item => {
      // console.log(item)
      setVideoBookMarkData(item);
      setBottomSheetModal(true);
    };

    return (
      <View>
        <TouchableOpacity onPress={() => navigateToVideoDetails(item)}>
          <Image
            source={{ uri: item.video_thumbnail }}
            style={styles.thumbnailicon}
          />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => bookmarkVideo(item)}>
            {item?.group_count ? (
              <Image
                source={require('../../../assets/images/book_mark.png')}
                style={styles.imgTag}
              />
            ) : (
              <Image
                source={require('../../../assets/images/book_unmark.png')}
                style={styles.imgTag}
              />
            )}
          </TouchableOpacity>



          <TouchableOpacity
            style={{ right: 10, position: 'absolute', top: 10 }}
            onPress={() => {
              handleToggleFavorite(item);
            }}>
            {console.log('heart', item?.status_fav)}
            {item?.status_fav === 1 ? (
              <Image
                source={require('../../../assets/images/fav_mark_video.png')}
                style={{ width: 25, height: 25 }}
              />
            ) : (
              <Image
                source={require('../../../assets/images/fav_unmark.png')}
                style={{ width: 25, height: 25 }}
              />
            )}
          </TouchableOpacity>

          {isFocused ? (
            <CustomBottomSheet
              bottomSheeetModal={bottomSheeetModal}
              setBottomSheetModal={setBottomSheetModal}
              videoBookmarkData={videoBookmarkData}
              allVideosData={favoriteVideos}
              setVideosData={setFavoriteVideos}
              setVideoAddedInManualToastModal={setVideoAddedInManualToastModal}
              myVideosBookmark={'myVideosBookmark'}
            />
          ) : null}

          <ToastModal
            visible={videoAddedInManualToastModal}
            label={'Videos added to manual successfully'}
          />

          <ToastModal
            visible={addlikedVideo}
            label={'Video marked as favorite successfully'}
          />
          <ToastModal
            visible={removelikedVideo}
            label={'Video is removed from favorite'}
          />


          {item?.video_public_yn !== 'Y' && (
            <>
              <TouchableOpacity
                onPress={handleDelete}
                style={{ top: 110, right: 145 }}>
                <Image
                  source={require('../../../assets/images/delete.png')}
                  style={styles.imgTag}
                />
              </TouchableOpacity>
              <ToastModal
                visible={toastModal}
                label={'Video has deleted successfully'}
              />
              <Image
                source={require('../../../assets/images/private_video.png')}
                style={{
                  width: 40,
                  height: 40,
                  position: 'absolute',
                  right: 8,
                  top: 100,
                  marginBottom: '10%',
                }}
              />
            </>
          )}

        </View>

        <Text style={styles.thumbnailtext}>{item.video_name}</Text>

        <Dialog.Container visible={visible}>
          <Dialog.Description>
            <Text style={{ fontSize: 16, color: 'black' }}>
              Are you sure want to delete this video?
            </Text>
          </Dialog.Description>
          <Dialog.Button
            label="NO"
            style={styles.label}
            onPress={handleCancel}
          />
          <Dialog.Button
            label="YES"
            style={styles.label}
            onPress={deleteVideo}
          />
        </Dialog.Container>
        {/* <LoaderModal visible={isLoading} transparent={true} /> */}
      </View>
    );
  },
);

let myVideos;
const Myvideos = ({ route, navigation }) => {
  const arrowimg = require('../../../assets/images/back.png');
  const isFocused = useIsFocused();
  const [favoriteVideos, setFavoriteVideos] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [visibleImageState, setVisibleImageState] = useState([]);

  const navigateToVideoDetails = item => {
    navigation.navigate('VideoDetails', { item });
  };



  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      fetchFavoriteVideos();
    }
  }, [isFocused]);

  const fetchFavoriteVideos = async category_id => {
    try {
      let token = await AsyncStorage.getItem('sessiontoken');
      const headers = {
        'Content-Type': 'application/json',
        //  Authorization: 'Bearer ' + token,
        Authorization: 'Bearer ' + token,
      };

      let data = JSON.stringify({
        page: 0,
        category_id: category_id,
        subcategory_id: '',
      });

      const response = await axios.post(
        'http://3.21.214.37/admin/api/V2/video/getMyVideos',
        data,
        { headers },
      );

      myVideos = response.data.videos;
      // console.log(myVideos)

      setFavoriteVideos(response.data.videos);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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

  const toggleImage = item => {
    if (visibleImageState.length <= 0) {
      setVisibleImageState([...visibleImageState, item]);
    } else if (visibleImageState.includes(item)) {
      setVisibleImageState(previous => {
        return previous.filter(value => value != item);
      });
    } else {
      setVisibleImageState([...visibleImageState, item]);
    }
  };

  const handleDoneButton = async () => {
    let arr = [];
    visibleImageState.map(item => {
      arr.push({
        video_id: item.video_id,
        group_id: route?.params?.addVideos?.groupId,
      });
    });

    const response = await addVideosInGroup(arr);
    if (response?.status == 200) {
      navigation.navigate('MyManuals', { videosAdded: 'videosAdded' });
    }
  };

  const handleViewAll = (category_id, category_name) => {
    navigation.navigate('MyVideoViewAll', { category_id, category_name });
    // console.log(category_id);
  };

  const videoDisplay = (item, favoriteVideos, setFavoriteVideos) => {
    return (
      <FlatList
        data={item?.video_details.slice(0, 10)}
        //data={favoriteVideos}
        horizontal
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={30}
        initialNumToRender={5}
        ItemSeparatorComponent={() => <View style={{ paddingHorizontal: 5 }} />}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <VideoItem
            item={item}
            favoriteVideos={favoriteVideos}
            setFavoriteVideos={setFavoriteVideos}
            fetchFavoriteVideos={fetchFavoriteVideos}
          />
        )}
        keyExtractor={(item, index) => `${index}`}
      />
    );
  };

  const searchVideo = text => {
    if (text != '') {
      const filteredData = myVideos?.map(category => ({
        ...category,
        video_details: category.video_details.filter(video =>
          video.video_name.toLowerCase().includes(text.toLowerCase()),
        ),
      }));
      setFavoriteVideos(filteredData);
    } else {
      setFavoriteVideos(myVideos);
    }
  };

  if (favoriteVideos == undefined) {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <CustomHeader headerTitle={'My Videos'} require={arrowimg} />
        <View style={styles.gifContainer}>
          <View>
            <FastImage
              style={{ width: 160, height: 160 }}
              source={require('../../../assets/images/empty.gif')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <Text style={styles.recordText}>
            No record Found
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader headerTitle={'My Videos'} require={arrowimg} />
      {route?.params?.addVideos ? (
        <View style={{ flex: 1 }}>
          <View
            style={{
              marginTop: 10,
              padding: 10,
              backgroundColor: Colors.darkGrey,
            }}>
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
                style={{ left: 20 }}
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
          <FlatList
            data={favoriteVideos}
            renderItem={({ item, index }) => {
              return (
                <FlatList
                  data={item?.video_details}
                  renderItem={({ item }) => {
                    return (
                      <View style={{ flex: 1 }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginHorizontal: '2%',
                            gap: 10,
                            marginTop: '3%',
                          }}>
                          <TouchableOpacity
                            onPress={() => navigateToVideoDetails(item)}>
                            <Image
                              source={{ uri: item?.video_thumbnail }}
                              style={{ width: 120, height: 100, borderRadius: 5 }}
                            />
                            <Image
                              source={require('../../../assets/images/play.png')}
                              style={{
                                width: 30,
                                height: 30,
                                position: 'absolute',
                                alignSelf: 'center',
                                top: '40%',
                              }}
                            />
                            {item?.video_public_yn == 'Y' ? null : (
                              <Image
                                source={require('../../../assets/images/private_video.png')}
                                style={{
                                  width: 30,
                                  height: 30,
                                  alignSelf: 'center',
                                  left: '75%',
                                  top: '70%',
                                  position: 'absolute',

                                  borderRadius: 5,
                                }}
                              />
                            )}
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{ width: '67%' }}
                            onPress={() => toggleImage(item)}>
                            <Text
                              style={{
                                width: 200,
                                color: Colors.black,
                                fontWeight: '400',
                                fontSize: 17,
                              }}>
                              {item?.video_name}
                            </Text>
                            <Text style={{ width: 200, color: Colors.black }}>
                              {item?.video_description}
                            </Text>
                            <Text
                              style={{
                                width: 200,
                                marginTop: '5%',
                                fontSize: 14,
                              }}>
                              {formatDate(item?.dt_created)}
                            </Text>
                            {visibleImageState.includes(item) && (
                              <Image
                                source={require('../../../assets/images/yes.png')}
                                style={{
                                  width: 40,
                                  height: 40,
                                  position: 'absolute',
                                  left: 160,
                                  top: 30,
                                }}
                              />
                            )}
                          </TouchableOpacity>
                        </View>
                        <View></View>
                      </View>
                    );
                  }}
                />
              );
            }}
          />
          <View style={{ marginVertical: '3%', marginHorizontal: '2%' }}>
            <Button label={'DONE'} onPress={() => handleDoneButton()} />
          </View>
        </View>
      ) : (
        <>
          <FlatList
            data={favoriteVideos}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 10 }}>
                <View style={styles.subcontainer2}>
                  <Text style={styles.headtext}>{item.category_name}</Text>


                  {item.video_details.length > 2 && (
                    <TouchableOpacity style={{ flexDirection: 'row', width: '20%' }}
                      onPress={() => handleViewAll(item.category_id, item.category_name)}>
                      <Text style={styles.Text}>View All</Text>

                      <DoubleRightIcon
                        name={'angle-double-right'}
                        size={16}
                        style={{ alignSelf: 'center' }}
                      />


                    </TouchableOpacity>
                  )}


                </View>
                {videoDisplay(item, favoriteVideos, setFavoriteVideos)}
              </View>
            )}
            keyExtractor={(item, index) => `${index}`}
          />
        </>
      )}
      <LoaderModal visible={isLoading} transparent={true} />
    </View>
  );
};

export default Myvideos;

const styles = StyleSheet.create({
  thumbnailicon: {
    width: 175,
    height: 175,
    borderRadius: 10,
    marginHorizontal: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    padding: 10,
  },
  gifContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  recordText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  icon: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 20,
    top: 5,
  },
  thumbnailtext: {
    padding: 3,
    backgroundColor: Colors.lightgrey,
    color: Colors.black,
    fontSize: 15,
    fontWeight: '400',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    opacity: 0.8,
    left: 8,
  },
  subcontainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  headtext: {
    color: '#0579bd',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  imgTag: {
    width: 25,
    height: 25
  },
  Text: {
    color: 'gray',
    fontSize: responsiveFontSize(2),
    fontWeight: '700',

  },
  ViewAll: {
    //   height: responsiveHeight(5),
    //   width: responsiveWidth(5),
    //   tintColor: 'gray',
    //  // marginHorizontal: responsiveWidth(2),
    //   //marginBottom:-20
    //   marginTop:-28,
    //   right:-35
    fontSize: 16,
    color: Colors.viewAllText,
  },
});
