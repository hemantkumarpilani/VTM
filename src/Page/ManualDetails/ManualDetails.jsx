import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Colors from '../../utils/Colors';
import SearchIcon from 'react-native-vector-icons/Feather';
import {
  approveVideoApi,
  getGroupUsersApi,
  getGroupVideosApi,
  rejectVideoApi,
} from '../../api/axiosApi';
import HeartIcon from 'react-native-vector-icons/AntDesign';
import EyeIcon from 'react-native-vector-icons/AntDesign';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {manualDetailIsUnFocus, manualDetailsIsFocus} from '../../Redux/Actions';
import {useDispatch} from 'react-redux';
import CustomHeader from '../../Components/CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
const backIconImage = require('../../assets/images/back.png');
import PlusIcon from 'react-native-vector-icons/AntDesign';
import DeleteIcon from 'react-native-vector-icons/AntDesign';
import ManualModal from '../../Components/ManualModal';
import ManualAdminModal from '../../Components/ManualAdminModal';
import ManualUserModal from '../../Components/ManualUserModal';
import ThreeDotsVerticalIcon from 'react-native-vector-icons/Entypo';

import LoaderModal from '../../Components/LoaderModal';
import DoubleRightIcon from 'react-native-vector-icons/FontAwesome5';
import ToastModal from '../../Components/ToastModal';
import FastImage from 'react-native-fast-image';
import { RemoveFavourite } from '../TopTabScreens/RemoveFavourite';
import { AddFavourite } from '../TopTabScreens/AddFavourite';


