import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import Colors from '../../utils/Colors'




const styles = StyleSheet.create({
    outerContainer : {
        backgroundColor:Colors.white,
        flex:1,   
    },
   imageContainer :{
    alignItems: 'center', marginTop: '20%'
   },
   logoImage :{
    width: 226, height: 110
   },
   forgotPasswordContainer :{
    marginTop: 15
   },
   forGotPasswordText : {
    alignSelf: 'flex-end',
    right: '9%',
    bottom: 7,
    color: Colors.skyblue,
    fontSize: 15,
    fontWeight: '500',
    textDecorationLine: 'underline',
    textDecorationColor: Colors.skyblue,
   },
   buttonContainer :{
    alignSelf: 'center',
    width: '75%',
    left: 15,
    marginTop: 20,
    borderRadius: 7,
   },
   dontHaveAccountText:{
    color: Colors.skyblue,
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'center',
     marginTop: 10,
   },
   signUpText:{
    textDecorationLine: 'underline',
    textDecorationColor: Colors.skyblue,
   }
})

export default styles

