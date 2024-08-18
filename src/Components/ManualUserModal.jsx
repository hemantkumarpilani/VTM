import {
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';

const ManualUserModal = props => {
  const navigation = useNavigation()
  return (
    <Modal visible={props?.visible} transparent={true}>
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          paddingHorizontal: '5%',
          paddingVertical: responsiveScreenHeight(33),
        }}
        onPress={()=>props?.setManualUserModal(false)}
        >
        <ImageBackground
          style={{
            flex: 1,
            justifyContent: 'center',
            // marginHorizontal: '7%',
            // marginVertical: '75%',
          }}
          source={require('../assets/images/dialog_bg.jpeg')}>
          <View style={{gap: 20}}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.white,
                marginHorizontal: '5%',
                paddingVertical: '2%',
                borderRadius: 8,
              }}
              onPress={()=>navigation.navigate('MyVideos', {addVideos : {
                addVideos : 'addVideos',
                groupId : props?.groupId
              }})}
              >
              <Image
                source={require('../assets/images/multimedia.png')}
                style={{width: 30, height: 30, alignSelf: 'center'}}
              />
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors?.manualModalTextColor,
                  fontSize: 16,
                }}>
                Add Videos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.white,
                marginHorizontal: '5%',
                paddingVertical: '2%',
                borderRadius: 8,
              }}>
              <Image
                source={require('../assets/images/hand.png')}
                style={{width: 30, height: 30, alignSelf: 'center'}}
              />
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors?.manualModalTextColor,
                  fontSize: 16,
                }}>
                Leave Manual
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Modal>
  );
};

export default ManualUserModal;

const styles = StyleSheet.create({});