let groupVideos;
const ManualDetails = ({route, navigation}) => {
  console.log('first', route?.params?.item?.group_id);
  const [groupUsersData, setGroupUsersData] = useState([]);
  const [groupVideosData, setGroupVideosData] = useState([]);
  const [userId, setUserId] = useState();
  const [groupId, setGroupId] = useState();
  const [groupUserId, setGroupUserId] = useState();
  const focused = useIsFocused();
  const [removeModalState, setRemoveModalState] = useState(false);
  const [manualAdminModal, setManualAdminModal] = useState(false);
  const [manualUserModal, setManualUserModal] = useState(false);
  const [adminVideoModal, setAdminViewModal] = useState(false);
  const [loaderModal, setLoaderModal] = useState(false);
  const [videosData, setVideosData] = useState();
  const [deleteVideoConfirmationModal, setDeleteVideoConfirmationModal] =
    useState(false);
  const [adminApproveModal, setAdminApproveModal] = useState(false);
  const [toastModal, setToastModal] = useState(false);
  const [noDataFound, setNoDataFound] = useState(false)
  const [addlikedVideo,setAddlikedVideo]=useState(false);
  const [removelikedVideo,setRemovelikedVideo]=useState(false);

  const dispatch = useDispatch();

  const textInputRef = useRef();

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
    if (focused) {
      setLoaderModal(true);
      groupUsersApiResponse();
      groupVideosApiResponse();
      const getUserId = async () => {
        const userID = await AsyncStorage.getItem('userid');
        setUserId(userID);
      };
      getUserId();

      // setToastModal(true);
      // setTimeout(() => {
      //   setToastModal(false);
      // }, 1000);

      
    }
  }, [focused]);

  useEffect(() => {
    if (focused) {
      dispatch(manualDetailsIsFocus(focused));
    }

    return () => {
      dispatch(manualDetailIsUnFocus(false));
    };
  }, [focused]);

  const groupUsersApiResponse = async () => {
    const response = await getGroupUsersApi(route?.params?.item?.group_id);
    setGroupUsersData(response?.data?.group_users);
  };

  const groupVideosApiResponse = async () => {
    const response = await getGroupVideosApi(route?.params?.item?.group_id);
    // console.log('group video',response.data?.videos)
    groupVideos = response?.data?.videos;
    if(groupVideos == undefined){
      console.log('inside undefined')
      setNoDataFound(true)
    }
    else{
      setNoDataFound(false)
    }
    
    console.log('group videos',groupVideos )
    setGroupVideosData(response?.data?.videos);
    setLoaderModal(false);
  };

  const deleteManual = async (groupId, userId) => {
    setGroupId(groupId);
    setGroupUserId(userId);
    setRemoveModalState(true);
  };

  const openAdminModal = () => {
    setGroupId(route?.params?.item?.group_id);
    setManualAdminModal(true);
  };

  const ViewVideo = () => {
    setManualAdminModal(false);
    navigation.navigate('VideoDetails', {item: videosData});
  };

  const threedotModal = item => {
    setVideosData(item);
    if (item?.video_approved_yn == 'N') {
      setAdminApproveModal(true);
    } else {
      setAdminViewModal(true);
    }
  };

  const removeVideo = async item => {
    setAdminViewModal(false);
    setDeleteVideoConfirmationModal(true);
  };

  const approveVideo = async () => {
    const response = await approveVideoApi(
      videosData?.video_id,
      route?.params?.item?.group_id,
    );
    if (response.status == 200) {
      setAdminApproveModal(false);
      setLoaderModal(true);
      groupVideosApiResponse();
    }
  };

  const rejectVideo = async admin => {
    const response = await rejectVideoApi(
      videosData?.video_id,
      route?.params?.item?.group_id,
      videosData?.video_approved_yn,
    );
    if (response.status == 200) {
      if (admin) {
        setAdminApproveModal(false);
        setLoaderModal(true);
        groupVideosApiResponse();
      } else {
        setAdminViewModal(false);
        setLoaderModal(true);
        groupVideosApiResponse();
      }
    }
  };

  const handleViewAll = (category_id, category_name, item) => {
    navigation.navigate('ManualViewAll', {
      categoryData: {
        categoryId: category_id,
        categoryName: category_name,
        categoryVideoData: item,
      },
    });
  };

  const searchVideo = text => {
    if (text != '') {
      const filteredData = groupVideosData?.map(category => ({
        ...category,
        video_details: category.video_details.filter(video =>
          video.video_name.toLowerCase().includes(text.toLowerCase()),
        ),
      }));
      console.log(filteredData);
      // console.log(filteredData)
      setGroupVideosData(filteredData);
    } else {
      setGroupVideosData(groupVideos);
    }
  };

   
  const handleToggleFavorite = async (item) => {
    console.log("Inside handle Toggle Favorite")
    try {
      if (item?.status_fav === 1) {
        await RemoveFavourite(item?.video_id);
        setRemovelikedVideo(true);
      groupVideosApiResponse();
              setTimeout(() => {
                setRemovelikedVideo(false);
              }, 1000);
        setVideosData(prevVideos => prevVideos?.map(video => {
          if (video?.video_id === item?.video_id) {
            return { ...video, status_fav: 0 };
          }
          return video;
        }));
      } else {
        await AddFavourite(item?.video_id);
        setAddlikedVideo(true);
      groupVideosApiResponse();
              setTimeout(() => {
                setAddlikedVideo(false);
              }, 1000);
        setVideosData(prevVideos => prevVideos?.map(video => {
          if (video?.video_id === item?.video_id) {
            return { ...video, status_fav: 1 };
          }
          return video;
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };


  const renderVideosFlatlist = item => {
    return (
      <FlatList
        data={item?.video_details}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return <View style={{paddingHorizontal: 2}}></View>;
        }}
        scrollEnabled={item?.video_details?.length == 1 ? false : true}
        renderItem={({item}) => {
          return (
            <View style={{}}>
              <TouchableOpacity
                style={{
                  marginRight: 2,
                  marginLeft: 10,
                  // marginBottom:10,
                  borderRightWidth: item?.video_approved_yn == 'N' ? 5 : null,
                  borderRadius: item?.video_approved_yn == 'N' ? 13 : null,
                  borderColor: item?.video_approved_yn == 'N' ? 'red' : null,
                }}
                onPress={() =>
                  navigation.navigate('VideoDetails', {item: item})
                }>
                <Image
                  source={{uri: item?.video_thumbnail}}
                  width={190}
                  height={190}
                  borderRadius={10}
                />
                {item?.video_public_yn == 'Y' ? (
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: 10,
                      left: 157,
                      borderColor: Colors.favouriteIconColor,
                      borderRadius: 20,
                    }}             
                          onPress={()=>{handleToggleFavorite(item)}}>
              {/* <Image source={likedVideoIds.includes(item?.video_id) ? require('../../assets/images/fav_mark_video.png') : require('../../assets/images/fav_unmark.png')} style={{width:25, height:25}}/> */}
              {item?.status_fav === 1 ? (
            <Image source={require('../../assets/images/fav_mark_video.png')} style={{width:25, height:25}} />
          ) : (
            <Image source={require('../../assets/images/fav_unmark.png')} style={{width:25, height:25}} />
          )}

                    </TouchableOpacity>
                ) : (
                  <Image
                    source={require('../../assets/images/private_video.png')}
                    style={{
                      width: 40,
                      height: 40,
                      position: 'absolute',
                      left: '79%',
                      top: '79%',
                      borderRadius: 5,
                    }}
                  />
                )}

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('VideoViews', {item: item})
                  }
                  style={{position: 'absolute', top: 155, left: 2}}>
                  <EyeIcon
                    name={'eye'}
                    size={25}
                    color={Colors.favouriteIconColor}
                    style={{
                      padding: 7,
                    }}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
              <ToastModal visible={addlikedVideo} label={'Video marked as favorite successfully'}/>
                <ToastModal visible={removelikedVideo} label={'Video is removed from favorite'}/>
              <View
                style={{
                  marginHorizontal: '3%',
                  gap: 0,
                  marginTop: 5,
                  marginLeft:10
                }}>
                <Text
                  style={{
                    color: Colors.black,
                    fontWeight: '700',
                    fontSize: 16,
                  }}>
                  {item?.video_name}
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontWeight: '700',
                    fontSize: 16,
                  }}>
                  {item?.user_name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: Colors.manualDetailsDateColor,
                      fontWeight: '700',
                      fontSize: 16,
                      marginBottom:10
                    }}>
                    {formatDate(item?.video_added_dt)}
                  </Text>
                  {userId == route?.params?.item?.group_admin_id ? (
                    <TouchableOpacity
                      style={{alignSelf: 'center'}}
                      onPress={() => threedotModal(item)}>
                      <ThreeDotsVerticalIcon
                        name={'dots-three-vertical'}
                        size={15}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
          );
        }}
      />
    );
  };

  return (
    <View style={{backgroundColor: Colors.white, flex: 1}}>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.mediumGrey,
          flexDirection: 'row',
          padding: 15,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}>
        <TouchableOpacity
          style={{position: 'absolute', left: 15, zIndex: 1}}
          onPress={() => navigation.goBack()}>
          <Image
            source={backIconImage}
            style={{width: 20, height: 20, tintColor: 'grey'}}
          />
        </TouchableOpacity>

        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: 19,
              color: Colors.lightblue,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {route?.params?.item?.group_name}
          </Text>
        </View>

        <TouchableOpacity
          style={{position: 'absolute', right: 15, zIndex: 1}}
          onPress={() => {
            userId == route?.params?.item?.group_admin_id
              ? openAdminModal()
              : setManualUserModal(true);
          }}>
          <PlusIcon name={'pluscircleo'} size={25} color={Colors.lightblue} />
        </TouchableOpacity>
      </View>

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
            style={{left: 20}}
          />
          <TextInput
            onChangeText={text => searchVideo(text)}
            placeholder="Search By Name"
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
      {groupUsersData?.length > 0 ? (
        <Text
          style={{
            marginTop: 10,
            color: Colors.manuaLUsersText,
            fontSize: 16,
            marginLeft: 5,
          }}>
          Manual Users
        </Text>
      ) : null}

      <View style={{marginLeft: 4, marginRight: 5}}>
        <FlatList
          data={groupUsersData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View style={{marginTop: 10, marginBottom: 10}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ManualUsersDetail', {item: item})
                  }
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    backgroundColor: '#eeeeee',
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    marginRight: 5,
                    borderRadius: 5,
                  }}>
                  <Image
                    source={
                      item?.user_photo_url
                        ? {uri: item?.user_photo_url}
                        : item?.user_photo_url === 'url'
                        ? require('../../assets/images/user.png')
                        : require('../../assets/images/user.png')
                    }
                    style={{
                      width: 30,
                      height: 30,
                      marginTop: 5,
                      borderRadius: 50,
                    }}
                  />
                  <Text>
                    {item?.user_firstname} {item?.user_lastname}
                  </Text>
                  {userId == route?.params?.item?.group_admin_id ? (
                    <TouchableOpacity
                      onPress={() =>
                        deleteManual(item?.group_id, item?.user_id)
                      }>
                      <DeleteIcon
                        name={'delete'}
                        size={20}
                        color={Colors.deleteIconColor}
                      />
                    </TouchableOpacity>
                  ) : null}

                  {}
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>

      <FlatList
        data={groupVideosData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View
              style={{
                gap: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {item?.video_details?.length == 0 ? null : (
                  <Text
                    style={{
                      marginTop: 5,
                      color: Colors.lightblue,
                      fontSize: 16,
                      fontWeight: '500',
                      marginLeft: 14,
                    }}>
                    {item?.category_name}
                  </Text>
                )}

                {item?.video_details?.length > 2 ? (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      width: '20%',
                      alignSelf: 'center',
                    }}
                    onPress={() =>
                      handleViewAll(
                        item?.category_id,
                        item?.category_name,
                        item,
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
                  </TouchableOpacity>
                ) : null}
              </View>

              {renderVideosFlatlist(item)}
            </View>
          );
        }}
      />
      <ManualModal
        visible={removeModalState}
        setModalFalse={setRemoveModalState}
        label={'Are you sure you want to remove user from Manual?'}
        groupUserId={groupUserId}
        groupId={groupId}
        groupUsersData={groupUsersData}
        setGroupUsersData={setGroupUsersData}
        removeManualUser={'removeManualUser'}
      />

      <ManualModal
        visible={deleteVideoConfirmationModal}
        setModalFalse={setDeleteVideoConfirmationModal}
        label={'Are you sure you want to remove this video?'}
        deleteVideo={'deleteVideo'}
        groupId={route.params?.item?.group_id}
        videoId={videosData?.video_id}
      />

      <ManualAdminModal
        visible={manualAdminModal}
        setManualAdminModal={setManualAdminModal}
        groupId={groupId}
        groupCreatedDate={route?.params?.item?.group_created_dt}
        groupName={route?.params?.item?.group_name}
        groupDescription={route?.params?.item?.group_description}
        groupData={route?.params?.item}
      />
      <ManualUserModal
        visible={manualUserModal}
        setManualUserModal={setManualUserModal}
        groupId={route?.params?.item?.group_id}
      />

      <Modal visible={adminVideoModal} transparent={true} animationType="slide">
        <TouchableOpacity
          style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}
          onPress={() => setAdminViewModal(false)}>
          <ImageBackground
            source={require('../../assets/images/dialog_bg.jpeg')}
            style={{
              flex: 1,
              marginTop: '75%',
              marginBottom: '75%',
              paddingVertical: '4%',
              marginLeft: '10%',
              marginRight: '10%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                onPress={() => ViewVideo()}
                style={{
                  backgroundColor: Colors.white,
                  borderRadius: 10,
                  paddingHorizontal: '8%',
                  paddingVertical: '3%',
                }}>
                <Image
                  source={require('../../assets/images/man.png')}
                  style={{width: 30, height: 30, alignSelf: 'center'}}
                />
                <Text>View Video</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removeVideo()}
                style={{
                  paddingHorizontal: '8%',
                  paddingVertical: '3%',
                  backgroundColor: Colors.white,
                  borderRadius: 10,
                }}>
                <Image
                  source={require('../../assets/images/deletebin.png')}
                  style={{width: 30, height: 30, alignSelf: 'center'}}
                />
                <Text>Remove Video</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{
                elevation: 1,
                marginHorizontal: '5%',
                top: 15,
                paddingVertical: '3%',
                backgroundColor: Colors.white,
                borderRadius: 10,
              }}
              onPress={() => rejectVideo()}>
              <Image
                source={require('../../assets/images/reject_video.png')}
                style={{width: 35, height: 35, alignSelf: 'center'}}
              />
              <Text style={{textAlign: 'center'}}>Reject Video</Text>
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={adminApproveModal}
        transparent={true}
        animationType="fade">
        <TouchableOpacity
          style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}
          onPress={() => setAdminApproveModal(false)}>
          <ImageBackground
            source={require('../../assets/images/dialog_bg.jpeg')}
            style={{
              flex: 1,
              marginTop: '75%',
              marginBottom: '75%',
              paddingVertical: '4%',
              marginLeft: '10%',
              marginRight: '10%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                onPress={() => ViewVideo()}
                style={{
                  backgroundColor: Colors.white,
                  borderRadius: 10,
                  paddingHorizontal: '8%',
                  paddingVertical: '3%',
                }}>
                <Image
                  source={require('../../assets/images/man.png')}
                  style={{width: 30, height: 30, alignSelf: 'center'}}
                />
                <Text>View Video</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removeVideo()}
                style={{
                  paddingHorizontal: '8%',
                  paddingVertical: '3%',
                  backgroundColor: Colors.white,
                  borderRadius: 10,
                }}>
                <Image
                  source={require('../../assets/images/deletebin.png')}
                  style={{width: 30, height: 30, alignSelf: 'center'}}
                />
                <Text>Remove Video</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: '4%',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.white,
                  borderRadius: 10,
                  paddingHorizontal: '5%',
                  paddingVertical: '3%',
                }}
                onPress={() => approveVideo()}>
                <Image
                  source={require('../../assets/images/approve_video.png')}
                  style={{width: 30, height: 30, alignSelf: 'center'}}
                />
                <Text>Approve Video</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  paddingHorizontal: '8%',
                  paddingVertical: '3%',
                  backgroundColor: Colors.white,
                  borderRadius: 10,
                }}
                onPress={() => rejectVideo({admin: 'admin'})}>
                <Image
                  source={require('../../assets/images/reject_video.png')}
                  style={{width: 35, height: 35, alignSelf: 'center'}}
                />
                <Text style={{textAlign: 'center'}}>Reject Video</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </Modal>

      <LoaderModal visible={loaderModal} transparent={true} />
      <ToastModal
        visible={toastModal}
        label={'Manual user removed successfully'}
      />
      {noDataFound ?  <View style={{  flex:100, justifyContent: 'center', alignItems:'center', backgroundColor:'white', marginBottom:'20%'}}>
            <FastImage
              style={{width: '25%', height: '25%'}}
              source={require('../../assets/images/empty.gif')}
            />
            <Text style={{color : Colors.black}}>No Record Found</Text>
          </View> : null}
      
    </View>
  );
};

export default ManualDetails;
