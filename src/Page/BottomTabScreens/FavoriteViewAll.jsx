

import { useState,useEffect } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View,Modal } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderModal from '../../Components/LoaderModal';
import { RemoveFavourite } from '../TopTabScreens/RemoveFavourite';
import axios from 'axios';

import { format } from 'date-fns';
import Dialog from 'react-native-dialog';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../utils/Colors';
import ToastModal from '../../Components/ToastModal';
import CustomBottomSheet from '../../Components/CustomBottomSheet';
const FavoriteViewAll =  ({ route }) => {
  const [subcategories, setsubCategories] = useState([]);
 // const { category_id , category_name } = route.params;
  //console.log("route.params===> ",route.params)
  const category_id=route.params.category_id;
  const category_name=route.params.category_name;

  // console.log("category_id====>",category_id)
  // console.log("category_name====>",category_name)
  const bookmarkVideo = item => {
    // console.log(item)
    setVideoBookMarkData(item);
    setBottomSheetModal(true);
  };

 const navigateToVideoDetails = (item)=>{
   navigation.navigate('VideoDetails', {item : item})
 }

  const [bottomSheeetModal, setBottomSheetModal] = useState(false);
  const [videoBookmarkData, setVideoBookMarkData] = useState();
  const [videoAddedInManualToastModal, setVideoAddedInManualToastModal] =
    useState(false);

  const isFocused = useIsFocused();

  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [thumbnails, setThumbnails] = useState([]);
  const [videos, setVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [addlikedVideo,setAddlikedVideo]=useState(false);
  const [removelikedVideo,setRemovelikedVideo]=useState(false);
  const [toastModal, setToastModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalVisible,setModalVisible]=useState(false);
  const [loaderState, setLoaderState] = useState(false);
  
  
  useEffect(() => {
    setLoaderState(true)
    setIsLoading(true);
   
    getsubcategories(category_id);

   
    handleSubcategoryPress('all');
  
    setTimeout(() => {
      setLoaderState(false)
  }, 2000);
  }, []);
  
  const handleRemove=()=>{
    setModalVisible(true);
  };

  const closeModal=()=>{
    setModalVisible(false);
  }

  const getsubcategories  = async(id) => {
    let response;
    let token = await AsyncStorage.getItem('sessiontoken');
  const url = 'http://3.21.214.37/admin/api/V1/video/getsubcategories';
  let data = JSON.stringify({
      category_id: id,
    });
    
   const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    };
  
    try {
      response = await axios.post(url, data, {
        maxBodyLength: 'Infinity',
        headers,
      });
      const allSubcategories = response.data?.subcategories || [];
      setsubCategories([{ subcategory_id: 'all', subcategory_name: 'All' }, ...allSubcategories]);
   return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fetchFavoriteVideos = async (category_id, subcategory_id) => {
    
    if(subcategory_id == 'all'){
      subcategory_id = ''
    }
    try {
      let token = await AsyncStorage.getItem('sessiontoken');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      };

      const data = {
        "tag_id": "ALL",
        "page": 0,
        "category_id": category_id,
        "subcategory_id": subcategory_id
      };

      const response = await axios.post(
        `http://3.21.214.37/admin/api/V1/video/getMyFavouriteVideos`, data,
        { headers },
      );
    //  console.log("Response===>",response.data?.videos?.videos)
     

      let getThumbnail = response.data?.videos?.videos[0]?.video_details;
      // console.log('thumnails', getThumbnail)


      if(subcategory_id == ''){
        console.log('ssssss',subcategory_id)
        setThumbnails(getThumbnail)
      }
      else{
        setThumbnails(getThumbnail)
      }
      
  
    return getThumbnail;
    
    } catch (error) {
     
    }
  };

  

  const handleSubcategoryPress = async ( subcategory_id) => {
    console.log('category id', category_id)
    console.log('subcategory id', subcategory_id)
    setIsLoading(true);
    setSelectedSubcategory(subcategory_id);
    if (subcategory_id === 'all') {
        const response = await fetchFavoriteVideos(category_id, subcategory_id);
        // console.log("re===>", response);
        // setThumbnails(response.data?.videos?.videos[0]?.video_details || []);
        
    } else {
        const response = await fetchFavoriteVideos(category_id,subcategory_id);
        // console.log('else',response.data)
        // const filteredThumbnails = response.data?.videos?.videos[0]?.video_details.filter(video => video.subcategory_id === subcategory_id) || [];
        // setThumbnails(filteredThumbnails);
    }
    setTimeout(() => {
        setIsLoading(false);
    }, 1000);
};
  


  const renderSubcategoryItem = ({ item }) => (
    <TouchableOpacity style={[styles.subcategoryButton, selectedSubcategory === item.subcategory_id && { backgroundColor: '#cce4f1' },]}
        onPress={() => handleSubcategoryPress(item.subcategory_id)}>
        <Text style={styles.subcategoryText}>{item.subcategory_name}</Text>
    </TouchableOpacity>
);



 
  const toggleFavorite = async videoId => {
    console.log(videoId)
    try {
      await RemoveFavourite(videoId);
      // setModalVisible(false);
      setRemovelikedVideo(true);
      setTimeout(() => {
        setRemovelikedVideo(false);
      }, 1000);

      //setLoaderState(true);
      fetchFavoriteVideos(category_id);
      setTimeout(() => {
        //setLoaderState(false);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  const renderThumbnailItem = ({item}) => {
    // console.log('itemsms',item)
  return(
    <View style={styles.thumbnailContainer}>
      <TouchableOpacity onPress={() => navigateToVideoDetails(item)}>
      <Image source={{ uri: item.video_thumbnail }} style={styles.thumbnail} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => bookmarkVideo(item)} style={styles.thumbnailIconContainer}>
        {item?.group_count ? (
          <Image
            source={require('../../assets/images/book_mark.png')}
            style={styles.thumbnailIcon}
          />
        ) : (
          <Image
            source={require('../../assets/images/book_unmark.png')}
            style={styles.thumbnailIcon}
          />
        )}
      </TouchableOpacity>

   


        <TouchableOpacity style={[styles.thumbnailIconContainer, styles.heartIconContainer]}  onPress={handleRemove}>

              {item?.status_fav === 1 ? (
            <Image source={require('../../assets/images/fav_unmark.png')} style={{width:25, height:25,top:10}} />
          ) : (
            <Image source={require('../../assets/images/fav_mark_video.png')} style={{width:25, height:25,top:10}} />
          )}
        </TouchableOpacity>
     

        <ToastModal
    visible={removelikedVideo}
    label={'Video is removed from favorite'}
  />
        {item?.video_public_yn !== 'Y' && (
          <>
            <TouchableOpacity  style={{top:-40,left:4}}>
              <Image source={require('../../assets/images/delete.png')} style={{width:25, height:25}}/>
            </TouchableOpacity>
           
            <Image source={require('../../assets/images/private_video.png')} style={{
              width: 40,
              height: 40,
              position: 'absolute',
              right: -0.2,
              top: 99,
              marginBottom:'10%',
            }} />
          </>
        )}

<View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.videoName}>{item.video_name}</Text>
        <Text style={styles.dateuser}>
        <Text style={styles.user}>{item.user_name.length > 12 ? item.user_name.substring(0, 12) + '...' : item.user_name}</Text> <Text style={styles.date}> {format(new Date(parseInt(item.dt_created)), 'MM-dd-yyyy')}</Text>
      </Text>
      </View>


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
{/*     
        <ToastModal visible={addlikedVideo} label={'Video marked as favorite successfully'}/>
                <ToastModal visible={removelikedVideo} label={'Video is removed from favorite'}/> */}
    

    </View>
  
  )}
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
  <FlatList
    data={thumbnails}
    keyExtractor={(item, index) => index.toString()}
    renderItem={renderThumbnailItem}
    numColumns={2}
  />

  {isFocused ? (
    <CustomBottomSheet
      bottomSheeetModal={bottomSheeetModal}
      setBottomSheetModal={setBottomSheetModal}
      videoBookmarkData={videoBookmarkData}
      allVideosData={thumbnails}
      setVideosData={setThumbnails}
      setVideoAddedInManualToastModal={setVideoAddedInManualToastModal}
      favouriteViewAllVideoBookmark={'favouriteViewAllVideoBookmark'}
    />
  ) : null}
 {isFocused && <LoaderModal visible={loaderState} transparent={true} />}

 <ToastModal
      visible={videoAddedInManualToastModal}
      label={'Videos added to manual successfully'}
    />
</View>
);
};
const styles = StyleSheet.create({
container: {
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
});

export default FavoriteViewAll;


