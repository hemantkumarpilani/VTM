import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {uploadImageApi} from '../api/axiosApi';

const ImageModal = props => {
  const openCamera = async () => {
    let options = {
      saveToPhotos: true,
      mediaType: 'photo',
    };
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      props?.setImageModal(false);

      props?.setPicUri(result.assets[0].uri)
      

      const response = await uploadImageApi(result.assets[0].uri);

      console.log('responsesss open camera', response.data)
      props?.setPicUri(response.data.image_url)

      // props?.setTemporaryPicUri(response.data.image_url)
    }
  };

  const openGallery = async () => {
    let options = {
      saveToPhotos: true,
      mediaType: 'photo',
    };
    const result = await launchImageLibrary(options);
    props?.setImageModal(false);
    props?.setPicUri(result.assets[0].uri)
    const response = await uploadImageApi(result.assets[0].uri);

    console.log('responsesss open gallery', response.data)
    
    props?.setPicUri(response.data.image_url)
  };

  return (
    <Modal visible={props?.imageModal} transparent={true} animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}>
        <View
          style={{
            paddingStart: '8%',
            gap: 20,
            paddingVertical: 20,
            marginHorizontal: 20,
            backgroundColor: Colors.white,
          }}>
          <TouchableOpacity>
            <Text
              style={{
                fontWeight: '600',
                color: Colors.black,
                fontSize: 18,
                letterSpacing: 0.5,
              }}>
              Upload Manual Image
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openCamera()}>
            <Text style={{fontSize: 16, color: Colors.black}}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openGallery()}>
            <Text style={{fontSize: 16, color: Colors.black}}>
              Choose from library
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.setImageModal(false)}>
            <Text style={{fontSize: 16, color: Colors.black}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ImageModal;
