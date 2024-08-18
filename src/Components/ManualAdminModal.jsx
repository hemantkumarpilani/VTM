import {
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../utils/Colors';
import ManualModal from './ManualModal';
import {deleteManualApi} from '../api/axiosApi';
import {useNavigation} from '@react-navigation/native';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';


const ManualAdminModal = props => {
  const [deleteManualModal, setDeleteManualModal] = useState(false);
  const navigation = useNavigation()

  const deleteManual = async () => {
    // props?.setManualAdminModal(false)
    setDeleteManualModal(true);
    //  props?.setManualAdminModal(false)
  };

  const addVideos = ()=>{
    navigation.navigate('MyVideos', {addVideos : {
      addVideos : 'addVideos',
      groupId : props?.groupId
    }})
  }

  const navigateToAddMemberScreen = () =>{
    props?.setManualAdminModal(false)
    navigation.navigate('AddMembers', {groupData : {
      groupCreatedDate : props?.groupCreatedDate,
      groupDescription : props?.groupDescription,
      groupName : props?.groupName,
      groupId : props?.groupId,
      groupAdminId : props?.group_admin_id
    }})
  }

  return (
    <Modal visible={props?.visible} transparent={true} animationType="none">
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          paddingHorizontal: '2.6%',
          // marginHorizontal:'4%',
          // right:3,
          paddingVertical: responsiveScreenHeight(33),
        }}
        onPress={() => {
          props?.setManualAdminModal(false);
        }}>
        <ImageBackground
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
           
            marginHorizontal: '0%',
            
           
            paddingHorizontal: '2%',
            paddingVertical: '10%',
          
            backgroundColor: Colors.manualModalBackgroundColor,
            gap: 20,
          }}
          source={require('../assets/images/dialog_bg.jpeg')}>
          <View
            style={{
              flexDirection: 'row',
              gap: 20,
              width: '85%',
              marginTop: 25,
              right: 8,
            }}>
            <TouchableOpacity
              style={{
                paddingVertical: 6,
                gap: 7,
                paddingHorizontal: 20,
                backgroundColor: Colors.white,
                borderRadius: 5,
              }}
              onPress={()=>navigateToAddMemberScreen()}
              >
              <Image
                source={require('../assets/images/man.png')}
                style={{width: 30, height: 30, alignSelf: 'center'}}
              />
              <Text style={{color: Colors?.manualModalTextColor, fontSize: 16}}>
                Add Members
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>addVideos()}
              style={{
                paddingVertical: 6,
                gap: 7,
                paddingHorizontal: 30,
                backgroundColor: Colors.white,
                borderRadius: 5,
              }}>
              <Image
                source={require('../assets/images/multimedia.png')}
                style={{width: 30, height: 30, alignSelf: 'center'}}
              />
              <Text style={{color: Colors?.manualModalTextColor, fontSize: 16}}>
                Add Videos
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', gap: 20, width: '85%', right: 8}}>
            <TouchableOpacity
            onPress={()=>{props?.setManualAdminModal(true);}}
              style={{
                paddingVertical: 6,
                gap: 7,
                paddingHorizontal: 20,
                alignSelf: 'center',
                backgroundColor: Colors.manualAdminModalDisableButtonColor,
                borderRadius: 5,
              }}
              // disabled={true}
              >
              <Image
                source={require('../assets/images/hand.png')}
                style={{width: 30, height: 30, alignSelf: 'center'}}
              />
              <Text style={{color: Colors?.manualModalTextColor, fontSize: 16}}>
                Leave Manual
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 6,
                gap: 7,
                paddingHorizontal: 20,
                left: 2,
                backgroundColor: Colors.white,
                borderRadius: 5,
              }}
              onPress={() => {
                 deleteManual();
              }}>
              <Image
                source={require('../assets/images/deletebin.png')}
                style={{width: 30, height: 30, alignSelf: 'center'}}
              />
              <Text style={{color: Colors?.manualModalTextColor, fontSize: 16}}>
                Delete Manual
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <ManualModal
        visible={deleteManualModal}
        setModalFalse={setDeleteManualModal}
        label={'Are you sure you want to delete this Manual?'}
        removeManual={'removeManual'}
        groupId={props?.groupId}
        setManualAdminModal = {props?.setManualAdminModal}
      />
    </Modal>
  );
};

export default ManualAdminModal;

const styles = StyleSheet.create({});
