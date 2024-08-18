import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PlusIcon from 'react-native-vector-icons';
import Colors from '../../utils/Colors';
import {useIsFocused} from '@react-navigation/native';
import {groupApi} from '../../api/axiosApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {myManualsFocus} from '../../Redux/Actions';
import LoaderModal from '../../Components/LoaderModal';
import ManualAdminModal from '../../Components/ManualAdminModal';
import ToastModal from '../../Components/ToastModal';

let response;
const images = [
  require('../../assets/images/user.png'),
  require('../../assets/images/user.png'),
  require('../../assets/images/user.png'),
];
const MyManuals = ({navigation, route}) => {
  console.log(route);
  const [toastModal, setToastModal] = useState(false);
  const isFocuesd = useIsFocused();
  const [loaderModal, setLoaderModal] = useState(false);
  const [addMemberToastModal, setAddMemberToastModal] = useState(false);
  const formatDate = timestamp => {
    const date = new Date(parseInt(timestamp));
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };
  const [manualsData, setManualsData] = useState([]);
  let id;
  const [userid, setUserId] = useState();
  const dispatch = useDispatch();
  const [groupState, setGroupState] = useState(true);
  const [manualDeletedToastModal, setManualDeletedToastModal] = useState(false);
  const [manualUserDeletedToastModal, setManualUserDeletedToastModal] =
    useState(false);
  const [videoAddedInManualToastModal, setVideoAddedInManualToastModal] =
    useState(false);
  const [videoDeletedToastModal, setVideoDeletedToastModal] = useState(false);
  const [manualUpdateToastModal, setManualUpdateToastModal] = useState(false);
  useEffect(() => {
    if (isFocuesd) {
      setLoaderModal(true);
      console.log('useeffect');

      if (route?.params?.createManual) {
        console.log('createmanual');
        setToastModal(true);
        setTimeout(() => {
          setToastModal(false);
          navigation.setParams({
            createManual: null,
          });
        }, 1000);
      }

      if (route?.params?.deleteManual) {
        console.log('deleted manual');
        setManualDeletedToastModal(true);
        setTimeout(() => {
          setManualDeletedToastModal(false);
          navigation.setParams({
            deleteManual: null,
          });
        }, 1000);
      }

      if (route?.params?.removeUser) {
        console.log('remove manual user');
        setManualUserDeletedToastModal(true);
        setTimeout(() => {
          setManualUserDeletedToastModal(false);
          navigation.setParams({
            removeUser: null,
          });
        }, 1000);
      }

      if (route?.params?.addingMembers) {
        setAddMemberToastModal(true);
        setTimeout(() => {
          setAddMemberToastModal(false);
        }, 1000);
        navigation.setParams({
          addingMembers: null,
        });
      }

      if (route?.params?.videosAdded) {
        setVideoAddedInManualToastModal(true);
        setTimeout(() => {
          setVideoAddedInManualToastModal(false);
        }, 1000);
        navigation.setParams({
          videosAdded: null,
        });
      }

      if (route?.params?.deleteVideo) {
        setVideoDeletedToastModal(true);
        setTimeout(() => {
          setVideoDeletedToastModal(false);
        }, 1000);
        navigation.setParams({
          deleteVideo: null,
        });
      }

      if (route?.params?.editManual) {
        setManualUpdateToastModal(true);
        setTimeout(() => {
          setManualUpdateToastModal(false);
        }, 1000);
        navigation.setParams({
          editManual: null,
        });
      }

      dispatch(myManualsFocus(isFocuesd));

      const groupApiResponse = async () => {
        // setLoaderModal(true);
        response = await groupApi();
        setLoaderModal(false);

        if (response.data.groups?.length == 0) {
          setGroupState(false);
        } else {
          setGroupState(true);
          setManualsData(response?.data?.groups);
          setLoaderModal(false);
        }
      };
      groupApiResponse();

      const getUserId = async () => {
        id = await AsyncStorage.getItem('userid');
        setUserId(id);
      };

      getUserId();
    } else {
      dispatch(myManualsFocus(isFocuesd));
    }
  }, [isFocuesd]);

  const editManual = (groupName, groupDescription, groupId) => {
    navigation.navigate('CreateManual', {
      headerExist: 'true',
      manualName: groupName,
      manualDescription: groupDescription,
      groupId: groupId,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        marginLeft: 5,
        marginRight: 5,
      }}>
      <LoaderModal visible={loaderModal} transparent={true} />
      <ToastModal visible={toastModal} label={'Manual created successfully'} />

      <ToastModal
        visible={manualDeletedToastModal}
        label={'Manual deleted successfully'}
      />

      <ToastModal
        visible={addMemberToastModal}
        label={'Members added successfully'}
      />

      <ToastModal
        visible={manualUserDeletedToastModal}
        label={'Manual user removed successfully'}
      />

      <ToastModal
        visible={videoAddedInManualToastModal}
        label={'Videos added to manual successfully'}
      />

      <ToastModal
        visible={videoDeletedToastModal}
        label={'Video removed from manual successfully'}
      />

      <ToastModal
        visible={manualUpdateToastModal}
        label={'Manual updated successfully'}
      />
      {groupState ? (
        <FlatList
          data={manualsData}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                  paddingLeft: 5,
                  paddingVertical: 5,
                  backgroundColor: '#eeeeee',
                  borderRadius: 5,
                }}
                onPress={() =>
                  navigation.navigate('ManualDetails', {item: item})
                }>
                {/* {item?.group_photo_url?.includes('https') ? } */}
                <Image
                  source={
                    item?.group_photo_url
                      ? {uri: item?.group_photo_url}
                      : require('../../assets/images/VTM.png')
                  }
                  style={{width: '50%', height: '100%', borderRadius: 5}}
                />
                <View
                  style={{
                    marginLeft: '5%',
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      width: '40%',
                      color: Colors.black,
                      fontSize: 18,
                      fontWeight: '700',
                    }}>
                    {item?.group_name}
                  </Text>
                  <Text
                    style={{color: '#6d6d6d', fontWeight: '700', fontSize: 16}}>
                    {item?.group_admin_name}
                  </Text>
                  <Text
                    style={{color: '#6d6d6d', fontWeight: '700', fontSize: 16}}>
                    {formatDate(item?.group_created_dt)}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '43%',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      {images.map((image, index) => {
                        return (
                          <View>
                            {index < item?.totalUsers ? (
                              <Image
                                key={index}
                                source={image}
                                style={{width: 25, height: 25, marginTop: 5}}
                              />
                            ) : null}
                          </View>
                        );
                      })}
                      {item?.totalUsers > 3 ? (
                        <Text style={{alignSelf: 'center'}}>
                          {' '}
                          +{+item?.totalUsers - 3}
                        </Text>
                      ) : null}
                    </View>

                    {userid == item?.group_admin_id ? (
                      <View
                        style={{
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                          marginRight: '5%',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            editManual(
                              item.group_name,
                              item.group_description,
                              item.group_id,
                            );
                          }}>
                          <Image
                            source={require('../../assets/images/pencil.png')}
                            style={{width: 15, height: 15}}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
            paddingLeft: '10%',
            paddingRight: '10%',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CreateManual');
            }}
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              backgroundColor: Colors.lightblue,
              width: '110%',
              paddingVertical: 5,
              borderRadius: 7,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 17,
                fontWeight: '500',
                color: Colors.white,
                letterSpacing: 2,
              }}>
              Push this button or " + " sign to create a new manual
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MyManuals;

const styles = StyleSheet.create({});
