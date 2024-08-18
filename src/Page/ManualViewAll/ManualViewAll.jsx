import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getSubCategories} from '../../api/axiosApi';
import CustomHeader from '../../Components/CustomHeader';
import {format} from 'date-fns';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import EyeIcon from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import LoaderModal from '../../Components/LoaderModal';
import FastImage from 'react-native-fast-image';

const ManualViewAll = ({route, navigation}) => {
  //   console.log('manual view all ', route.params?.categoryData?.categoryVideo);
  const [selectedSubcategory, setSelectedSubcategory] = useState();
  const [thumbnails, setThumbnails] = useState([]);
  const [loaderModal, setLoaderModal] = useState(false)
  const [subCategories, setSubCategories] = useState([
    {subcategory_id: 'all', subcategory_name: 'All'},
  ]);

  

  const arrowimg = require('../../assets/images/back.png');
  useEffect(() => {
    
    getSubCategoriesApiResponse();
    
  }, []);

  const getSubCategoriesApiResponse = async () => {
    setLoaderModal(true)
    const response = await getSubCategories(
      route?.params?.categoryData?.categoryId,
    );
    // console.log('response', response?.data)
    const allSubcategories = response.data?.subcategories || [];
    if(subCategories){
      console.log('inside if')
      setThumbnails(route?.params?.categoryData?.categoryVideoData?.video_details)
    }
    setLoaderModal(false)
    setSubCategories([
      {subcategory_id: 'all', subcategory_name: 'All'},
      ...allSubcategories,
    ]);
    
  };

  const renderSubcategoryItem = ({item}) => {
    return (
      <View>

        <TouchableOpacity
          style={[
            styles.subcategoryButton,
            selectedSubcategory === item.subcategory_id && {
              backgroundColor: '#cce4f1',
            },
          ]}
          onPress={() => handleSubcategoryPress(item.subcategory_id)}
          >
          <Text style={styles.subcategoryText}>{item?.subcategory_name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleSubcategoryPress = async subcategory_id => {
    setSelectedSubcategory(subcategory_id);
    if (subcategory_id === 'all') {
      setThumbnails(
        route?.params?.categoryData?.categoryVideoData?.video_details,
      );
      //  console.log(response.data?.videos?.video_details || []);
    } else {
      const filteredThumbnails =
        route?.params?.categoryData?.categoryVideoData?.video_details?.filter(
          video => video.subcategory_id === subcategory_id,
        ) || [];
        console.log('hemant',filteredThumbnails)
      setThumbnails(filteredThumbnails);
    }
  };

  const navigateToVideoDetails = item => {
    navigation.navigate('VideoDetails', {item});
  };

  const renderThumbnailItem = ({item}) => (
    <View style={styles.thumbnailContainer}>
      <TouchableOpacity onPress={() => navigateToVideoDetails(item)}>
        <Image source={{uri: item.video_thumbnail}} style={styles.thumbnail} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.thumbnailIconContainer}
        onPress={() => navigation.navigate('VideoViews', {item: item})}>
        <EyeIcon
          name={'eye'}
          size={25}
          color={Colors.favouriteIconColor}
          style={{
            top: 120,
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.thumbnailIconContainer, styles.heartIconContainer]}>
        <Image
          source={require('../../assets/images/fav_unmark.png')}
          style={styles.img}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.videoName}>{item.video_name}</Text>
        <Text style={styles.dateuser}>
          <Text style={styles.user}>{item.user_name}</Text>
        </Text>
      </View>
      <Text style={styles.date}>
        {' '}
        {format(new Date(parseInt(item.dt_created)), 'MM-dd-yyyy')}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader
        headerTitle={route?.params?.categoryData?.categoryName}
        require={arrowimg}
      />
      <FlatList
        data={subCategories}
        keyExtractor={item => item.subcategory_id?.toString()}
        renderItem={renderSubcategoryItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.subcategoryList}
      />

      { thumbnails?.length ==0 ?  <View
          style={{
            height:responsiveScreenHeight(78),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          
            <FastImage
            style={{width: '25%', height: '25%', marginBottom:responsiveScreenHeight(10)}}
            source={require('../../assets/images/empty.gif')}
          />
          <Text style={{color: Colors.black, bottom:responsiveScreenHeight(10)}}>No Record Found</Text>
        
         
        </View> :  <FlatList
        data={thumbnails}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderThumbnailItem}
        numColumns={2}
      />}

     
      <LoaderModal visible={loaderModal} transparent={true}/>
    </View>
  );
};

export default ManualViewAll;

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
    alignSelf: 'center',
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
    // marginBottom: 5,
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
    top: 5,
    marginHorizontal: 5,
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
  img: {width: 25, height: 25},
});
