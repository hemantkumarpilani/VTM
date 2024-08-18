import { useState,useEffect } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { format } from 'date-fns';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { categoryWiseVideApi } from '../../api/axiosApi';
import Colors from '../../utils/Colors';
import LoaderModal from '../../Components/LoaderModal';
import { AddFavourite } from './AddFavourite';
import { RemoveFavourite } from './RemoveFavourite';
import ToastModal from '../../Components/ToastModal';
import CustomBottomSheet from '../../Components/CustomBottomSheet';
import CustomHeader from '../../Components/CustomHeader';

const ViewAll = ({ route }) => {
  // console.log(route)
  const [subcategories, setsubCategories] = useState([]);
  //const {category_id,category_name} = route?.params?.categoryData;
  //console.log("params======>",route?.params);
  const category_id=route?.params?.categoryData?.categoryId;

  console.log("category_id ======>",category_id);
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [thumbnails, setThumbnails] = useState([]);
  const [loaderModal, setLoaderModal] = useState(false)
  const navigation = useNavigation();
  const [addlikedVideo,setAddlikedVideo]=useState(false);
  const [removelikedVideo,setRemovelikedVideo]=useState(false);

  const [videoBookmarkData, setVideoBookMarkData] = useState();
  const [bottomSheeetModal, setBottomSheetModal] = useState(false);
  const isFocused = useIsFocused();
  const [videoAddedInManualToastModal, setVideoAddedInManualToastModal] =
    useState(false);

    const arrowimg = require('../../assets/images/back.png')

  useEffect(() => {
    // getsubcategories(route?.params?.categoryData?.categoryId);
    getsubcategories(category_id);
    handleSubcategoryPress('all');
    // console.log('category_id',category_id)
  }, []);
  const getsubcategories  = async(id) => {
    setLoaderModal(true)
    // console.log(id)
     console.log('Inside getsubcategories')

    let token = await AsyncStorage.getItem('sessiontoken');
   // console.log(token)
  const url = 'http://3.21.214.37/admin/api/V1/video/getsubcategories';
  let data = JSON.stringify({
      category_id: id,
    });
    
   const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    };
  
    try {
     const  response = await axios.post(url, data, {
        headers,
      });
      const allSubcategories = response.data?.subcategories || [];
      setsubCategories([{ subcategory_id: 'all', subcategory_name: 'All' }, ...allSubcategories]);
      setLoaderModal(false)
   return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  
  const handleSubcategoryPress = async (subcategory_id) => {

    setSelectedSubcategory(subcategory_id);
    if (subcategory_id === 'all') {
      const response = await categoryWiseVideApi(category_id);
      console.log("category_id========>>>>>>>>",category_id)
      setThumbnails(response.data?.videos?.video_details || []);
    //  console.log(response.data?.videos?.video_details || []);
    } else {
      
      const response = await categoryWiseVideApi(category_id);
      const filteredThumbnails = response.data?.videos?.video_details.filter(video => video.subcategory_id === subcategory_id) || [];
      setThumbnails(filteredThumbnails);
  
    }
  };
  const renderSubcategoryItem = ({ item }) => (
    <TouchableOpacity style={[styles.subcategoryButton,selectedSubcategory === item.subcategory_id && { backgroundColor: '#cce4f1' },]}
    onPress={() => handleSubcategoryPress(item.subcategory_id)}>
      <Text style={styles.subcategoryText}>{item.subcategory_name}</Text>
    </TouchableOpacity>
  );

  const bookmarkVideo = item => {
    // console.log(item)
    setVideoBookMarkData(item);
    setBottomSheetModal(true);
  };
  const navigateToVideoDetails = (item) => {
    navigation.navigate('VideoDetails', { item });
  };
  const renderThumbnailItem = ({ item }) => (
    // const createdDate = new Date(parseInt(item?.dt_created));
    <View style={styles.thumbnailContainer}>
      <TouchableOpacity onPress={() => navigateToVideoDetails(item)}>
      <Image source={{ uri: item.video_thumbnail }} style={styles.thumbnail} />
      </TouchableOpacity>
      <Pressable style={styles.thumbnailIconContainer}>
        <TouchableOpacity onPress={()=>bookmarkVideo(item)}>
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
        {/* <Image source={require('../../assets/images/book_unmark.png')}  style={styles.img} /> */}
        </TouchableOpacity>
     
        </Pressable>


        <TouchableOpacity style={[styles.thumbnailIconContainer, styles.heartIconContainer]} onPress={() => handleToggleFavorite(item)}>
                    <Image
                        source={item.status_fav === 1 ? require('../../assets/images/fav_mark_video.png') : require('../../assets/images/fav_unmark.png')}
                        style={styles.img}
                    />
        </TouchableOpacity>
       
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.videoName}>{item.video_name}</Text>
        <Text style={styles.dateuser}>
        <Text style={styles.user}>{item.user_name.length > 12 ? item.user_name.substring(0, 12) + '...' : item.user_name}</Text> <Text style={styles.date}> {format(new Date(parseInt(item.dt_created)), 'MM-dd-yyyy')}</Text>
      </Text>
      </View>
    </View>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
       title: route?.params?.categoryData?.categoryName || 'Default Title',
     // title: category_name || 'Default Title',
      headerTitleStyle: {
        color: Colors.lightblue, 
      },
      headerTitleAlign: 'center',
    });
  }, [navigation,route?.params?.categoryData?.categoryName]);
