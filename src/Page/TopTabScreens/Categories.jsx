import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  categoriesAPI,
  categoryWiseVideApi,
  searchVideoApi,
} from '../../api/axiosApi';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import StarIcon from 'react-native-vector-icons/AntDesign';
import HeartIcon from 'react-native-vector-icons/Entypo';
import Colors from '../../utils/Colors';
import SearchIcon from 'react-native-vector-icons/Feather';
import DoubleRightIcon from 'react-native-vector-icons/FontAwesome5';
import LoaderModal from '../../Components/LoaderModal';
import FastImage from 'react-native-fast-image';
import {AddFavourite} from './AddFavourite';
import {RemoveFavourite} from './RemoveFavourite';
import ToastModal from '../../Components/ToastModal';
import CustomBottomSheet from '../../Components/CustomBottomSheet';

let categoriesAPiResponse;
let searchVideosFlag = false;
let searchVideos;
let categories = [];
let temporaryArray = [];
const Categories = () => {
  const navigation = useNavigation();
  const {width, height} = useWindowDimensions();
  const isFocused = useIsFocused();
  const [categories, setCategories] = useState();
  const [categoryId, setCategoryId] = useState();
  const [allVideosData, setAllVideosData] = useState([]);
  const [videoState, setVideosState] = useState(false);
  const [loaderModal, setLoaderModal] = useState(false);
  const [addlikedVideo, setAddlikedVideo] = useState(false);
  const [removelikedVideo, setRemovelikedVideo] = useState(false);
  const videosData = [];
  const [noDataFound, setNoDataFound] = useState(false);
  const [videoBookmarkData, setVideoBookMarkData] = useState();
  const [bottomSheeetModal, setBottomSheetModal] = useState(false);
  const [videoAddedInManualToastModal, setVideoAddedInManualToastModal] =
    useState(false);

  const categoriesApiResponse = async () => {
   
    setLoaderModal(true);
    categoriesAPiResponse = await categoriesAPI();
    const categoriesArray = categoriesAPiResponse?.data?.data?.categories;
    
    
    setCategories(categoriesAPiResponse?.data?.data?.categories);

    if (categoriesAPiResponse) {
      for (let i = 0; i < categoriesArray?.length; i++) {
        
        const response = await categoryWiseVideApi(
          categoriesArray[i]?.category_id,
        );
      
        let ob = {
          Category: categoriesArray[i]?.category_name,
          video_details: response?.data?.videos?.video_details,
        };
        videosData.push(ob);
      }
      
      setLoaderModal(false);
      setAllVideosData(videosData);
      
    }
  };

  useEffect(() => {
    if (isFocused) {
      categoriesApiResponse();
    }
  }, [isFocused]);

  const navigateToVideoDetails = item => {
    navigation.navigate('VideoDetails', {item});
  };

  const handleViewAll = (category_id, category_name) => {
   
    navigation.navigate('ViewAll', {
      categoryData: {
        categoryId: category_id,
        categoryName: category_name,
      },
    });
  };
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }
  const searchVideo = async text => {
    
    text = text.toLowerCase();
    if (text.length > 2) {
      setLoaderModal(true);
      try {
        const searchData = await searchVideoApi(text);
        const filteredData = []; // Create a temporary array to store filtered data
       
        let searchVideoData = searchData.data?.videos;
        const categoriesArray = searchVideoData
          ?.map(x => x?.category_name)
          ?.filter(onlyUnique)
          .sort();
        const test = searchVideoData
          ?.map(x => x?.category_name)
          ?.filter((value, index) => (value = 'Hygiene'));
      
   
        if (categoriesArray == undefined) {
        
          setNoDataFound(true);
        } else {
          setNoDataFound(false);
        }

        for (let i = 0; i < categoriesArray?.length; i++) {
          const filteredCatVideo = searchVideoData?.filter(
            x => x.category_name == categoriesArray[i],
          );
          filteredData.push({
            Category: categoriesArray[i],
            video_details: filteredCatVideo,
          });
        }

        setAllVideosData(filteredData);
        setVideosState(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        // Handle error, such as showing an error message to the user
      } finally {
        setLoaderModal(false); // Hide loader after fetching data
      }
    } else if (text === '') {
      setAllVideosData([]);
      categoriesApiResponse(); // Fetch all videos if search text is empty
    }
  };

  const handleToggleFavorite = async item => {
    try {
      if (item?.status_fav === 1) {
        await RemoveFavourite(item?.video_id);
        categoriesApiResponse();
        setRemovelikedVideo(true);
        setTimeout(() => {
          setRemovelikedVideo(false);
        }, 1000);
        setAllVideosData(prevVideos =>
          prevVideos.map(video => {
            if (video?.video_id === item?.video_id) {
              return {...video, status_fav: 0};
            }
            return video;
          }),
        );
      } else {
        await AddFavourite(item?.video_id);
        categoriesApiResponse();
        setAddlikedVideo(true);
        setTimeout(() => {
          setAddlikedVideo(false);
        }, 1000);
        setAllVideosData(prevVideos =>
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

  const bookmarkVideo = item => {
    
    setVideoBookMarkData(item);
    setBottomSheetModal(true);
  };

  const videoDisplay = item => {
    return (
      <FlatList
        data={item?.video_details?.slice(0, 10)}
        // maxToRenderPerBatch={10}
        horizontal
        ItemSeparatorComponent={() => {
          return <View style={{paddingHorizontal: 5}}></View>;
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View style={{}}>
              <TouchableOpacity
                style={{}}
                onPress={() => navigateToVideoDetails(item)}>
                  
                <Image
                  source={{uri: item?.video_thumbnail}}
                  style={{
                    width: width / 2.1,
                    height: 200,
                    left: 2,
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  position: 'absolute',
                  width: width / 2.1,
                  padding: 10,
                }}>
                <TouchableOpacity style={{right: 6}} onPress={()=>bookmarkVideo(item)}>
                {item?.group_count ? (
                          <Image
                            source={require('../../assets/images/book_mark.png')}
                            style={{width: 20, height: 20, left: 5}}
                          />
                        ) : (
                          <Image
                            source={require('../../assets/images/book_unmark.png')}
                            style={{width: 20, height: 20, left: 5}}
                          />
                        )}
                 
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    left: 10,
                  }}
                  onPress={() => {
                    handleToggleFavorite(item);
                  }}>
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
              </View>
              <Text
                style={{
                  left: 2,
                  padding: 5,
                  backgroundColor: Colors.categoriesVideoNameText,
                  color: Colors.black,
                  fontSize: 15,
                  fontWeight: '400',
                  width: '100%',
                  position: 'absolute',
                  top: 171,
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  opacity: 0.8,
                }}>
                {item?.video_name}
              </Text>
            </View>
          );
        }}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: '2%',
          paddingVertical: '2%',
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
            style={{left: 20}}
          />
          <TextInput
            placeholder="Search By Name"
            onChangeText={text => searchVideo(text)}
            placeholderTextColor={Colors.mediumGrey}
            style={{
              width: '90%',
              left: 15,
              fontSize: 17,
              color: Colors.black,
              fontWeight: '400',
            }}
          />
        </View>
      </View>
      {noDataFound ? (
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
          data={allVideosData}
          renderItem={({item}) => {
            return (
              <View style={{gap: 30}}>
             
                <View
                  style={{
                    marginHorizontal: '2%',
                    top: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      // top: 5,
                      color: Colors.lightblue,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    {item?.Category}
                  </Text>
                  {item?.video_details?.length > 2 ?   <TouchableOpacity
                    style={{flexDirection: 'row', width: '20%'}}
                    onPress={() =>
                      handleViewAll(
                        item?.video_details[0]?.category_id,
                        item?.Category,
                      )
                    }>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Colors.viewAllText,
                      }}>
                      View All
                    </Text>
                    <DoubleRightIcon
                      name={'angle-double-right'}
                      size={16}
                      style={{alignSelf: 'center', left: 5}}
                    />
                  </TouchableOpacity> : null}
                
                </View>

                {videoDisplay(item)}
              </View>
            );
          }}
        />
      )}

      {isFocused && <LoaderModal visible={loaderModal} transparent={true} />}
      <ToastModal
        visible={addlikedVideo}
        label={'Video marked as favorite successfully'}
      />
      <ToastModal
        visible={removelikedVideo}
        label={'Video is removed from favorite'}
      />

      <ToastModal
        visible={videoAddedInManualToastModal}
        label={'Videos added to manual successfully'}
      />

      {isFocused ? (
        <CustomBottomSheet
          bottomSheeetModal={bottomSheeetModal}
          setBottomSheetModal={setBottomSheetModal}
          videoBookmarkData={videoBookmarkData}
          allVideosData={allVideosData}
          setVideosData={setAllVideosData}
          setVideoAddedInManualToastModal={setVideoAddedInManualToastModal}
          categoriesBookMark ={'categoriesBookMark'}
        />
      ) : null}
    </View>
    // </View>
  );
};

export default Categories;

const styles = StyleSheet.create({});
