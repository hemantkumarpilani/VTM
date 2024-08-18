import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../Components/CustomHeader';
import Colors from '../../utils/Colors';
import SearchIcon from 'react-native-vector-icons/Feather';
import {addUserInGroupApi} from '../../api/axiosApi';
import CheckBox from 'react-native-check-box';
import Button from '../../Components/Button';
import LoaderModal from '../../Components/LoaderModal';
import { useDispatch, useSelector } from 'react-redux';
import { existingMembers } from '../../Redux/Actions';

const usersEmail = {};
let usersEmails;
const AddFromExistingMembers = ({route, navigation}) => {
  const arrowimg = require('../../assets/images/back.png');
  const [isChecked, setIsChecked] = useState({});
  const [usersData, setUsersData] = useState([]);
  const [loaderModal, setLoaderModal] = useState(false)
  const dispatch = useDispatch()
  

  useEffect(() => {
    setLoaderModal(true)

    addUserInGroupApiResponse();
  }, []);

  const searchMember = (text)=>{
    text = text?.toLowerCase()
    const searchData = usersEmails?.filter((element)=> element?.email?.includes(text))
      if(text != ''){
          setUsersData(searchData)
      }
      else{
        setUsersData(usersEmails)
      }
    
  }

  const handleDone = () => {
    const selectedEmails = Object.keys(isChecked).filter(
      email => isChecked[email],
    );
    dispatch(existingMembers(selectedEmails))
    navigation.goBack()
  };

  const addUserInGroupApiResponse = async () => {
    const response = await addUserInGroupApi(route?.params?.groupId);
    for (let i = 0; i < response?.data?.users?.length; i++) {
      usersEmail[response?.data?.users[i]?.email] = false;
    }

    usersEmails = response?.data?.users;
    
    setIsChecked(usersEmail);
    setUsersData(response?.data?.users);
    setLoaderModal(false)
  };
  return (
    <View style={{flex: 1}}>
      <CustomHeader
        headerTitle={'Add From Existing Members'}
        require={arrowimg}
      />
      <View
        style={{marginTop: 10, padding: 10, backgroundColor: Colors.darkGrey}}>
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
            placeholder="Search By Name"
            placeholderTextColor={Colors.mediumGrey}
            onChangeText={(text)=>{searchMember(text)}}
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

      <FlatList
        data={usersData}
        renderItem={({item}) => {
          return (
            <CheckBox
              style={{
                paddingLeft: '3%',
                paddingVertical: '4%',
                borderBottomWidth: 1,
                borderBottomColor: Colors.darkGrey,
              }}
              rightText={item?.email}
              rightTextStyle={{color: Colors.addFromExistingMembersText}}
              isChecked={isChecked[item.email]}
              onClick={() => {
                setIsChecked(previousState => ({
                  ...previousState,
                  [item.email]: !previousState[item.email],
                }));
              }}
            />
          );
        }}
      />
      <View style={{marginVertical: 10, paddingHorizontal: '3%'}}>
        <Button label={'Done'} onPress={handleDone} />
      </View>
      <LoaderModal visible={loaderModal} transparent={true}/>
    </View>
  );
};

export default AddFromExistingMembers;

const styles = StyleSheet.create({});
