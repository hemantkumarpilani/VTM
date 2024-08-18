
import { ScrollView,Pressable, Text, View, Image, TouchableOpacity,Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './AccountStyle/accountStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import LoaderModal from '../../../Components/LoaderModal';
import Logout from './Logout';
import ImagePicker from 'react-native-image-crop-picker';
import ToastModal from '../../../Components/ToastModal';


const profileimg = require('../../../assets/images/user.png');
const cameraimg = require('../../../assets/images/camera.png');
const pencilimg = require('../../../assets/images/pencil.png');
const rightArrimg = require('../../../assets/images/rightarrow.png');
const myVideosimg = require('../../../assets/images/video-camera.png');
const passwordimg = require('../../../assets/images/password.png');
const notifiimg = require('../../../assets/images/bell.png');
const privacyimg = require('../../../assets/images/insurance.png');
const logoutimg = require('../../../assets/images/logout1.png')

const Account = ({ route }) => {
   
   const [userInfo, setUserInfo] = useState(null);
   const navigation = useNavigation();
   const [isLoading, setIsLoading] = useState(true);
   const [logoutModalVisible, setLogoutModalVisible] = useState(false);
   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')
   const [profileImage, setProfileImage] = useState(null);
   const [modalVisible1, setModalVisible1] = useState(false);
   const [toastModal, setToastModal] = useState(false);
   const isFocused = useIsFocused();

   useEffect(() => {

      if (route.params?.updatedUserInfo) {
         // setToastModal(true);
         // setTimeout(() => {
         //   setToastModal(false);
         // }, 1500);
         setUserInfo(route.params.updatedUserInfo);
       }
      getUserInfo();
    }, [ route.params]);

   
      
   const getUserInfo = async () => {
      try {
         let token = await AsyncStorage.getItem('sessiontoken');
         let user_id = await AsyncStorage.getItem('userid');

         const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
         };
         const response = await axios.post(
            'http://3.21.214.37/admin/api/V1/general/getUser',
            { user_id },
            { headers }
         );
         console.log('account',response?.data?.user)

         setUserInfo(response.data);
         setIsLoading(false);
      } catch (error) {
         console.error('Error fetching user info:', error);
         console.log('Error response:', error.response);
         setIsLoading(false);
      }
   };

   const formatDate = (timestamp) => {
      const date = new Date(parseInt(timestamp));
      const options = {
         year: 'numeric',
         month: 'numeric',
         day: 'numeric',
      };
      return date.toLocaleDateString('en-US', options);
   };

   const handleNavigationtoProfile = () => {
      navigation.navigate('Profile', { userInfo: userInfo });
    }

    const handleNavigationtoNotification = () => {
      navigation.navigate('Notifications', { userInfo: userInfo });
    }

   const logoutUser = async () => {
      try {
         let token = await AsyncStorage.getItem('sessiontoken');
         console.log('sessionToken', token)
         const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
         };
         const response = await axios.get(
            'http://3.21.214.37/admin/api/V1/general/logout',
            { headers }
         );
         console.log(response)
        await AsyncStorage.removeItem('sessiontoken');
         

        await AsyncStorage.removeItem('userid');
      
         navigation.navigate('Login');
      } catch (error) {
         console.error('Error logging out:', error);

      }
   };

   const handleLogout = () => {
      setLogoutModalVisible(true);
   };

   const handleCancel = () => {
      setLogoutModalVisible(false);
   };

   const handleConfirmLogout = () => {
      logoutUser();
      setLogoutModalVisible(false);
      setIsLoading(true);
   };


