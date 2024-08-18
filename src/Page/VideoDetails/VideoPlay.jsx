
import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import Video from 'react-native-video';
import styles from './VideoStyle/videoplaystyle';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { addVideoView } from '../../api/axiosApi';

const VideoPlayer = ({ route }) => {
  console.log('videoplayer', route)
  const navigation = useNavigation();
  const { videoUrl } = route.params;
  console.log(videoUrl)
  const focused = useIsFocused()
  useEffect(()=>{
    console.log('inside video playernuse effect')
    addVideoViewReponse()

  }, [])

  const addVideoViewReponse = async ()=>{
    const response = await addVideoView(route?.params?.video_id)
    console.log(response.data)
  }

  return (
    <View style={styles.container}>

      <Video
        source={{ uri: videoUrl }}
        style={styles.video}
        controls={true}
        resizeMode="contain"
      />
    </View>
  );
};

export default VideoPlayer;


