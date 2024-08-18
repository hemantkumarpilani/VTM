import { StyleSheet, Text, View,Pressable,Image} from 'react-native'
import React from 'react'
import Colors from '../utils/Colors'
import { useNavigation } from '@react-navigation/native'

const crossback=require('../assets/images/x-mark.png')

const CloseButton = () => {
    const navigation=useNavigation();
  return (
    <View>
      <Pressable onPress={()=>navigation.goBack()}>
        <Image source={crossback} style={styles.imgStyle}/>
        </Pressable>
    </View>
  )
}

export default CloseButton

const styles = StyleSheet.create({
    imgStyle:{height:27,width:27,tintColor:Colors.white}
})