import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AddFavourite = async (videoId) => {
  console.log('videoId:', videoId);
  try {
    let token = await AsyncStorage.getItem('sessiontoken');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    };

    let data = JSON.stringify({
      "video_favs": {
        "video_id": videoId,
        "type": "add"
      }
    });
    const response = await axios.post(
      `http://3.21.214.37/admin/api/V1/video/addremovefavouritevideo`,
      data,
      { headers }
    );
   // console.log(response)
    console.log(response.data.message)
    // const likedVideosString = await AsyncStorage.getItem('likedVideos');
    // let updatedLikedVideos = [];
    // if (likedVideosString !== null) {
    //   updatedLikedVideos = JSON.parse(likedVideosString);
    // }
    // updatedLikedVideos.push(videoId);
    // await AsyncStorage.setItem('likedVideos', JSON.stringify(updatedLikedVideos));
    // console.log('Updated likedVideos:', updatedLikedVideos);
  } catch (error) {
    console.error(error);
  }
};
