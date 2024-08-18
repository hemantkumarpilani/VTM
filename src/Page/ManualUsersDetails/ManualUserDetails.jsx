import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoaderModal from '../../Components/LoaderModal';
import Colors from '../../utils/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useIsFocused} from '@react-navigation/native';
import {getUserInfo} from '../../api/axiosApi';
import CustomHeader from '../../Components/CustomHeader';

const ManualUserDetails = ({route}) => {
  console.log('route', route);
  const [userInfo, setUserInfo] = useState();
  const [loaderModal, setLoaderModal] = useState(false)
  const profileimg = require('../../assets/images/user.png');
// const cameraimg = require('../../../assets/images/camera.png');
  const isFocused = useIsFocused();
  const arrowimg = require('../../assets/images/back.png')
  const formatDate = (timestamp) => {
   const date = new Date(parseInt(timestamp));
   const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',

   };
   return date.toLocaleDateString('en-US', options);
};
  useEffect(() => {
    if (isFocused) {
      getUserInfoApiResponse();
    }
  }, []);

  const getUserInfoApiResponse = async () => {
    setLoaderModal(true)
    const response = await getUserInfo(route?.params?.item?.user_id);
    setUserInfo(response.data?.user);
    setLoaderModal(false)
  };
  return (
    <View style={styles.container}>
     <CustomHeader headerTitle={'Profile'} require={arrowimg} />
      <View style={styles.container2}>
        <View style={styles.userInfocontainer}>
           
            <>
              <Text style={styles.nameContainer}>
                {userInfo?.user_firstname} {userInfo?.user_lastname}
              </Text>
              <Text style={styles.emailContainer}>{userInfo?.email}</Text>
              <View style={styles.imagConatainer}>
                <Image
                  style={styles.imag}
                  source={
                     userInfo?.user_photo_url
                      ? {uri: userInfo?.user_photo_url}
                      : profileimg
                  }
                />
                {/* <Image style={styles.imag} source={profileImage ? { uri: userInfo.user.user_photo_url } : profileimg} /> */}
              </View>
              
              <View>
                <Text style={styles.memberDate}>
                  Member Since: {formatDate(userInfo?.user_created_dt)}
                </Text>
              </View>
            </>
          
        </View>
      </View>
      <View style={styles.container3}>
        <View style={styles.container4}>
          <Text style={styles.textNoVideos}>No.of Videos</Text>
          <Text style={styles.videoText}>Total (Community/My Videos)</Text>
          <View style={styles.container5}>
            {userInfo && (
              <>
                <View>
                  <Text style={styles.numbershowText}>
                    {userInfo?.total_videos}({userInfo?.publicvideo}/
                    {userInfo?.privatevideo})
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
        <View style={styles.container6}>
          <Text style={styles.textNoVideos}>No.of Manuals</Text>
          <Text>Total (Admin/User)</Text>
          <View style={styles.container5}>
            {userInfo && (
              <>
                <View>
                  <Text style={styles.numbershowText}>
                    {userInfo?.total_groups}(
                    {userInfo?.total_own_groups}/
                    {userInfo?.total_part_groups})
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
        
      </View>
      <LoaderModal visible={loaderModal} transparent={true}/>
    </View>
  );
};

export default ManualUserDetails;

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: Colors.white,
    flexDirection: 'column',
  },
  userInfocontainer: {
    
    alignSelf: 'center',
    marginTop: responsiveHeight(8),
  },
  container2: {
    backgroundColor: Colors.lightblue,
    height: responsiveHeight(40),
    bottom:10
  },
  nameContainer: {
    fontSize: responsiveFontSize(2.3),
    color: Colors.white,
    textAlign: 'center',
    fontWeight: '800',
  },
  emailContainer: {
    fontSize: responsiveFontSize(1.9),
    color: Colors.white,
    textAlign: 'center',
  },
  container3: {
    backgroundColor: Colors.white,
    height: responsiveHeight(17),
    width: responsiveWidth(90),
    marginTop: responsiveWidth(-15),
    alignSelf: 'center',
    elevation: 4,
    shadowOpacity: 20,
    borderRadius: 10,
    flexDirection: 'row',
  },
  imag: {
    width: 100,
    height: 100,
    borderColor: 'white',
    borderWidth: 1.5,
    borderRadius: 100,
  },
  imagConatainer: {
    alignItems: 'center',
    marginTop: responsiveWidth(1.5),
    marginBottom: responsiveWidth(1.5),
  },
  cameraImgContainer: {
    backgroundColor: '#004672',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: responsiveWidth(-6),
    width: responsiveWidth(11),
    height: responsiveHeight(5),
    borderRadius: responsiveWidth(3),
    justifyContent: 'center',
    marginBottom: responsiveWidth(3),
  },
  imgCamera: {
    width: responsiveWidth(7),
    height: responsiveHeight(3.5),
    tintColor: Colors.white,
  },
  memberDate: {
    fontSize: responsiveFontSize(1.9),
    color: Colors.white,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  container4: {
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: responsiveHeight(2.5),
    alignItems: 'center',
    fontWeight: 'bold',
    width: '50%',
  },
  textNoVideos: {
    fontSize: responsiveFontSize(2.2),
    color: 'black',
  },
  container5: {
    flexDirection: 'row',
  },
  videoText: {
    textAlign: 'center',
  },
  numbershowText: {
    color: Colors.lightblue,
    fontSize: responsiveFontSize(2.6),
    marginTop: responsiveHeight(1),
    fontWeight: '600',
  },
  container6: {
    flexDirection: 'column',
    textAlign: 'center',
    fontWeight: 'bold',
    width: '50%',
    marginTop: responsiveHeight(2.5),
    alignItems: 'center',
  },
  container8: {
    flexDirection: 'row',
    backgroundColor: '#f5f6fa',
    height: responsiveHeight(7),
    marginBottom: responsiveWidth(2),
    marginHorizontal: responsiveWidth(5),
    borderRadius: 5,
    alignItems: 'center',
  },
});
