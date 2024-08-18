import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React,{useState} from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Button from '../../../Components/Button';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderModal from '../../../Components/LoaderModal';
import Colors from '../../../utils/Colors';

// const clsaccimg = require('../../../assets/imagezs/closeAccount.png')
// const clsaccimg=require('../../../assets/images/closeAccount.png');

const CloseAccount = () => {
    const navigation = useNavigation();
    const[loderModal,setLoaderModal]=useState(false);
    // account has been closed

    const handleCloseAccount = async () => {
        console.log("Inside handleClose Account")
        try{
        let token = await AsyncStorage.getItem('sessiontoken');
       
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
         };

        let data = JSON.stringify({
            "account_closed_yn": "Y"
        });
        const response=await axios.post('http://3.21.214.37/admin/api/V1/general/closeaccount',
          data,
          {headers}
        );
        console.log(response)
        console.log(response.data.result);
        console.log(response.data);
        if(response.data.result==='success'){
            setLoaderModal(true);
            await AsyncStorage.removeItem('sessiontoken');

            navigation.navigate('Login',{AccountClosed : 'Account closed'});
        }   else{
            alert('You can not delete your account as you are manual admin for some manuals. If you want to delete your account you need to assign someone else as a manual admin...')
        }
    } catch (error) {
        console.log(error);
    }
}


    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image source={require('../../../assets/images/closeaccount.jpg.jpg')} style={styles.img} /> 
            </View>
            <View style={styles.textCon}>
                <Text style={styles.textStyle}>Are you sure you want to close your account? Once you close your account,all
                    of your videos,manuals will disappear from the face of the internet
                </Text>
            </View>
            <View style={styles.buttonCon}>
            <View style={styles.buttonContainer2}>
                    <Pressable style={styles.buttonCon2} onPress={handleCloseAccount}>
                        {console.log('Inside handle Close 3')}
                    <Text style={styles.buttonText}>Close Account</Text>
                      </Pressable>
                    </View>
                <LoaderModal visible={loderModal} transparent={true} />
                <View style={styles.buttonContainer1}>
                    <View >
                    <Pressable style={styles.buttonCon1} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>I changed My Mind</Text>
                      </Pressable>
                    </View>
                    </View>

            </View>
        </View>
    )
}

export default CloseAccount

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
      //  height: responsiveHeight(100),
        backgroundColor: '#fafafa',
        flex:1,
    },
    imgContainer: {
        alignSelf: 'center',
        top: responsiveHeight(15)
    },
    textStyle: {
        textAlign: 'center',
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
       // color: 'black',
        marginHorizontal: '3%'
    },
    img: {
        height: responsiveHeight(40),
        width: responsiveWidth(85)
    },
    textCon: {
        height: '45%',
        justifyContent: 'flex-end'
    },
    buttonCon: {

        flexDirection: 'row',
        width: '90%',
        marginTop:'2%'
  
    },
    buttonText:{ 
        color: Colors.white,
        fontWeight: '900',
        fontSize: 16,
        letterSpacing: 2,
        textAlign:'center'
    },
    buttonCon1:{
        height:60,
        paddingTop:15,
    },
    buttonContainer1:{
        backgroundColor:Colors.lightblue,
        borderRadius:10,
        width:'45%' 
    },
    buttonCon2:{
        height:60,
        paddingTop:10,
        marginTop: 8
    },
    buttonContainer2:{
        backgroundColor:Colors.lightblue,
        borderRadius:10,
        width:'45%',
        marginHorizontal:20 
    }
})