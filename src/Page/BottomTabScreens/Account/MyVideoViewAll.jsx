import {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { addFavorite } from '../../constants/addfav';
//import { getMyVideos } from '../../constants/API_Helper';
import {AddFavourite} from '../../TopTabScreens/AddFavourite';
import {RemoveFavourite} from '../../TopTabScreens/RemoveFavourite';
import ToastModal from '../../../Components/ToastModal';
import axios from 'axios';
import {categoryWiseVideApi} from '../../../api/axiosApi';
//import Loader from '../componants/Loader';js
import {format} from 'date-fns';
import Dialog from 'react-native-dialog';
import FastImage from 'react-native-fast-image';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CustomBottomSheet from '../../../Components/CustomBottomSheet';
import Colors from '../../../utils/Colors';
const MyVideoViewAll = ({route}) => {
  const [subcategories, setsubCategories] = useState([]);
  const {category_id, category_name} = route.params;
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [thumbnails, setThumbnails] = useState([]);
  const [videos, setVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [addlikedVideo, setAddlikedVideo] = useState(false);
  const [removelikedVideo, setRemovelikedVideo] = useState(false);
  const [toastModal, setToastModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const isFocused = useIsFocused();
  const [bottomSheeetModal, setBottomSheetModal] = useState(false);
  const [videoBookmarkData, setVideoBookMarkData] = useState();
  const [videoAddedInManualToastModal, setVideoAddedInManualToastModal] =
    useState(false);
  useEffect(() => {
    setIsLoading(true);

    getsubcategories(category_id);

    handleSubcategoryPress('all');

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const getsubcategories = async id => {
    let response;
    let token = await AsyncStorage.getItem('sessiontoken');
    const url = 'http://3.21.214.37/admin/api/V1/video/getsubcategories';
    let data = JSON.stringify({
      category_id: id,
    });

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    try {
      response = await axios.post(url, data, {
        maxBodyLength: 'Infinity',
        headers,
      });
      const allSubcategories = response.data?.subcategories || [];
      setsubCategories([
        {subcategory_id: 'all', subcategory_name: 'All'},
        ...allSubcategories,
      ]);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fetchFavoriteVideos = async category_id => {
    console.log('category_id====>', category_id);
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
        {headers},
      );

      // let myVideos = response.data.videos;
      // console.log("Video =>",response.data?.videos[0]?.video_details)
      let getThumbnail = response.data?.videos[0]?.video_details;
      // console.log("getThumbnail", getThumbnail);
      return getThumbnail;
      //setFavoriteVideos(response.data.videos);
      // setIsLoading(false);
    } catch (error) {
      // setIsLoading(false);
    }
  };

  const handleSubcategoryPress = async subcategory_id => {
    setIsLoading(true);
    setSelectedSubcategory(subcategory_id);
    if (subcategory_id === 'all') {
      const thumbnails = await fetchFavoriteVideos(category_id);
      console.log('Favorite ===>>>> ', thumbnails);
      setThumbnails(thumbnails || []);
      console.log('--', response.data?.videos[0]?.video_details || []);

      console.log(response.data?.videos?.video_details || []);
    } else {
      const thumbnails = await fetchFavoriteVideos(category_id);
      const filteredThumbnails =
        thumbnails.filter(video => video.subcategory_id === subcategory_id) ||
        [];
      setThumbnails(filteredThumbnails);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  const renderSubcategoryItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.subcategoryButton,
        selectedSubcategory === item.subcategory_id && {
          backgroundColor: '#cce4f1',
        },
      ]}
      onPress={() => handleSubcategoryPress(item.subcategory_id)}>
      <Text style={styles.subcategoryText}>{item.subcategory_name}</Text>
    </TouchableOpacity>
  );
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
        setThumbnails(prevVideos =>
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
        setThumbnails(prevVideos =>
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

  const handleDelete = item => {
    // setActivityLoder(true);
    setTimeout(() => {
      //  setActivityLoder(false)
    }, 700);
    setTimeout(() => {
      showDialog(item);
    }, 600);
  };
  const showDialog = item => {
    setVisible(true);
    //setDeleteItem(item);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const deleteVideo = async item => {
    const token = await AsyncStorage.getItem('sessiontoken');
    console.log('inside delete Video');
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      };
      const videoId = item.video_id;
      console.log('VideoId ====>>', videoId);
      const response = await axios.get(
        `http://3.21.214.37/admin/api/V3/video/deleteVideo/${videoId}`,
        {headers},
      );
      console.log(response.data);
      setVisible(false);
      fetchFavoriteVideos();
      // setToastModal(true);
      setTimeout(() => {
        //  setToastModal(false);
      }, 1500);
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const renderThumbnailItem = ({item}) => {
    const bookmarkVideo = item => {
      // console.log(item);
      setVideoBookMarkData(item);
      setBottomSheetModal(true);
    };

    return (
      <View style={styles.thumbnailContainer}>
        <TouchableOpacity onPress={() => navigateToVideoDetails(item)}>
          <Image
            source={{uri: item.video_thumbnail}}
            style={styles.thumbnail}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => bookmarkVideo(item)}
          style={styles.thumbnailIconContainer}>
          {item?.group_count ? (
            <Image
              source={require('../../../assets/images/book_mark.png')}
              style={styles.thumbnailIcon}
            />
          ) : (
            <Image
              source={require('../../../assets/images/book_unmark.png')}
              style={styles.thumbnailIcon}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.thumbnailIconContainer, styles.heartIconContainer]}
          onPress={() => {
            handleToggleFavorite(item);
          }}>
          {/* <Image source={likedVideoIds.includes(item?.video_id) ? require('../../assets/images/fav_mark_video.png') : require('../../assets/images/fav_unmark.png')} style={{width:25, height:25}}/> */}
          {item?.status_fav === 1 ? (
            <Image
              source={require('../../../assets/images/fav_mark_video.png')}
              style={{width: 25, height: 25, top:10}}
            />
          ) : (
            <Image
              source={require('../../../assets/images/fav_unmark.png')}
              style={{width: 25, height: 25, top:10}}
            />
          )}
        </TouchableOpacity>
        {item?.video_public_yn !== 'Y' && (
          <>
            <TouchableOpacity
              onPress={handleDelete}
              style={{top: -35, left: 8}}>
              <Image
                source={require('../../../assets/images/delete.png')}
                style={{width: 25, height: 25}}
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
                right: -0.2,
                top: 99,
                marginBottom: '10%',
              }}
            />
          </>
        )}

        <ToastModal
          visible={addlikedVideo}
          label={'Video marked as favorite successfully'}
        />
        <ToastModal
          visible={removelikedVideo}
          label={'Video is removed from favorite'}
        />
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.videoName}>
            {item.video_name}
          </Text>
          <Text style={styles.dateuser}>
            <Text style={styles.user}>
              {item.user_name.length > 12
                ? item.user_name.substring(0, 12) + '...'
                : item.user_name}
            </Text>{' '}
            <Text style={styles.date}>
              {' '}
              {format(new Date(parseInt(item.dt_created)), 'MM-dd-yyyy')}
            </Text>
          </Text>
        </View>
        <Dialog.Container visible={visible}>
          <Dialog.Description>
            <Text style={{fontSize: 16, color: 'black'}}>
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
            onPress={() => deleteVideo(item)}
          />
        </Dialog.Container>
      </View>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: category_name || 'Default Title',
      headerTitleStyle: {
        color: '#007ac3',
      },
      headerTitleAlign: 'center',
    });
  }, [navigation, category_name]);

  return (
    <View style={styles.container}>
      <FlatList
        data={subcategories}
        keyExtractor={item => item.subcategory_id.toString()}
        renderItem={renderSubcategoryItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.subcategoryList}
      />
      {thumbnails?.length == 0 ? <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height:responsiveScreenHeight(80),
            marginBottom:responsiveScreenHeight(70)
            // backgroundColor: 'white',
          }}>
          <FastImage
            style={{width: '20%', height: '20%', bottom: '5%'}}
            source={require('../../../assets/images/empty.gif')}
          />
          <Text style={{color: Colors.black, bottom:'5%'}}>No Record Found</Text>
        </View> : <FlatList
        data={thumbnails}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => renderThumbnailItem(item)}
        numColumns={2}
      />}
      

      {isFocused ? (
        <CustomBottomSheet
          bottomSheeetModal={bottomSheeetModal}
          setBottomSheetModal={setBottomSheetModal}
          videoBookmarkData={videoBookmarkData}
          setVideosData={setThumbnails}
          setVideoAddedInManualToastModal={setVideoAddedInManualToastModal}
          myVideosViewAllBookmark={'myVideosViewAllBookmark'}
        />
      ) : null}

      <ToastModal
        visible={videoAddedInManualToastModal}
        label={'Videos added to manual successfully'}
      />
      {/* {isLoading && <Loader />} */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex:1,
    backgroundColor:'white',
    padding: 2,
  },
  subcategoryList: {
    marginTop: 10,
  },
  subcategoryButton: {
    backgroundColor: '#e4ecef',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  subcategoryText: {
    color: 'black',
  },
  thumbnailContainer: {
    flexDirection: 'column',
    marginBottom: responsiveWidth(1),
    width: responsiveWidth(45),
    marginLeft: 10,
    marginTop: responsiveWidth(2),
  },
  thumbnail: {
    width: '100%',
    height: responsiveHeight(20),
    borderRadius: 10,
    marginBottom: 5,
  },
  textContainer: {
    flexDirection: 'column',
  },
  videoName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  user: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  dateuser: {
    color: 'black',
    fontSize: responsiveFontSize(1.7),
  },
  thumbnailIconContainer: {
    position: 'absolute',
    zIndex: 1,
  },
  thumbnailIcon: {
    height: 20,
    width: 20,
    //  tintColor: '#cb2675',
    marginTop: responsiveWidth(3),
    marginLeft: responsiveWidth(3),
  },
  heartIconContainer: {
    right: responsiveWidth(1),
    marginRight: responsiveWidth(2),
  },
});

export default MyVideoViewAll;