const openImagePicker = async (sourceType) => {
   setModalVisible1(false);
   try {
       let image;

       if (sourceType === 'camera') {
           image = await ImagePicker.openCamera({
               width: 300,
               height: 400,
               cropping: true,
           });
       } else {
           image = await ImagePicker.openPicker({
               width: 300,
               height: 400,
               cropping: true,
           });
       }

       const imageData = new FormData();
       imageData.append('image', {
           uri: image.path,
           type: image.mime,
           name: image.path.split('/').pop(),
       });
       imageData.append('image_type', 'user');

       const token = await AsyncStorage.getItem('sessiontoken');
       const headers = {
           'Content-Type': 'multipart/form-data',
           'Authorization': 'Bearer ' + token,
       };

       const response = await axios.post(
           'http://3.21.214.37/admin/api/V1/general/uploadImage',
           imageData,
           { headers }
       );
       setProfileImage(response.data.user_photo_url);

       getUserInfo();
     //  alert('Profile Picture uploaded successfully!');
       
       console.log('Image uploaded successfully:', response.data);
      
   } catch (error) {
       console.error('Error taking photo or selecting image:', error);
      
       Alert.alert('Error', 'Failed to take photo or select image. Please try again.');
   }
};



   return (
      <ScrollView>
         <View style={styles.container}>
            <LoaderModal visible={isLoading} transparent={true} />
            <View style={styles.container2}>
               <View style={styles.userInfocontainer}>
                  {userInfo && (
                     <>
                        <Text style={styles.nameContainer}>
                           {userInfo.user.user_firstname } {userInfo.user.user_lastname}
                        </Text>
                        <Text style={styles.emailContainer}>
                           {userInfo.user.email}
                        </Text>
                        <View style={styles.imagConatainer}>
                           <Image style={styles.imag} source={userInfo.user.user_photo_url ? { uri: userInfo.user.user_photo_url } : profileimg} />
                           {/* <Image style={styles.imag} source={profileImage ? { uri: userInfo.user.user_photo_url } : profileimg} /> */}
                        </View>
                        <Pressable onPress={() => setModalVisible1(true)}>
                        <View style={styles.cameraImgContainer}>
                           <Image source={cameraimg} style={styles.imgCamera} />
                        </View>
                       </Pressable>
                        <View>
                           <Text style={styles.memberDate}>
                              Member Since: {formatDate(userInfo.user.user_created_dt)}
                           </Text>
                        </View>
                     </>
                  )}
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
                              <Text style={styles.numbershowText}>{userInfo.user.total_videos}({userInfo.user.publicvideo}/{userInfo.user.privatevideo})</Text>
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
                              <Text style={styles.numbershowText}>{userInfo.user.total_groups}({userInfo.user.total_own_groups}/{userInfo.user.total_part_groups})</Text>
                           </View>
                        </>
                     )}
                  </View>
               </View>
            </View>

            <View style={styles.container7}>
               <View >
                  <TouchableOpacity style={styles.container8} onPress={()=>handleNavigationtoProfile()}>
                     <View style={styles.iconContainer}>
                        <Image source={pencilimg} style={styles.iconImage} />
                     </View>
                     <Text style={styles.text}>Profile</Text>
                     <View style={styles.icon2}>
                        <Image source={rightArrimg} style={styles.rightArrowCon} />
                     </View>
                  </TouchableOpacity>
               </View>

               <View >
                  <TouchableOpacity style={styles.container8} onPress={() => navigation.navigate('MyVideos')}>
                     <View style={styles.iconContainer}>
                        <Image source={myVideosimg} style={styles.iconImage} />
                     </View>
                     <Text style={styles.text}>My Videos</Text>
                     <View style={styles.icon2}>
                        <Image source={rightArrimg} style={styles.rightArrowCon} />
                     </View>
                  </TouchableOpacity>
               </View>

               <View >
                  <TouchableOpacity style={styles.container8} onPress={() => navigation.navigate('ChangePassword')}>
                     <View style={styles.iconContainer}>
                        <Image source={passwordimg} style={styles.iconImage} />
                     </View>
                     <Text style={styles.text}>Change Password</Text>
                     <View style={styles.icon2}>
                        <Image source={rightArrimg} style={styles.rightArrowCon} />
                     </View>
                  </TouchableOpacity>
               </View>

               <View >
                  <TouchableOpacity style={styles.container8} onPress={()=>handleNavigationtoNotification()}>
                     <View style={styles.iconContainer}>
                        <Image source={notifiimg} style={styles.iconImage} />
                     </View>
                     <Text style={styles.text}>Notifications</Text>
                     <View style={styles.icon2}>
                        <Image source={rightArrimg} style={styles.rightArrowCon} />
                     </View>
                  </TouchableOpacity>
               </View>

               <View >
                  <TouchableOpacity style={styles.container8} onPress={() => navigation.navigate('PrivacyPolicy')}>
                     <View style={styles.iconContainer}>
                        <Image source={privacyimg} style={styles.iconImage} />
                     </View>
                     <Text style={styles.text}>Privacy Policy</Text>
                     <View style={styles.icon2}>
                        <Image source={rightArrimg} style={styles.rightArrowCon} />
                     </View>
                  </TouchableOpacity>
               </View>

               <View >
                  <TouchableOpacity style={styles.container8} onPress={() => navigation.navigate('TermsOfUse')}>
                     <View style={styles.iconContainer}>
                        <Image source={privacyimg} style={styles.iconImage} />
                     </View>
                     <Text style={styles.text}>Terms of Use</Text>
                     <View style={styles.icon2}>
                        <Image source={rightArrimg} style={styles.rightArrowCon} />
                     </View>
                  </TouchableOpacity>
               </View>

               <View>
                  <View>
                     <TouchableOpacity style={styles.container8} onPress={handleLogout}>
                        <View style={styles.iconContainer}>
                           <Image source={logoutimg} style={styles.iconImage} />
                        </View>
                        <Text style={styles.text}>Logout</Text>
                        <View style={styles.icon2}>
                           <Image source={rightArrimg} style={styles.rightArrowCon} />
                        </View>
                     </TouchableOpacity>
                  </View>
                  <Logout visible={logoutModalVisible} onCancel={handleCancel} onLogout={handleConfirmLogout} />

               </View>

            </View>
         </View>
         <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible1}
                onRequestClose={() => setModalVisible1(false)}
            >
                <View style={[styles.modalContainer]}>
                    <View style={[styles.modalContent]}>
                        <Text style={styles.modalHeader1}>Upload Profile Image</Text>
                        <TouchableOpacity onPress={() => openImagePicker('camera')}>
                            <Text style={styles.modalOptionText}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openImagePicker('library')}>
                            <Text style={styles.modalOptionText}>Choose from Library</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible1(false)}>
                            <Text style={styles.modalOptionTextCancel}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* <ToastModal visible={toastModal} label={'User Profile successfully'} /> */}
      </ScrollView>
   )
}

export default Account;
