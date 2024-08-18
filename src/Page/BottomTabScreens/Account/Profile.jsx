
import React, { useState, useEffect } from 'react';
import { Image, TextInput, ScrollView, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Button from '../../../Components/Button';
import Colors from '../../../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ToastModal from '../../../Components/ToastModal';
import CustomErrorModal from '../../../Components/CustomErrorModal';


const arrowimg = require('../../../assets/images/back.png');
const profileimg = require('../../../assets/images/profilesimg.jpg');
const profuser = require('../../../assets/images/profile-user.png')

const Profile = ({ route, navigation }) => {
  const { userInfo } = route.params;

  const [firstName, setFirstname] = useState(userInfo?.user?.user_firstname);
  const [lastName, setLastName] = useState(userInfo?.user?.user_lastname);
  const [email, setEmail] = useState(userInfo?.user?.email);
  const [firstNameFocused, setFirstnameFocused] = useState('');
  const [lastNameFocused, setLastNameFocused] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [loaderModal, setLoaderModal] = useState(false);
  const [toastModal, setToastModal] = useState(false);
  const [errorModal ,setErrorModal]= useState(false);
  const [messageErrorModal,setMessageErrorModal]=useState(false);


   const handleEditUser=async()=>{
     
      if(firstName === '' || firstName?.trim(' ')?.length ==0){
         setErrorModal(true);
         setMessageErrorModal('Please enter first name');
         setTimeout(()=>{
          setErrorModal(false)
         },1500)
         return;
      }
       if(lastName === '' || lastName?.trim(' ')?.length ==0){
        setErrorModal(true);
        setMessageErrorModal('Please enter last name');
        setTimeout(() => {
          setErrorModal(false)
        }, 1500)
        return;
       }
      
        try{
          let token= await AsyncStorage.getItem('sessiontoken');
          headers={
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + token,
          }
          let data=JSON.stringify({
            users: {
              user_firstname: firstName,
              user_lastname: lastName,
            }
          });

          const response=await axios.post('http://3.21.214.37/admin/api/V1/general/editUser',
               data,
               {headers}
          );
         console.log('profile',response);
         const updatedUserInfo = response.data.user;

        
         setToastModal(true);
         setTimeout(() => {
          setToastModal(false);
          navigation.navigate('Account', { updatedUserInfo });
         }, 1500)
       //  navigation.navigate('Account', { updatedUserInfo });
        } catch(error){
          console.error('Error fetching user info:', error);
          console.log('Error response:', error.response);
        }

   }


  const handleFirstNameFocus = () => {
    setFirstnameFocused(true);
  }

  const handleLastNameFocus = () => {
    setLastNameFocused(true);
  }

  const handleEmailFocus = () => {
    setEmailFocused(true);
  };

  useEffect(() => {
    setLoaderModal(true);
    setTimeout(() => {
      setLoaderModal(false);
    }, 900)
  }, [])

  return (

    <View style={styles.keyboardAvoidingView} behavior='padding'>
    
        <View
          style={styles.container}>
          <View>
            <CustomHeader headerTitle={'My Profile'} require={arrowimg} />
          </View>
          <View style={styles.imgCon}>
            <Image source={profileimg} style={styles.img} />
          </View>
          <View style={styles.textInputContainer}>
            <View style={styles.container1}>
              <Image source={profuser} style={styles.img2} />
              <Text style={[styles.placeholder, styles.placeholderText, { color: firstNameFocused ? '#007ac2' : 'gray' }]}>First Name</Text>
              <TextInput style={[styles.textInput, { borderColor: firstNameFocused ? '#007ac2' : 'gray' },{ borderWidth: firstNameFocused ? 2 : 1 }]}
               placeholderTextColor='gray'
                onChangeText={setFirstname}
                value={firstName}
                onFocus={handleFirstNameFocus}
                onBlur={() => setFirstnameFocused(false)}
              />
            </View>
            <View style={styles.container1}>
              <Image source={profuser} style={styles.img2} />
              <Text style={[styles.placeholder, styles.placeholderText, { color: lastNameFocused ? '#007ac2' : 'gray' }]}>Last Name</Text>
              <TextInput  style={[styles.textInput, { borderColor: lastNameFocused ? '#007ac2' : 'gray' },{ borderWidth: lastNameFocused ? 2 : 1 }]}
                placeholderTextColor='gray'
                onChangeText={setLastName}
                value={lastName}
                onFocus={handleLastNameFocus}
                onBlur={() => setLastNameFocused(false)}
              />
            </View>
            <View style={styles.container1}>
              <Image style={styles.img2} source={require('../../../assets/images/email.png')} />
              <Text style={[styles.placeholder, styles.placeholderText, { color: emailFocused ? '#007ac2' : 'gray' }]}>Email</Text>
              <TextInput s style={[styles.textInput, { borderColor: emailFocused ? '#007ac2' : 'gray' }]} placeholderTextColor='gray'
                onChangeText={setEmail}
                value={email}
                onFocus={handleEmailFocus}
                onBlur={() => setEmailFocused(false)}
                editable={false}
              />
            </View>
            <View
              style={styles.submitButton}>
              <Button label={'Submit'} onPress={handleEditUser}/>
            </View>
            <ToastModal visible={toastModal} label={'User Profile Updated successfully'} />
            <CustomErrorModal isVisible={errorModal} message={messageErrorModal} />
            <View
              style={styles.submitButton}>
              <Button label={'Close Account'} onPress={() => navigation.navigate('CloseAccount')} />
            </View>
          </View>

        </View>

  
    </View>
  );
};

export default Profile;


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: responsiveHeight(100)
  },
  imgCon:
  {
    alignItems: 'center',
    top: responsiveHeight(6)
  },
  img: {
    height: responsiveHeight(23),
    width: responsiveWidth(75),
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  img2: {
    height: 25,
    width: 25
  },
  textInputContainer: {
    alignSelf: 'center',
    top: responsiveHeight(8),
    width: '90%'
  },
  submitButton: {
    alignSelf: 'center',
    width: '81%',
    top: responsiveHeight(3),
    marginBottom: responsiveWidth(5),
    left: 3
  },
  placeholder: {
    position: 'absolute',
    left: 14,
    top: -20,
    fontSize: 16,
    color: 'gray',
    backgroundColor: 'white',
    paddingHorizontal: 5,
    zIndex: 1,
  },
  placeholderText: {
    marginTop: 20,
    marginLeft: 35,
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    opacity: 2
  },
  textInput: {
    borderWidth: 1,
    opacity: 1,
    width: '80%',
    margin: 10,
    borderRadius: 5,
    padding: 12,
    color: 'black'
  },
})
