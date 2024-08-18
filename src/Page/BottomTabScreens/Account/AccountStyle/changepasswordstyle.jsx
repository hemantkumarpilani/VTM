import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../../utils/Colors';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        height: responsiveHeight(100)
    },
    imgCon:
    {
        alignItems: 'center',
        top: responsiveHeight(8)
    },
    img: {
        height: responsiveHeight(23),
        width: responsiveWidth(75),
        //resizeMode:'center'
    },
    textInputContainer: {
        alignSelf: 'center',
        top: responsiveHeight(10),
        width: '95%'
    },
    submitButton: {
        alignSelf: 'center',
        width: '80%',
        top: responsiveHeight(4),
        left: 2
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
      logo: {
        height: 25,
        width: 25
      },
      icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        opacity: 0.5
      },
      iconContainer: {
        position: 'absolute',
        top: 'auto',
        right: '13%',
      },
})
export default styles;