// }, [navigation, category_name]);
  

  const handleToggleFavorite = async (item) => {
    try {
        let updatedThumbnails;
        if (item.status_fav === 1) {
            await RemoveFavourite(item.video_id);
            setRemovelikedVideo(true);
            setTimeout(() => {
              setRemovelikedVideo(false);
            }, 1000);
            updatedThumbnails = thumbnails.map(video => {
                if (video.video_id === item.video_id) {
                    return { ...video, status_fav: 0 };
                }
                return video;
            });
        } else {
            await AddFavourite(item.video_id);
            setAddlikedVideo(true);
            setTimeout(() => {
              setAddlikedVideo(false);
            }, 1000);
            updatedThumbnails = thumbnails.map(video => {
                if (video.video_id === item.video_id) {
                    return { ...video, status_fav: 1 };
                }
                return video;
            });
        }
        setThumbnails(updatedThumbnails);
    } catch (error) {
        console.error(error);
    }
};

  return (
    <View style={styles.container}>
     <ScrollView>
      <FlatList
        data={subcategories}
        keyExtractor={(item) => item.subcategory_id.toString()}
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
      <LoaderModal visible={loaderModal} transparent={true}/>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex:1,
     padding: 2,
  },
  subcategoryList: {
    marginTop: 10,
  },
  subcategoryButton: {
    // bottom:20,
    backgroundColor: '#e4ecef',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  subcategoryText: {
    color: 'black',
    alignSelf:'center'
    
  },
  thumbnailContainer: {
    flexDirection: 'column',
    marginBottom: responsiveWidth(1),
    width: responsiveWidth(45),
    marginLeft:10,
    marginTop:responsiveWidth(2)
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
    color:'black'
  },
  user: {
    fontSize: 12,
    color: 'black',
    fontWeight:'bold'
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  dateuser:{
    color:'black',
    fontSize:responsiveFontSize(1.7)
  },
  thumbnailIconContainer: {
    position: 'absolute',
    zIndex: 1,
    top:5,
  marginHorizontal:5
  
  },
  thumbnailIcon: {
    height: 20,
    width: 20,
    tintColor: '#cb2675',
    marginTop: responsiveWidth(3),
    marginLeft: responsiveWidth(3),
  },
  heartIconContainer: {
    right: responsiveWidth(1),
    marginRight: responsiveWidth(2),
  },
  img:{width:27, height:27}
});

export default ViewAll;







// import { useState, useEffect } from 'react';
// import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React, { useLayoutEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { format } from 'date-fns';
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import { categoryWiseVideApi } from '../../api/axiosApi';

// const ViewAll = ({ route }) => {
//   const { category_id, category_name } = route?.params?.categoryData;
//   const [subcategories, setSubCategories] = useState([{ subcategory_id: 'all', subcategory_name: 'All' }]);
//   const [selectedSubcategory, setSelectedSubcategory] = useState('all');
//   const [thumbnails, setThumbnails] = useState([]);
//   const navigation = useNavigation();

//   useEffect(() => {
//     loadVideos(category_id); // Load all videos initially
//     getSubcategories(category_id);
//   }, [category_id]);

//   const getSubcategories = async (id) => {
//     let token = await AsyncStorage.getItem('sessiontoken');
//     const url = 'http://3.21.214.37/admin/api/V1/video/getsubcategories';
//     let data = JSON.stringify({
//       category_id: id,
//     });

//     const headers = {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + token,
//     };

