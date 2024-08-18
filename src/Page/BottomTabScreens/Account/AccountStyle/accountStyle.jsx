import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../../utils/Colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';




const styles = StyleSheet.create({
   container: {
      backgroundColor: Colors.white,
      flexDirection: 'column'
   },
   userInfocontainer: {
      alignSelf: 'center',
      marginTop: responsiveHeight(8)
   },
   container2: {
      backgroundColor: Colors.lightblue,
      height: responsiveHeight(45),
   },
   nameContainer: {
      fontSize: responsiveFontSize(2.3),
      color: Colors.white,
      textAlign: 'center',
      fontWeight: '800'
   },
   emailContainer: {
      fontSize: responsiveFontSize(1.9),
      color: Colors.white,
      textAlign: 'center'
   },
   container3: {
      backgroundColor: Colors.white,
      height: responsiveHeight(17),
      width: responsiveWidth(90),
      marginTop: responsiveWidth(-15),
      alignSelf: 'center',
      elevation: 4,
      shadowOpacity: 20,
      borderRadius: 10,
      flexDirection: 'row'
   },
   imag: {
      width: 80,
      height: 80,
      borderColor: 'white',
      borderWidth: 1.5,
      borderRadius: 100,
   },
   imagConatainer: {
      alignItems: 'center',
      marginTop: responsiveWidth(1.5),
      marginBottom: responsiveWidth(1.5)
   },
   cameraImgContainer: {
      backgroundColor: '#004672',
      alignSelf: 'center',
      alignItems: 'center', marginTop: responsiveWidth(-6),
      width: responsiveWidth(11),
      height: responsiveHeight(5),
      borderRadius: responsiveWidth(3),
      justifyContent: 'center',
      marginBottom: responsiveWidth(3)
   },
   imgCamera: {
      width: responsiveWidth(7),
      height: responsiveHeight(3.5),
      tintColor: Colors.white
   },
   memberDate: {
      fontSize: responsiveFontSize(1.9),
      color: Colors.white,
      textAlign: 'center',
      fontStyle: 'italic',
      marginBottom: 10
   },
   container4: {
      flexDirection: 'column',
      textAlign: 'center',
      marginTop: responsiveHeight(2.5),
      alignItems: 'center',
      fontWeight: 'bold',
      width: '50%'
   },
   textNoVideos: {
      fontSize: responsiveFontSize(2.2),
      color: 'black'
   },
   container5: {
      flexDirection: 'row'
   },
   videoText: {
      textAlign: 'center'
   },
   numbershowText: {
      color: Colors.lightblue,
      fontSize: responsiveFontSize(2.6),
      marginTop: responsiveHeight(1),
      fontWeight: '600'
   },
   container6: {
      flexDirection: 'column',
      textAlign: 'center',
      fontWeight: 'bold',
      width: '50%',
      marginTop: responsiveHeight(2.5),
      alignItems: 'center'
   },
   container8: {
      flexDirection: 'row',
      backgroundColor: '#f5f6fa',
      height: responsiveHeight(7),
      marginBottom: responsiveWidth(2),
      marginHorizontal: responsiveWidth(5),
      borderRadius: 5,
      alignItems: 'center'
   },
   iconContainer: {
      backgroundColor: '#dbe9f4',
      justifyContent: 'center',
      alignItems: 'center',
      width: responsiveWidth(10),
      height: responsiveHeight(5),
      borderRadius: 17,
      marginHorizontal: responsiveWidth(4)
   },
   text: {
      color: '#707173',
      fontWeight: 'bold',
      fontSize: 15
   },
   icon2: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginHorizontal: responsiveWidth(3)
   },
   modalContent: {
      backgroundColor: 'white',
      width: '86%',
      marginLeft: '8%',
      marginTop: '60%',
      padding: '5%',
      elevation: 10

   },
   modalHeader1: {
      fontSize: 18,
      fontWeight: '500',
      paddingBottom: 10,
      color: 'black',
   },
   modalOptionText: {
      fontSize: 16,
      paddingVertical: 10,
      color: 'black',
   },
   modalOptionTextCancel: {
      fontSize: 16,
      paddingVertical: 10,
      color: 'black',
   },
   container7: {
      flexDirection: 'column',
      marginTop: 9,
   },
   iconImage: {
      width: 20,
      height: 20
   },
   rightArrowCon: {
      width: 12, height: 12, tintColor: '#646566'
   }
});
export default styles;