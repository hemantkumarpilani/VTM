
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Pressable, ImageBackground } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import styles from './VideoStyle/videodetailsstyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const arrowimg = require('../../assets/images/back.png')
const playimg = require('../../assets/images/play.png')

const VideoDetails = ({ route }) => {
  const navigation = useNavigation();
  const {item} = route.params;
  console.log('videodata', item)
  const [isPlaying, setIsPlaying] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    const getUserID = async () => {
        try {
          let user_id = await AsyncStorage.getItem('userid');
            setLoggedInUserId(user_id);
            
            console.log("id of user ", user_id);
            console.log("user id Video Creater", item?.user_id_creator);
        } catch (error) {
            console.error('Error retrieving user ID:', error);
        }
    };

    getUserID();
}, []);

  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',

    };
    return date.toLocaleDateString('en-US', options);
  };
  
  const playVideoFullScreen = () => {
    navigation.navigate('VideoPlay', { videoUrl:item?.video_file_url, video_id : item?.video_id });
  }

  const handlequiz = () => {
    navigation.navigate('ViewQuiz', { videoId: item?.video_id })
  }

  const viewResults = () => {
    navigation.navigate('ViewQuizResult',{ videoId: item?.video_id });
}

const navigateToEditVideo = (item) => {
  navigation.navigate('EditVideo', { item });
};

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.Con}>
          <TouchableOpacity style={{}}onPress={() => navigation.navigate('BottomTabNavigation')}>
            <Image source={arrowimg} style={styles.imagearrow} />
          </TouchableOpacity>

        </View>
        <View style={styles.container2}>
     
        <View style={styles.editButton}>
        <Pressable onPress={()=>{navigateToEditVideo(item)}}>
        {loggedInUserId == item.user_id_creator &&
        <Image source={require('../../assets/images/pencil.png')} style={styles.editImgPencil}/>
        }
        </Pressable>
        
       </View>
          <View style={styles.communityContainer}>
            <Text style={styles.communityText}>Community</Text>
          </View>

          <View style={styles.videoNameContainer}>
            <Text style={styles.videoNameText}>{item?.video_name}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>Created By: {item?.user_name}</Text>
            <Text style={styles.detailsText}>Created On: {formatDate(item?.dt_created)}</Text>
            <Text style={styles.detailsText}>Category: {item?.category_name}</Text>
            <Text style={styles.detailsText}>Subcategory: {item?.subcategory_name}</Text>
            {item?.video_public_yn == 'N' ?  null :  <Text style={styles.detailsText}>Tags: {item?.tag_name}</Text>}
          
          </View>
          <View style={styles.checkListContainer}>
            <Text style={styles.checkListText}>Check List</Text>
          </View>
          <View style={styles.checkListTextContainer}>
            <Text style={styles.detailsText}>{item?.video_description}</Text>
          </View>
        </View>
        <View style={styles.container3}>
          <View>
         
            <ImageBackground source={{ uri: item?.video_thumbnail }} style={styles.image} >
              <View style={styles.imgBckgd}>
              <Pressable onPress={playVideoFullScreen}>
                <Image style={styles.play} source={playimg} />
                </Pressable>
                {isPlaying && (
                    <Video
                        source={{ uri: video.video_file_url }}
                        controls={true}
                        resizeMode="contain"
                        onEnd={() => setIsPlaying(false)}
                    />
                )}
              </View>
            </ImageBackground>
          
          </View>
          <View style={styles.textview}>
          {item?.video_quiz_yn === "Y" && (
                    <Pressable onPress={loggedInUserId == item?.user_id_creator ? viewResults : handlequiz}>
                      {console.log('loggedInUserId',loggedInUserId)}
                        <Text style={[styles.text4]}>{loggedInUserId == item?.user_id_creator ? 'View Quiz Result' : 'View Quiz'}</Text>
                    </Pressable>
                )}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default VideoDetails