//     try {
//       const response = await axios.post(url, data, { headers });
//       const allSubcategories = response.data?.subcategories || [];
//       setSubCategories([{ subcategory_id: 'all', subcategory_name: 'All' }, ...allSubcategories]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const loadVideos = async (category_id) => {
//     const response = await categoryWiseVideApi(category_id);
//     setThumbnails(response.data?.videos?.video_details || []);
//   };

//   const handleSubcategoryPress = async (subcategory_id) => {
//     setSelectedSubcategory(subcategory_id);
//     if (subcategory_id === 'all') {
//       loadVideos(category_id); // Load all videos for the selected category
//     } else {
//       const response = await categoryWiseVideApi(category_id);
//       const filteredThumbnails = response.data?.videos?.video_details.filter(video => video.subcategory_id === subcategory_id) || [];
//       setThumbnails(filteredThumbnails);
//     }
//   };

//   const renderSubcategoryItem = ({ item }) => (
//     <TouchableOpacity
//       style={[
//         styles.subcategoryButton,
//         selectedSubcategory === item.subcategory_id && { backgroundColor: '#cce4f1' },
//       ]}
//       onPress={() => handleSubcategoryPress(item.subcategory_id)}
//     >
//       <Text style={styles.subcategoryText}>{item.subcategory_name}</Text>
//     </TouchableOpacity>
//   );
  

//   const navigateToVideoDetails = (item) => {
//     navigation.navigate('VideoDetails', { item });
//   };

//   const renderThumbnailItem = ({ item }) => (
//     <View style={styles.thumbnailContainer}>
//       <TouchableOpacity onPress={() => navigateToVideoDetails(item)}>
//         <Image source={{ uri: item.video_thumbnail }} style={styles.thumbnail} />
//       </TouchableOpacity>
//       <Pressable style={styles.thumbnailIconContainer} />
//       <Pressable style={[styles.thumbnailIconContainer, styles.heartIconContainer]} />
//       <View style={styles.textContainer}>
//         <Text numberOfLines={1} style={styles.videoName}>{item.video_name}</Text>
//         <Text style={styles.dateuser}>
//           <Text style={styles.user}>{item.user_name.length > 12 ? item.user_name.substring(0, 12) + '...' : item.user_name}</Text>
//           <Text style={styles.date}> {format(new Date(parseInt(item.dt_created)), 'MM-dd-yyyy')}</Text>
//         </Text>
//       </View>
//     </View>
//   );

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: route?.params?.categoryData?.categoryName || 'Default Title',
//       headerTitleStyle: {
//         color: '#007ac3',
//       },
//       headerTitleAlign: 'center',
//     });
//   }, [navigation, route?.params?.categoryData?.categoryName]);

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={subcategories}
//         keyExtractor={(item) => item.subcategory_id.toString()}
//         renderItem={renderSubcategoryItem}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.subcategoryList}
//       />
//       <FlatList
//         data={thumbnails}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={renderThumbnailItem}
//         numColumns={2}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 2,
//   },
//   subcategoryList: {
//     marginTop: 10,
//   },
//   subcategoryButton: {
//     backgroundColor: '#e4ecef',
//     padding: 10,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   subcategoryText: {
//     color: 'black',
//   },
//   thumbnailContainer: {
//     flexDirection: 'column',
//     marginBottom: responsiveWidth(1),
//     width: responsiveWidth(45),
//     marginLeft: 10,
//     marginTop: responsiveWidth(2),
//   },
//   thumbnail: {
//     width: '100%',
//     height: responsiveHeight(20),
//     borderRadius: 10,
//     marginBottom: 5,
//   },
//   textContainer: {
//     flexDirection: 'column',
//   },
//   videoName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: 'black',
//   },
//   user: {
//     fontSize: 12,
//     color: 'black',
//     fontWeight: 'bold',
//   },
//   date: {
//     fontSize: 12,
//     color: 'gray',
//   },
//   dateuser: {
//     color: 'black',
//     fontSize: responsiveFontSize(1.7),
//   },
//   thumbnailIconContainer: {
//     position: 'absolute',
//     zIndex: 1,
//   },
//   thumbnailIcon: {
//     height: 20,
//     width: 20,
//     tintColor: '#cb2675',
//     marginTop: responsiveWidth(3),
//     marginLeft: responsiveWidth(3),
//   },
//   heartIconContainer: {
//     right: responsiveWidth(1),
//     marginRight: responsiveWidth(2),
//   },
// });

// export default ViewAll;

