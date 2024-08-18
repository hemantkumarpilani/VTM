import React, {useState, useEffect, memo} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {RemoveFavourite} from '../TopTabScreens/RemoveFavourite';
import LoaderModal from '../../Components/LoaderModal';
import DoubleRightIcon from 'react-native-vector-icons/FontAwesome5';
import ToastModal from '../../Components/ToastModal';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CustomBottomSheet from '../../Components/CustomBottomSheet';

const VideoItem = memo(
  ({item, isFavorited, toggleFavorite, favoriteVideos, setFavoriteVideos}) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused();

    const navigateToVideoDetails = () => {
      navigation.navigate('VideoDetails', {item});
    };

    const handleRemove = () => {
      setModalVisible(true);
    };

    const closeModal = () => {
      setModalVisible(false);
    };

    const bookmarkVideo = item => {
      // console.log(item)
      setVideoBookMarkData(item);
      setBottomSheetModal(true);
    };

    const [bottomSheeetModal, setBottomSheetModal] = useState(false);
    const [videoBookmarkData, setVideoBookMarkData] = useState();
    const [videoAddedInManualToastModal, setVideoAddedInManualToastModal] =
      useState(false);

    return (
      <View>
        <TouchableOpacity onPress={navigateToVideoDetails}>
          <Image
            source={{uri: item?.video_thumbnail}}
            style={styles.thumbnailicon}
          />
        </TouchableOpacity>
        <View style={styles.subcontainer}>
          <TouchableOpacity onPress={() => bookmarkVideo(item)}>
            {item?.group_count ? (
              <Image
                source={require('../../assets/images/book_mark.png')}
                style={styles.staricon}
              />
            ) : (
              <Image
                source={require('../../assets/images/book_unmark.png')}
                style={styles.staricon}
              />
            )}
          </TouchableOpacity>
          {item?.video_public_yn !== 'N' ? 
       
         null :

          <Image
            source={require('../../assets/images/private_video.png')}
            style={{
              width: 40,
              height: 40,
              position: 'absolute',
              right: -0.2,
              top: 120,
              marginBottom: '10%',
              borderRadius:3,
            }}
          />
      
      }
          <TouchableOpacity
            style={styles.thumbnailIconContainer}
            onPress={handleRemove}>
            <Image
              source={
                isFavorited
                  ? require('../../assets/images/fav_unmark.png')
                  : require('../../assets/images/fav_mark_video.png')
              }
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.thumbnailtext}>{item?.video_name}</Text>

        {isFocused ? (
          <CustomBottomSheet
            bottomSheeetModal={bottomSheeetModal}
            setBottomSheetModal={setBottomSheetModal}
            videoBookmarkData={videoBookmarkData}
            allVideosData={favoriteVideos}
            setVideosData={setFavoriteVideos}
            setVideoAddedInManualToastModal={setVideoAddedInManualToastModal}
            favouriteVideoBookmark={'favouriteVideoBookmark'}
          />
        ) : null}

        <ToastModal
          visible={videoAddedInManualToastModal}
          label={'Videos added to manual successfully'}
        />

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>Remove</Text>
              </View>
              <View style={styles.modalBody}>
                <Text style={styles.modalBodyText}>
                  Are you sure you want to remove video from your favorite
                  list?
                </Text>
              </View>
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    toggleFavorite(item.video_id);
                    closeModal();
                  }}>
                  <Text style={styles.modalButtonText}>Ok</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  },
);

