import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RemoveFavourite = async (videoId) => {
    console.log('Removing favorite for videoId:', videoId);
    try {
        let token = await AsyncStorage.getItem('sessiontoken');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      };
  
      let data = JSON.stringify({
        "video_favs": {
          "video_id": videoId,
          "type": "remove"
        }
      });
      const response = await axios.post(
        `http://3.21.214.37/admin/api/V1/video/addremovefavouritevideo`,
        data,
        { headers }
      );
  
      console.log(response.data.message);
  
    
    //   if (likedVideos) {
    //     const updatedLikedVideos = likedVideos.filter(id => id !== videoId);
    //     setLikedVideos(updatedLikedVideos);
    //     console.log('Updated likedVideos:', updatedLikedVideos);
    //     await AsyncStorage.setItem('likedVideos', JSON.stringify(updatedLikedVideos));
    //   }
    } catch (error) {
      console.error(error);
    }
  };
  