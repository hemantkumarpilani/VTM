import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import Colors from '../utils/Colors';
import {deleteManualApi, removeGroupUserApi, removeVideoApi} from '../api/axiosApi';
import {useNavigation} from '@react-navigation/native';
import LoaderModal from './LoaderModal';
import ToastModal from './ToastModal';


const ManualModal = props => {
  // props?.setManualAdminModal(false)
  
  const [loaderModal, setLoaderModal] = useState(false)
  const navigation = useNavigation();
  const handleOkButton = async () => {
    if (props?.removeManualUser) {
      for (let i = 0; i < props?.groupUsersData?.length; i++) {
        if (props?.groupUserId == props?.groupUsersData[i]?.user_id) {
          setLoaderModal(true)

          const response = await removeGroupUserApi(
            props?.groupId,
            props?.groupUserId,
          );
          const temporaryArray = [...props?.groupUsersData];
          temporaryArray.splice(i, 1);
          props?.setGroupUsersData(temporaryArray);
          props?.setModalFalse(false);
          setLoaderModal(false)
          navigation.navigate('MyManuals', {removeUser : 'removeUser'})
          break;
        }
      }
    }

    if (props?.removeManual) {
      setLoaderModal(true)
      const response = await deleteManualApi(props?.groupId);
      props?.setModalFalse(false);
      props?.setManualAdminModal(false)
      setLoaderModal(false)
      navigation.navigate('MyManuals', {deleteManual : 'deleteManual'});
    }

    if(props?.deleteVideo){
      setLoaderModal(true)
      const response = await removeVideoApi(props?.videoId, props?.groupId)
      props?.setModalFalse(false);
      setLoaderModal(false)
      navigation.navigate('MyManuals', {deleteVideo : 'deleteVideo'});
    }
  };

  return (
    <Modal visible={props?.visible} transparent={true}>
      <View
        style={{
          
          flex: 1,
          
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
        >
        <View
          style={{
            borderRadius: 5,
            elevation: 2,
            marginHorizontal: '11%',
            gap: 10,
            paddingVertical: 12,
            paddingHorizontal: 12,
            backgroundColor: Colors.white,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '800',
              color: Colors.black,
            }}>
            Remove
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              color: Colors.manualModalWarningText,
              fontWeight: '400',
            }}>
            {props?.label}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={{
                width: '45%',
                paddingVertical: 5,
                backgroundColor: Colors.lightblue,
                borderRadius: 5,
              }}
              onPress={() => handleOkButton()}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 17,
                  color: Colors.white,
                }}>
                Ok
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props?.setModalFalse(false)}
              style={{
                width: '45%',
                paddingVertical: 5,
                backgroundColor: Colors.lightblue,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 17,
                  color: Colors.white,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <LoaderModal visible={loaderModal} transparent={true}/>
    </Modal>
  );
};

export default ManualModal;