const Favourites = ({route, navigation}) => {
  const isFocused = useIsFocused();
  const [favoriteVideos, setFavoriteVideos] = useState([]);
  const [favoritedVideoIds, setFavoritedVideoIds] = useState([]);
  const [loaderState, setLoaderState] = useState(false);
  const [addlikedVideo, setAddlikedVideo] = useState(false);
  const [removelikedVideo, setRemovelikedVideo] = useState(false);
  const [favouriteVideoExist, setFavouriteVideoExist] = useState(false)

  useEffect(() => {
    if (isFocused) {
      fetchFavoriteVideos();
    }
  }, [isFocused]);
  // useEffect(() => {
  //   if (isFocused) {
  //     setLoaderState(true);
  //     fetchFavoriteVideos();
  //     setTimeout(() => {
  //       setLoaderState(false);
  //     }, 1000);
  //   }
  // }, [isFocused]);

  const fetchFavoriteVideos = async () => {
    setLoaderState(true);
    try {
      let token = await AsyncStorage.getItem('sessiontoken');

      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      };

      const data = {
        tag_id: 'ALL',
        page: 0,
        category_id: '',
        subcategory_id: '',
      };

      const response = await axios.post(
        `http://3.21.214.37/admin/api/V1/video/getMyFavouriteVideos`,
        data,
        {headers},
      );
      //  console.log(response)
      const videos = response.data.videos.videos;
      if(videos?.length >  0){
        console.log('inside if')
        setFavouriteVideoExist(false)
        setFavoriteVideos(videos);
        setLoaderState(false);

      }
      else{
        setFavouriteVideoExist(true)
        setLoaderState(false);
      }
      
      const favoritedIds = videos.map(video => video?.video_id);
      setFavoritedVideoIds(favoritedIds);
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewAll = (category_id, category_name) => {
    navigation.navigate('FavoriteViewAll', {category_id, category_name});
    // console.log(category_id);
  };

  const toggleFavorite = async videoId => {
    try {
      await RemoveFavourite(videoId);
      // setModalVisible(false);
      setRemovelikedVideo(true);
      setTimeout(() => {
        setRemovelikedVideo(false);
      }, 1000);

      setLoaderState(true);
      fetchFavoriteVideos();
      setTimeout(() => {
        setLoaderState(false);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  const videoDisplay = item => {
    return (
      <FlatList
        data={item?.video_details.slice(0, 10)}
        horizontal
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={30}
        initialNumToRender={5}
        ItemSeparatorComponent={() => <View style={{paddingHorizontal: 5}} />}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <VideoItem
            item={item}
            favoriteVideos={favoriteVideos}
            setFavoriteVideos={setFavoriteVideos}
            isFavorited={favoritedVideoIds.includes(item?.video_id)}
            toggleFavorite={() => toggleFavorite(item?.video_id)}
          />
        )}
        keyExtractor={(item, index) => `${index}`}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      {favouriteVideoExist ? (
        <View style={styles.gifContainer}>
          <View>
            <FastImage
              style={{width: 160, height: 160}}
              source={require('../../assets/images/empty.gif')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <Text style={styles.recordText}>
            Start viewing videos and adding favourites!
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={favoriteVideos}
            renderItem={({item}) => (
              <View style={{marginBottom: 10}}>
                <View style={styles.subcontainer2}>
                  <Text style={styles.headtext}>{item?.category_name}</Text>
                  {item.video_details.length > 2 && (
                    <TouchableOpacity
                    style={{flexDirection: 'row', width: '20%'}}
                      onPress={() => handleViewAll(item.category_id, item.category_name)}
                    >
                      <Text style={styles.Text}>View All</Text>
                      {/* <Image source={require('../../assets/images/viewalll.png')} style={styles.ViewAll} resizeMode='contain' /> */}
                      <DoubleRightIcon
                      name={'angle-double-right'}
                      size={16}
                      style={{alignSelf: 'center', left:3}}
                    />
                    </TouchableOpacity>
                  )}
                </View>
                {videoDisplay(item)}
              </View>
            )}
            keyExtractor={(item, index) => `${index}`}
          />
        </>
      )}
      {isFocused && <LoaderModal visible={loaderState} transparent={true} />}
      <ToastModal
        visible={addlikedVideo}
        label={'Video marked as favorite successfully'}
      />
      <ToastModal
        visible={removelikedVideo}
        label={'Video is removed from favorite'}
      />
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  thumbnailicon: {
    width: 195,
    height: 195,
    left: 6,
    borderRadius: 10,
  },
  subcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: 200,
    padding: 10,
  },
  staricon: {
    height: 20,
    width: 20,
    padding: 5,
  },
  thumbnailtext: {
    left: 6,
    padding: 3,
    backgroundColor: 'lightgray',
    color: 'black',
    fontSize: 15,
    fontWeight: '400',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    opacity: 0.8,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    paddingBottom: '5%',
    elevation: 10,
    width: '84%',
    elevation: 10,
    borderRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5%',
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  modalBody: {
    padding: '5%',
    color: '#ffffff',
  },
  modalBodyText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
    fontWeight: '400',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    backgroundColor: '#007ac3',
    padding: 8,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 2,
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
  ViewAll: {
    height: responsiveHeight(5),
    width: responsiveWidth(5),
    tintColor: 'gray',
    // marginHorizontal: responsiveWidth(2),
    //marginBottom:-20
    marginTop: -28,
    right: -35,
  },
  Text: {
    color: 'gray',
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
  },
});
