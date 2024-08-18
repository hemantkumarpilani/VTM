import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';

const styles = StyleSheet.create({
    outerContainer :{
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        marginBottom:5,
        borderBottomColor: Colors.mediumGrey,
    }, 
    
    image :{
        height: 25, width: 25, tintColor: 'grey', marginLeft:10
    },
    text : {
        fontSize: 19,
        color: Colors.lightblue,
        fontWeight: 'bold',
    }
});

export default styles;
