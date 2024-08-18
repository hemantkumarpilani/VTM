
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Pressable, ImageBackground } from 'react-native'
import React,{useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import styles from '../../VideoDetails/VideoStyle/videodetailsstyles';


const arrowimg = require('../../../assets/images/back.png')
const playimg = require('../../../assets/images/play.png')

const VideoDetails1 = ({ route }) => {
  const navigation = useNavigation();
  console.log('videoDetails',route.params)
  const {item} = route.params;
  const [isPlaying, setIsPlaying] = useState(false);

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
    navigation.navigate('VideoPlay', { videoUrl:item?.video_file_url });
  }

  const handlequiz = () => {
    navigation.navigate('ViewQuiz', { videoId: item?.video_id })
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.Con}>
          <TouchableOpacity onPress={() => navigation.navigate('BottomTabNavigation')}>
            <Image source={arrowimg} style={styles.imagearrow} />
          </TouchableOpacity>

        </View>
        <View style={styles.container2}>
       <View style={{alignSelf:'flex-end',marginHorizontal:5,top:15}}>
        <Pressable onPress={()=>navigation.navigate('EditVideo')}>
        <Image source={require('../../../assets/images/pencil.png')} style={{height:18,width:18,tintColor:'white'}}/>
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
          <Pressable onPress={() => handlequiz()}>
            <Text style={styles.text}>View Quiz</Text>
          </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default VideoDetails1;

