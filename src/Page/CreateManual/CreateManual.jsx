import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Colors from '../../utils/Colors';
import CustomTextInput from '../../Components/CustomTextInput';
import Button from '../../Components/Button';
import ErrorModal from '../../Components/ErrorModal';
import ImageModal from '../../Components/ImageModal';
import ImagePicker from 'react-native-image-crop-picker';
import {
  createManualApi,
  editGroupApi,
  uploadImageApi,
} from '../../api/axiosApi';
import CustomHeader from '../../Components/CustomHeader';
import LoaderModal from '../../Components/LoaderModal';
import ToastModal from '../../Components/ToastModal';

const CreateManual = ({navigation, route}) => {
  const arrowimg = require('../../assets/images/back.png');
  const [manualName, setManualName] = useState('');
  const [manualDescription, setManualDescription] = useState('');
  const [updatedManualName, setUpdatedManualName] = useState(
    route?.params?.manualName,
  );
  const [updatedManualDescription, setUpdatedManualDescription] = useState(
    route?.params?.manualDescription,
  );
  const [errorModal, setErrorModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [picUri, setPicUri] = useState('');
  const [loaderModal, setLoaderModal] = useState(false);

  const defaultPic = require('../../assets/images/VTM.png');

  const imageHandle = () => {
    setImageModal(true);
  };
  const createManualHandle = async () => {
    console.log('manualName', manualName.trim());
    console.log('pic uri ', picUri);
    if (manualName == '' || manualName.trim().length == 0) {
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 1500);

      return;
    } else {
      setLoaderModal(true);

      const response = await createManualApi(
        manualName,
        manualDescription,
        picUri,
      );

      if (response.status == 200) {
        setLoaderModal(false);
        navigation.navigate('MyManuals', {createManual: 'createManual'});
      }
    }
  };

  const editManualHandle = async () => {
    const response = await editGroupApi(
      route?.params?.groupId,
      updatedManualName,
      updatedManualDescription,
      picUri,
    );
    if (response?.data?.result == 'success') {
      navigation.navigate('MyManuals', {editManual: 'editManual'});
    }
  };
  return (
    <>
      {route?.params?.headerExist ? (
        <View
          style={{
            flex: 1,
            padding: 20,
            backgroundColor: Colors.white,
          }}>
          <CustomHeader
            headerTitle={'Edit Manual'}
            editManual={'editManual'}
            require={arrowimg}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '5%',
            }}>
            <Image
              source={
                picUri != ''
                  ? {uri: picUri}
                  : require('../../assets/images/VTM.png')
              }
              style={{width: 120, height: 120, borderRadius: 5}}
            />
            <TouchableOpacity
              style={{
                width: '64%',
                alignItems: 'center',
                paddingVertical: 5,
                left: 13,
                backgroundColor: Colors.lightblue,
                borderRadius: 5,
              }}
              onPress={() => imageHandle()}>
              <Text
                style={{
                  textAlign: 'center',
                  letterSpacing: 1.5,
                  fontSize: 17,
                  color: Colors.white,
                  fontWeight: '900',
                }}>
                Manual Image
              </Text>
            </TouchableOpacity>
          </View>
          <CustomTextInput
            manualName={updatedManualName}
            setUpdatedManualName={setUpdatedManualName}
            name={route?.params?.manualName ? '' : 'name'}
          />
          <CustomTextInput
            manualDescription={updatedManualDescription}
            temporaryParam={'temporaryParam'}
            setUpdatedManualDescription={setUpdatedManualDescription}
          />
          <View style={{marginTop: '11%'}}>
            <Button
              label={'Edit Manual'}
              onPress={() => {
                editManualHandle();
              }}
            />
          </View>
          <ErrorModal erroModal={errorModal} createManual={'manual name'} />
          <ImageModal
            imageModal={imageModal}
            setImageModal={setImageModal}
            setPicUri={setPicUri}
          />
        </View>
      ) : (
        <ScrollView
          style={{
            flex: 1,
            padding: 20,
            backgroundColor: Colors.white,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '5%',
            }}>
            <Image
              source={
                picUri != ''
                  ? {uri: picUri}
                  : require('../../assets/images/VTM.png')
              }
              style={{width: 120, height: 120, borderRadius: 5}}
            />
            <TouchableOpacity
              style={{
                width: '64%',
                alignItems: 'center',
                paddingVertical: 5,
                left: 13,
                backgroundColor: Colors.lightblue,
                borderRadius: 5,
              }}
              onPress={() => imageHandle()}>
              <Text
                style={{
                  textAlign: 'center',
                  letterSpacing: 1.5,
                  fontSize: 17,
                  color: Colors.white,
                  fontWeight: '900',
                }}>
                Manual Image
              </Text>
            </TouchableOpacity>
          </View>
          <CustomTextInput
            manualName={manualName}
            setManualName={setManualName}
            name={'name'}
          />
          <CustomTextInput
            manualDescription={manualDescription}
            setManualDescription={setManualDescription}
            description={'description'}
          />
          <View style={{marginTop: '11%'}}>
            <Button
              label={'Create Manual'}
              onPress={() => {
                createManualHandle();
              }}
            />
          </View>
          <ErrorModal erroModal={errorModal} createManual={'manual name'} />
          <ImageModal
            imageModal={imageModal}
            setImageModal={setImageModal}
            setPicUri={setPicUri}
            picUri={picUri}
          />
          <LoaderModal visible={loaderModal} transparent={true} />
        </ScrollView>
      )}
    </>
  );
};

export default CreateManual;
