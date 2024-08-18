import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../Components/CustomHeader';
import Colors from '../../utils/Colors';
import Button from '../../Components/Button';
import CustomTextInput from '../../Components/CustomTextInput';
import ErrorModal from '../../Components/ErrorModal';
import CustomErrorModal from '../../Components/CustomErrorModal';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import CrossIcon from 'react-native-vector-icons/Entypo';
import {addGroupUserApi} from '../../api/axiosApi';
import LoaderModal from '../../Components/LoaderModal';
import { existingMembers } from '../../Redux/Actions';

const AddMembers = ({navigation, route}) => {
  const [inviteUser, setInviteUser] = useState('');
  const arrowimg = require('../../assets/images/back.png');
  const [loaderState, setLoaderState] = useState(false)
  const [errorModal, setErrorModal] = useState(false);
  const [errorModall, setErrorModall] = useState(false);
  const isFocuesd = useIsFocused();
  const [emailData, setEmailData] = useState([]);
  const dispatch = useDispatch()

  const reduxData = useSelector(state => state.reducer);

  const formatDate = timestamp => {
    const date = new Date(parseInt(timestamp));
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const addFromExistingMembers = () => {
    navigation.navigate('AddFromExistingMembers', {
      groupId: route?.params?.groupData?.groupId,
    });
  };

  const deleteUser = removeItem => {
    const userEmailId = emailData?.filter(item => item !== removeItem);
    setEmailData(userEmailId);
  };
  useEffect(() => {
    if (isFocuesd) {
      if (emailData.length > 0) {
        setEmailData(prevData => [...prevData, ...reduxData?.existingMembers]);
      } else {
        setEmailData(reduxData?.existingMembers);
      }
    }
  }, [isFocuesd]);

  const inviteMembers = async () => {
    if (emailData.length == 0) {
      if (inviteUser == '') {
        setErrorModal(true);
        setTimeout(() => {
          setErrorModal(false);
        }, 1000);
        return;
      }

      return;
    }

    const usersEmail = emailData.map((num, index) => {
      const key = 'user_email';
      const obj = {[key]: num};
      return obj;
    });

    const response = await addGroupUserApi(
      route?.params?.groupData?.groupId,
      usersEmail,
    );
    if (response?.data?.result == 'success') {
      dispatch(existingMembers([]))
      setLoaderState(true)
      setTimeout(() => {
        setLoaderState(false)

        navigation.navigate('MyManuals', {addingMembers : 'addingMembers'});
      }, 2000);
      
    }
  };

  const addMember = () => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (emailRegex.test(inviteUser)) {
      setEmailData(prevData => [...prevData, inviteUser]);
      setInviteUser('');
      return;
    }
    if (inviteUser == '') {
      console.log('invite user')
      setErrorModall(true);
      setTimeout(() => {
        setErrorModall(false);
      }, 1000);
      return;
    }

    if (inviteUser != '') {
      setErrorModall(true);
      setTimeout(() => {
        setErrorModall(false);
      }, 1000);
      return;
    }
  };
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: Colors?.white}}>
      <CustomHeader headerTitle={'Add Members'} require={arrowimg} />
      <View
        style={{
          borderBottomWidth: 1,
          backgroundColor: Colors.addMembersLogoBackGroundColor,
          transform: [{rotate: '2deg'}],
          paddingVertical: 5,
          alignItems: 'center',
          marginTop: 2,
          borderBottomColor: Colors.addMembersImageViewBottomWidth,
        }}>
        <Image
          source={require('../../assets/images/app_icon.png')}
          style={{width: 120, height: 120, borderRadius: 6075}}
        />
      </View>
      <View
        style={{
          // borderWidth: 1,
          paddingHorizontal: '2%',
          marginTop: '5%',
          gap: 5,
        }}>
        <Text
          style={{
            color: Colors.addMembersText,
            fontSize: 16,
            fontWeight: '400',
          }}>
          {formatDate(route?.params?.groupData?.groupCreatedDate)}
        </Text>
        <Text style={{fontWeight: '700', color: Colors.black, fontSize: 16}}>
          {route?.params?.groupData?.groupName}
        </Text>
        {route?.params?.groupData?.groupDescription ? (
          <Text
            style={{
              color: Colors.addMembersText,
              fontSize: 16,
              fontWeight: '400',
            }}>
            {route?.params?.groupData?.groupDescription}
          </Text>
        ) : null}

        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../../assets/images/edit.png')}
            style={{width: 25, height: 25}}
          />
          <Text
            style={{
              textAlignVertical: 'center',
              color: Colors.addMembersText,
              fontSize: 16,
              fontWeight: '400',
            }}>
            Add more users
          </Text>
        </View>
      </View>
      <View style={{marginTop: '2%', paddingHorizontal: '2%'}}>
        <Button
          label={'Add From Existing Members'}
          temporaryProp={'Add Members'}
          onPress={addFromExistingMembers}
        />
      </View>
      <View
        style={{
          //   borderWidth: 1,
          marginHorizontal: '2%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <CustomTextInput
          InviteUser={'InviteUser'}
          inviteUser={inviteUser}
          setInviteUser={setInviteUser}
        />
        <Button
          label={'Add'}
          add={'add'}
          particularStyle={'particularStyle'}
          onPress={addMember}
        />
      </View>
      {emailData?.length > 0 ? (
        <View style={{}}>
          <FlatList
            data={emailData}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    // borderWidth: 1,
                    marginHorizontal: '3%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: '1%',
                    paddingHorizontal: '1%',
                    backgroundColor: Colors?.lightblue,
                    marginTop: '2%',
                  }}>
                  <Text
                    style={{width: '70%', fontSize: 16, color: Colors?.white}}>
                    {item}
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginRight: '1%',
                      alignSelf: 'center',
                      borderWidth: 1,
                    }}
                    onPress={() => deleteUser(item)}>
                    <CrossIcon name={'cross'} size={20} color={'white'} />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      ) : null}
      <View
        style={{marginTop: '2%', paddingHorizontal: '2%', marginBottom: '4%'}}>
        <Button
          label={'Invite Members'}
          temporaryProp={'Add Members'}
          onPress={inviteMembers}
        />
      </View>
      <CustomErrorModal
        isVisible={errorModal}
        message={'Please add email id of the person you want to invite'}
      />

      <ErrorModal
        erroModal={errorModall}
        setErrorModal={setErrorModall}
        email={inviteUser}
      />
      <LoaderModal visible={loaderState} transparent={true}/>
    </ScrollView>
  );
};

export default AddMembers;

const styles = StyleSheet.create({});
