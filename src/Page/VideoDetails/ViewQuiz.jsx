import { FlatList, Image, ScrollView, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import CustomHeader from '../../Components/CustomHeader'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Colors from '../../utils/Colors'
import Button from '../../Components/Button'
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import CustomAlertModal2 from '../../Components/CustomAlertModal2';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import LoaderModal from '../../Components/LoaderModal';



const arrowimg = require('../../assets/images/back.png')

const ViewQuiz = ({ route }) => {
  const navigation=useNavigation();
  const isFocused = useIsFocused();
  const [quizData,setQuizData]=useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [cancelPressed, setCancelPressed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loaderState, setLoaderState] = useState(false);

  const { videoId } = route.params;
 console.log("videoId",videoId)

 useEffect(() => {
    setLoaderState(true);
    setTimeout(() => {
    setLoaderState(false)
    }, 1000);
  }, [])


  useEffect(()=>{
    fetchQuizData(videoId);
  },[videoId])

  const initializeSelectedOptions = (quizData) => {
    const initialSelectedOptions = {};
    quizData.forEach(item => {
        initialSelectedOptions[item.question_id] = null;
    });
    setSelectedOptions(initialSelectedOptions);
}
const handlesubmit = () => {
    if (correctAnswerCount === quizData.length) {
        setShowModal(true);
    } else {

        setShowModal(true);
    }
}
const handleOptionSelect = (questionId, optionId, correctOptionId) => {
    setSelectedOptions(prevState => ({
        ...prevState,
        [questionId]: optionId,
    }));
    if (optionId === correctOptionId) {
        setCorrectAnswerCount(prevCount => prevCount + 1);
    }
};

  const fetchQuizData = async (videoId) => {
    let token = await AsyncStorage.getItem('sessiontoken');
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        };
        const response = await axios.get(
            `http://3.21.214.37/admin/api/V3/video/questions/view/${videoId}`,
            { headers }
        );
        setLoaderState(false);
        console.log("API DATA--",response.data.videos);
         if (response.status === 200) {
                console.log(response.data.videos)
                setQuizData(response.data.videos);
                initializeSelectedOptions(response.data.videos);
            } else {
                console.error("Failed to close account. Status code: ", response?.status);
            }
        } catch (error) {
            console.error("Error closing account: ", error);
        }
};

const renderItem = ({ item, index }) => (
  <View style={[styles.item, { backgroundColor: index % 2 == 0 ? '#C0C0C0' : '#ffffff' }]}>
      <Text style={styles.text}>{index + 1}. {item.question_name} {console.log(item.question_name)}</Text>
      
      {item.question_option.map((option) => (
          <><View>
              <TouchableOpacity
                  key={option.answer_id}
                  style={styles.optionContainer}
                  onPress={() => handleOptionSelect(item.question_id, option.answer_id, option.is_correct === "Y" ? option.answer_id : null)}
              >
                  <View style={styles.radioCircle}>
                      {selectedOptions[item.question_id] === option.answer_id && <View style={styles.selectedRb} />}
                  </View>
                  <Text style={styles.optionText}>{option.options}</Text>
              </TouchableOpacity>
              {cancelPressed && selectedOptions[item.question_id] === option.answer_id && option.is_correct === "Y" && (
              <View style={styles.feedbackContainer}>
                  <Image source={require('../../assets/images/right.png')} style={styles.icon}/>
                  <Text style={styles.Message}> Awesome,correct answer.</Text>
              </View>
          )}
          {cancelPressed && selectedOptions[item.question_id] === option.answer_id && option.is_correct !== "Y" && (
              <View style={styles.feedbackContainer}>
                  <Image source={require('../../assets/images/wrong.png')} style={styles.icon}/>
                  <Text style={styles.Message}> Oops!!! Try Again...</Text>
              </View>
          )}
          </View>
         
          </>
      ))}
  </View>
);
  
  return (
    <View style={styles.container}>
      <CustomHeader headerTitle={'View Quiz'} require={arrowimg} />
      <View style={styles.container}>
        <FlatList
          data={quizData}
          renderItem={renderItem}
          keyExtractor={item => item.question_id}
        />
        {isFocused && <LoaderModal visible={loaderState} transparent={true} />}
      </View>
      <View style={styles.btnContainer}>
        <View style={styles.btn}>
          <Button label={'Submit'} onPress={handlesubmit}/>
        </View>
      </View>
      <CustomAlertModal2
                visible={showModal}
                message={
                    correctAnswerCount === quizData?.length
                        ? 'Awesome, you have given all answers correct, please click on "Submit" to Submit the quiz'
                        : `Oops!!!, you answered ${quizData?.length - correctAnswerCount} out of ${quizData?.length} questions wrong, do you still want to Submit?`
                }
                onCancel={() => {
                    setShowModal(false);
                    setCancelPressed(true);
                }}
                onSubmit={() => {
                    setShowModal(false);
                    navigation.goBack();
                }}
                allAnswersCorrect={correctAnswerCount === quizData?.length}
            />

    </View>
  )
}

export default ViewQuiz

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ffffff',
  },
  flatList: {
      backgroundColor: '#ffffff',
  },
  selectedRb: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: '#000',
  },
  item: {
      padding: 20,
      borderBottomColor: '#ccc',
  },
  btn: {
      width: responsiveWidth(40),
      marginVertical: responsiveWidth(2)
  },
  btnContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
  },
  text: {
      color: 'black',
      marginBottom: responsiveWidth(4.5),
      fontSize: responsiveFontSize(2.5)
  },
  optionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: responsiveWidth(2),
      marginHorizontal: responsiveWidth(5)
  },
  radioCircle: {
      height: 24,
      width: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
  },
  selectedRb: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: '#000',
  },
  optionText: {
      color: 'black',
      marginBottom: responsiveWidth(4.5),
      fontSize: responsiveFontSize(2.5)
  },
  Message:{
      color:'black'
  },
  icon:{
      height:responsiveHeight(5),
      width:responsiveWidth(5),
      resizeMode:'contain',

  },
  feedbackContainer:{
      flexDirection:'row',
      alignItems:'center'
  }
})