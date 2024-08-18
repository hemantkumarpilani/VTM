


import React, { useRef, useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Pressable, FlatList } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import FormData from 'form-data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../../Components/CustomHeader';
import Colors from '../../../utils/Colors';
import Button from '../../../Components/Button';
import CustomErrorModal from '../../../Components/CustomErrorModal';
import ToastModal from '../../../Components/ToastModal';

const arrowimg = require('../../../assets/images/back.png')
const EditVideo = ({ route }) => {
  const { item } = route.params;
  // console.log("item data", item);
  const categoryRef = useRef(null);
  const subcategoryRef = useRef(null);
  const visibilityRef = useRef(null);
  const manualsRef = useRef(null);
  const navigation = useNavigation();
  const [toastModal, setToastModal] = useState(false);
  const [videoName, setVideoName] = useState(item?.video_name);
  const [checkList, setCheckList] = useState(item?.video_description);
  const [selectedCategory, setSelectedCategory] = useState(item?.category_name);
  const [selectedSubcategory, setSelectedSubcategory] = useState(item?.subcategory_name);
  const [selectedVisibility, setSelectedVisibility] = useState(item?.video_public_yn === 'Y' ? 'Community' : 'My Videos');


  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedVisibilities, setSelectedVisibilities] = useState([]);

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [subcategoryModalVisible, setSubcategoryModalVisible] = useState(false);
  const [visibilityModalVisible, setVisibilityModalVisible] = useState(false);


  const categoryOptions = ['--Select Category --', 'Administrative', 'Dental', 'Hygiene', 'Maintenance', 'Other'];

  const subcategoriesByCategory = {
    Administrative: ['--Select Subcategory --', 'Dentrix', 'Eagle Soft', 'Soft Dent', 'Open Dental', 'Easy Dental'],
    Dental: ['--Select Subcategory --', 'Restorative', 'Endodontics', 'Implants', 'Oral Surgery', 'Periodontics', 'Orthodontics', 'Pedodontics', 'Prosthetics', 'Hygiene sub 2'],
    Hygiene: ['--Select Subcategory --', 'Hygiene sub 1'],
    Maintenance: ['--Select Subcategory --', 'maintenance sub 1', 'maintenance sub 2'],
    Other: ['--Select Subcategory --', 'other sub1', 'other sub2'],
  };


  const visibilityOptions = ['-- Select Visibilty --', 'Community', 'My Videos'];

  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isButtonVisible1, setIsButtonVisible1] = useState(false);
  const [isButtonVisible2, setIsButtonVisible2] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [selectedTag, setSelectedTag] = useState();
  const [showWarning, setShowWarning] = useState(false);

  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [messageErrorModal, setMessageErrorModal] = useState('');
  const [erroModal, setErrorModal] = useState(false);

  const [questionList, setQuestionList] = useState([
    {
      question_name: "",
      options: [{ text: '' }, { text: '' }],
    }
  ]);

  const [options, setOptions] = useState([
    { id: 1, text: '' }, // Initial option
  ]);


  const handleTagSelect = (tagNumber) => {
    setSelectedTag(tagNumber);

  };

  const getVisibilityID = (visibility) => {
    const visibilityIDMap = {
      'Y': 'Community',
      'N': 'My Videos'
    };
    return visibilityIDMap[visibility] || null;
  };

  const getCategoryID = (category) => {
    const categoryIDMap = {
      'Administrative': 1,
      'Dental': 2,
      'Hygiene': 3,
      'Maintenance': 4,
      'Other': 5
    };
    return categoryIDMap[category] || null;
  };

  const getSubcategoryID = (subcategory) => {

    const subcategoryIDMap = {
      1: {
        'Dentrix': 1,
        'Eagle Soft': 2,
        'Soft Dent': 3,
        'Open Dental': 4,
        'Easy Dental': 5
      },
      2: {
        'Restorative': 1,
        'Endodontics': 2,
        'Implants': 3,
        'Oral Surgery': 4,
        'Periodontics': 5,
        'Orthodontics': 6,
        'Pedodontics': 7,
        'Prosthetics': 8,
        'Hygiene sub 2': 9
      },
      3: {
        'Hygiene sub 1': 1
      },
      4: {
        'maintenance sub 1': 1,
        'maintenance sub 2': 2
      },
      5: {
        'other sub1': 1,
        'other sub2': 2
      }
    };
    const categoryId = getCategoryID(selectedCategory);
    return subcategoryIDMap[categoryId] ? subcategoryIDMap[categoryId][subcategory] : null;
  };

  const editVideoAPI = async () => {
    let token = await AsyncStorage.getItem('sessiontoken');
    // console.log(token);

    let formData = new FormData();
    formData.append('videourl', item?.video_url);
    console.log('videourl', item?.video_url);
    formData.append('video_name', videoName);
    console.log(videoName)
    formData.append('video_description', checkList);
    console.log(checkList)
    formData.append('category_id', getCategoryID(selectedCategory));
    console.log(selectedCategory)
    formData.append('subcategory_id', getSubcategoryID(selectedSubcategory));
    console.log(selectedSubcategory)
    formData.append('tag_ids', selectedTag);
    console.log(selectedTag)
    formData.append('video_public_yn', getVisibilityID(selectedVisibility));
    console.log("Visibility", selectedVisibility);
    formData.append('video_status', item?.video_status);
    console.log("Status", item?.video_status)
    formData.append('video_id', item?.video_id);
    console.log("Video Id =>", item?.video_id);
    console.log('Before axios method');
    try {

      const response = await axios.post('http://3.21.214.37/admin/api/V1/video/editVideo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + token,
        },
      });
      console.log('Video Edited successfully:', response.data);
    //  console.log('Video uploaded successfully:', response.data);
      console.log("Video ID => ",response.data?.video?.video_id);
      console.log("Video ID => ",response.data.video.video_id);

      // setToastModal(true)
      // setTimeout(()=>{
      //   setToastModal(false)
      // })
        const videoId = response.data?.video?.video_id;
      // setInvalidCredentials(true);
    //  alert('Video uploaded successfully!');
    setToastModal(true)
      setTimeout(() => {
        navigation.navigate('Home');
        setToastModal(false)
      }, 800);
    } catch (error) {
      console.error('Error Editing video:', error);
    }
    console.log('Post axios method');
  };

 
   


  const handleCancel = () => {
    navigation.navigate('Home');
  };
  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };
  const toggleCheck1 = () => {
    setIsChecked1(!isChecked1);
  };
  const toggleCheck2 = () => {
    setIsChecked2(!isChecked2);
  };
  const toggleButtonVisibility = () => {
    setIsButtonVisible(!isButtonVisible);
  };
  const toggleButtonVisibility1 = () => {
    setIsButtonVisible1(!isButtonVisible1);
    setIsChecked1(!isChecked1);
  };
  const toggleButtonVisibility2 = () => {
    setIsButtonVisible2(!isButtonVisible2);
    setIsChecked2(!isChecked2);
  };
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory('');
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
    setCategoryModalVisible(false);
  };
  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    if (!selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    }
    setSubcategoryModalVisible(false);
  };

  const handleVisibilitySelect = (visibility) => {
    setSelectedVisibility(visibility);
    if (!selectedVisibilities.includes(visibility)) {
      setSelectedVisibilities([...selectedVisibilities, visibility]);
    }
    setVisibilityModalVisible(false);
  };



  const handleApiIntegration = async () => {
  
    try {
      const token = await AsyncStorage.getItem('sessiontoken'); // Replace with your authentication token
      console.log(token)
      const data = JSON.stringify({
        "video_id": 318,
        "video_data": questionList.map((question, index) => ({
          "question_name": question.question_name,
          "question_option": question.options.map((option, optionIndex) => ({
            "option_id": optionIndex + 1,
            "sequence": optionIndex + 1,
            "option": option.text,
            "is_correct": option.selected ? "Y" : "N",
            "user_answer": ""
          }))
        }))
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://3.21.214.37/admin/api/V3/video/questions/add',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        data: data
      };

      const response = await axios.request(config);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const addQuestions = () => {
    if (questionList.length < 10) {
      let questionListCopy = [...questionList];
      let object = {
        question_name: "",
        options: [{ text: '', selected: false }, { text: '', selected: false }],
      };
      questionListCopy.push(object);
      setQuestionList(questionListCopy);
    } else {

      console.log("Maximum number of questions reached");
    }
  };

  const onChangeQuestionValue = (text, index, optin) => {
    let questionListCopy = [...questionList];
    questionListCopy[index]['question_name'] = text;
    setQuestionList(questionListCopy);
  };


  const onChangeOptionValue = (text, questionIndex, optionIndex) => {
    let questionListCopy = [...questionList];
    questionListCopy[questionIndex]['options'][optionIndex]['text'] = text;
    setQuestionList(questionListCopy);
  };



  const toggleOptionSelection = (questionIndex, optionIndex) => {
    let questionListCopy = [...questionList];
    questionListCopy[questionIndex]['options'].forEach((option, index) => {
      if (index === optionIndex) {
        questionListCopy[questionIndex]['options'][index]['selected'] = true;
      } else {
        questionListCopy[questionIndex]['options'][index]['selected'] = false;
      }
    });
    setQuestionList(questionListCopy);
  };



  const addOption = (questionIndex) => {
    let questionListCopy = [...questionList];
    if (questionListCopy[questionIndex].options.length < 5) {
      questionListCopy[questionIndex].options.push({ text: '' });
      setQuestionList(questionListCopy);
    } else {

      console.log("Maximum number of options reached");
    }
  };

  const removeOption = (questionIndex, optionIndex) => {
    let questionListCopy = [...questionList];
    questionListCopy[questionIndex].options.splice(optionIndex, 1);
    setQuestionList(questionListCopy);
  };

  const questionRemove = (indexToRemove) => {
    setQuestionList(prevQuestionList => {

      return prevQuestionList.filter((question, index) => index !== indexToRemove);
    });
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View>
        <CustomHeader headerTitle={'Edit Video'} require={arrowimg} />
      </View>
      <View style={[styles.container, { borderWidth: 1, borderRadius: 10 }]}>
        <Image source={{ uri: item?.video_thumbnail }} style={styles.image} />
      </View>
      <View style={styles.editicon}>
        <Image source={require('../../../assets/images/edit-button.png')} style={styles.editing} />
      </View>
      <View style={styles.container2}>
        <View style={styles.container2}>
          <Text style={[styles.placeholder, styles.placeholderText]}>Video Name</Text>
          <TextInput
            style={[styles.textInput, styles.videoNameTextInput]}
            multiline={true}
            onChangeText={setVideoName}
            value={videoName}
          />
        </View>
        <View style={styles.container2}>
          <Text style={[styles.placeholder, styles.placeholderText]}>Check List</Text>
          <TextInput
            style={[styles.textInput, styles.checkListTextinput]}
            multiline={true}
            onChangeText={setCheckList}
            value={checkList}
          />
        </View>
        <View style={styles.categoryContainer}>
          <Text style={[styles.placeholder, styles.placeholderText]}>Category Name</Text>
          <TouchableOpacity style={[styles.textInput, styles.otherTextinput]} onPress={() => setCategoryModalVisible(true)}>
            <Text style={styles.modalText}>{selectedCategory || "--Select Category--"}</Text>
            <Pressable style={styles.dropDownImgCon}>
              <Image source={require('../../../assets/images/dropdown.png')} style={{ width: 15, height: 15, tintColor: 'gray' }} />
            </Pressable>
          </TouchableOpacity>
        </View>
        <View style={styles.subcategoryContainer}>
          <Text style={[styles.placeholder, styles.placeholderText]}>Subcategory</Text>
          <TouchableOpacity style={[styles.textInput, styles.otherTextinput]} onPress={() => setSubcategoryModalVisible(true)}>
            <Text style={styles.modalText}>{selectedSubcategory || "--Select Subcategory--"}</Text>
            <Pressable style={styles.dropDownImgCon}>
              <Image source={require('../../../assets/images/dropdown.png')} style={{ width: 15, height: 15, tintColor: 'gray' }} />
            </Pressable>
          </TouchableOpacity>
        </View>

        <View style={styles.visibilityContainer}>
          <Text style={[styles.placeholder, styles.placeholderText]}>Visibility</Text>
          <TouchableOpacity style={[styles.textInput, styles.otherTextinput]} onPress={() => setVisibilityModalVisible(true)}>
            <Text style={styles.modalText}>{selectedVisibility || "--Select Visibility--"}</Text>
            <Pressable style={styles.dropDownImgCon}>
              <Image source={require('../../../assets/images/dropdown.png')} style={{ width: 15, height: 15, tintColor: 'gray' }} />
            </Pressable>
          </TouchableOpacity>
        </View>
        <View style={[styles.container2, { marginBottom: '17%' }]}>
          <Text style={[styles.placeholder, styles.placeholderText]}>Tag</Text>
          <View style={[styles.tagcon, styles.textInputTag]}>
            <TouchableOpacity onPress={() => { handleTagSelect(1); toggleButtonVisibility1(); toggleCheck1(); }} style={{ marginLeft: '2%', flexDirection: 'row', padding: 5, alignItems: 'center' }}>
              <Image style={{ width: 22, height: 22 }} source={isChecked1 ? require('../../../assets/images/check.png') : require('../../../assets/images/square.png')} />
              <Text style={{ fontSize: 16, color: 'black', marginLeft: 5, fontWeight: '500' }}>Tag 1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { handleTagSelect(2); toggleButtonVisibility2(); toggleCheck2(); }} style={{ marginLeft: '2%', flexDirection: 'row', padding: 5, alignItems: 'center' }}>
              <Image style={{ width: 22, height: 22 }} source={isChecked2 ? require('../../../assets/images/check.png') : require('../../../assets/images/square.png')} />
              <Text style={{ fontSize: 16, color: 'black', marginLeft: 5, fontWeight: '500' }}>Tag 2</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.addQuizMainCon}>

        <TouchableOpacity onPress={() => { toggleButtonVisibility(); toggleCheck(); }} style={styles.addQuizCon}>
          <Image style={styles.imgTag} source={isChecked ? require('../../../assets/images/check.png') : require('../../../assets/images/square.png')} />
          <Text style={styles.tagText}>Add Quiz</Text>
        </TouchableOpacity>

        {isButtonVisible && (
          <View style={styles.addQuestionButton}>
            <Button label={'ADD QUESTION'} onPress={addQuestions} />
            {/* <Button label={'ADD QUESTION'} /> */}




            <>
              {questionList.map((question, index) => (
                <View key={index}>
                  <Text style={styles.questionLabel}>Question {index + 1}</Text>
                  <TextInput
                    placeholder='Enter Question'
                    style={styles.questionInput}
                    value={question.question_name}
                    onChangeText={(text) => onChangeQuestionValue(text, index)}
                  />
                   {index >= 1 && (
                        <TouchableOpacity onPress={() => questionRemove(index)}>
                          <Image
                            source={require('../../../assets/images/crossradio.png')}
                            style={{ width: 18, height: 18, left: '40%' }}
                            resizeMode='cover'
                          />
                        </TouchableOpacity>
                      )}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.questionLabel}> Quiz Options</Text>
                    <Text style={styles.optionLabel2}> Upto 5 Options</Text>
                  </View>
                  {question.options.map((option, optionIndex) => (
                    <View key={optionIndex} style={styles.optionContainer}>
                      <View style={{ flexDirection: 'row' }}>
                        <TextInput
                          style={styles.optionInput}
                          placeholder={`Option ${optionIndex + 1}`}
                          value={option.text}
                          onChangeText={(text) => onChangeOptionValue(text, index, optionIndex)}
                        />
                        <TouchableOpacity onPress={() => toggleOptionSelection(index, optionIndex)}>
                          <Image
                            source={option.selected ? require('../../../assets/images/radio-selected.png') : require('../../../assets/images/radio-unselected.png')}
                            style={styles.imgTag}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        {optionIndex >= 2 && (
                          <TouchableOpacity onPress={() => removeOption(index, optionIndex)}>
                            <Image
                              source={require('../../../assets/images/crossradio.png')}
                              style={styles.imgTag}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        )}
                      </View>

                      {optionIndex === question.options.length - 1 && (
                        <View style={{ width: '50%', alignSelf: 'center' }}>
                          <Button
                            label={"Add Option"}
                            onPress={() => addOption(index)}
                          />
                        </View>
                      )}
                      {/* <Button label={'Edit Quiz'} onPress={()=>handleApiIntegration()}/> */}
                    </View>
                  ))}
                  <Button label={'Edit Quiz'} onPress={handleApiIntegration} />
                </View>
              ))}

            </>
          </View>

        )}





        {isButtonVisible && (
          <View style={{ width: '95%', alignSelf: 'center', marginTop: 5 }}>
            {/* <TextInput
  style={[styles.QuestextInput,]}
  placeholder="Enter your question"
  onChangeText={handleQuestionTextChange} // Call the handler function when text changes
  value={questionText} // Set the value of the text input
/> */}
            {/* Option 1 */}
            <View style={{ flexDirection: 'row', alignItems: 'center', top: '-2%' }}>
              {/* <TextInput
    style={styles.textInputOp}
    placeholder="Option 1"
    onChangeText={handleOption1TextChange} // Call the handler function when text changes
    value={option1Text} // Set the value of the text input
  /> */}
              {/* <TouchableOpacity onPress={() => handleOptionSelect(1)}>
    <Image style={styles.imgTag} source={selectedOption === 1 ? require('../../assets/images/radio-selected.png') : require('../../assets/images/radio-unselected.png')} />
  </TouchableOpacity> */}

            </View>

            {/* Option 2 */}
            <View style={{ flexDirection: 'row', alignItems: 'center', top: '-5%' }}>
              {/* <TextInput
    style={styles.textInputOp}
    placeholder="Option 2"
    onChangeText={handleOption2TextChange} // Call the handler function when text changes
    value={option2Text} // Set the value of the text input
  /> */}
              {/* <TouchableOpacity onPress={() => handleOptionSelect(2)}>
    <Image style={styles.imgTag} source={selectedOption === 2 ? require('../../assets/images/radio-selected.png') : require('../../assets/images/radio-unselected.png')} />
  </TouchableOpacity> */}

            </View>
            <View style={{ width: '60%', alignSelf: 'center', top: '-5%' }}>
              {/* <Button label={'Add Option'} onPress={() => addOption()} /> */}
              {/* <Button label={'Add Option'} /> */}
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', width: '100%', justifyContent: 'space-between', marginBottom: 10, marginVertical: 20 }}>
              <View style={{ width: '45%', left: 10 }}>
                {/* <Button label={'Save'} onPress={() => uploadVideos()} /> */}
              </View>
              <CustomErrorModal isVisible={erroModal} message={messageErrorModal} />
              <View style={{ width: '45%', right: 10 }}>
                {/* <Button label={'Cancel'}  onPress={() => handleCancel()} /> */}
              </View>
            </View>
          </View>
        )}

      </View>


      <View style={{ flexDirection: 'row', alignSelf: 'center', width: '100%', justifyContent: 'space-between', marginBottom: 10, marginVertical: 20 }}>
        <View style={{ width: '45%', left: 10 }}>
          <Button label={'Save'} onPress={() => editVideoAPI()} />
        </View>
        <View style={{ width: '45%', right: 10 }}>
          <Button label={'Cancel'} onPress={() => handleCancel()} />
        </View>
      </View>
      <ToastModal visible={toastModal} label={'Video upload successfully'}  />
      <Modal
        animationType="slide"
        transparent={true}
        visible={categoryModalVisible}
        onRequestClose={() => {
          setCategoryModalVisible(false);
        }}
      >
        <View style={[styles.centeredView, styles.categoryModalView]}>
          <View style={styles.modalView}>
            {categoryOptions.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryOption} onPress={() => handleCategorySelect(category)}>
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={subcategoryModalVisible}
        onRequestClose={() => {
          setSubcategoryModalVisible(false);
        }}
      >
        <View style={[styles.centeredView, styles.subcategoryModalView]}>
          <View style={styles.modalView}>
            {subcategoriesByCategory[selectedCategory]?.map((subcategory, index) => (
              <TouchableOpacity key={index} style={styles.categoryOption} onPress={() => handleSubcategorySelect(subcategory)}>
                <Text style={styles.categoryText}>{subcategory}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibilityModalVisible}
        onRequestClose={() => {
          setVisibilityModalVisible(false);
        }}
      >
        <View style={[styles.centeredView, styles.visibilityModalView]}>
          <View style={styles.modalView}>
            {visibilityOptions.map((visibility, index) => (
              <TouchableOpacity key={index} style={styles.categoryOption} onPress={() => handleVisibilitySelect(visibility)}>
                <Text style={styles.categoryText}>{visibility}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

export default EditVideo;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white'
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: '3%'
  },
  tagcon: {
    position: 'absolute',
    flexDirection: 'row',
    width: '70%',
    alignItems: 'center'
  },
  buttonContainer: {
    width: '59%',
    alignSelf: 'center',
    left: '17%'
  },
  container2: {
    flexDirection: 'column',
    width: '100%',
    marginTop: '1%'
  },

  checkListTextinput: {
    height: 80,
    color: 'black',
    fontSize: 16,
    fontWeight: '400'
  },
  videoNameTextInput: {
    height: 65,
    color: 'black',
    fontSize: 16,
    fontWeight: '400'

  },

  otherTextinput: {
    height: 55,
    justifyContent: 'center',
    padding: 10,

  },

  addQuestionButton: { width: '95%', alignSelf: 'center', marginTop: 3, marginBottom: 5 },
  questionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  questionInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 10,
    borderRadius: 8
  },
  optionInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 10,
    width: '80%',
    borderRadius: 8
  },

  addQuizCon: { marginLeft: '2%', flexDirection: 'row', padding: 5, alignItems: 'center', marginBottom: 5 },
  textInput: {
    borderWidth: 1.5,
    opacity: 0.8,
    margin: 8,
    borderRadius: 8,
    padding: 10,
    color: 'black',
    width: '95%',
    marginHorizontal: '3%',
    borderColor: 'grey',
    fontSize: 16
  },
  QuestextInput: {
    borderWidth: 1.5,
    opacity: 0.8,
    borderRadius: 6,
    padding: 5,
    color: 'black',
    width: '85%',
    height: '13%',
    marginHorizontal: '3%',
    borderColor: 'grey',
  },
  // textInputOp: {
  //   borderWidth: 1.5,
  //   opacity: 0.8,
  //   margin: 8,
  //   borderRadius: 6,
  //   padding: 10,
  //   color: 'black',
  //   width: '75%',
  //   height: '60%',
  //   marginHorizontal: '3%',
  //   borderColor: 'grey',
  // },
  textInputTag: {
    borderWidth: 1.5,
    opacity: 0.8,
    margin: 8,
    borderRadius: 8,
    padding: 9,
    color: 'black',
    width: '95%',
    marginHorizontal: '3%',
    borderColor: 'grey'
  },
  imgTag: { width: 22, height: 22 },
  placeholder: {
    position: 'absolute',
    top: -20,
    fontSize: 16,
    color: 'gray',
    backgroundColor: 'white',
    paddingHorizontal: 2,
    zIndex: 1,
  },
  tagText: { fontSize: 16, color: 'black', marginLeft: 5, fontWeight: '500' },
  placeholderText: {
    marginTop: 20,
    marginLeft: 35,
    color: 'black',
    fontSize: 15,
    fontWeight: '500'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    marginTop: 22
  },
  categoryOption: {
    padding: 10,
  },
  categoryText: {
    fontSize: 17,
    color: 'black'
  },
  categoryContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  subcategoryContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  visibilityContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  categoryModalView: {
    alignItems: 'flex-start',
    top: 30
  },
  subcategoryModalView: {
    alignItems: 'flex-start',
  },
  visibilityModalView: {
    top: 120,
    alignItems: 'flex-start',
  },
  modalText: {
    color: 'black',
    fontSize: 16,
    top: 5,
    marginLeft: '1%',
    fontWeight: '400'
  },
  dropDownImgCon: {
    alignSelf: 'flex-end',
    top: -10
  },
  imgdropdown: {
    width: 15,
    height: 15,
    tintColor: 'gray'
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '60%',
    backgroundColor: '#ffffff',
    backgroundColor: '#ffffff',
    elevation: 10,
    width: '84%',
    marginLeft: '8%',
    marginRight: '8%',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
  },
  modalHeader1: {
    fontSize: 18,
    fontWeight: '500',
    paddingBottom: 10,
    color: 'black',
  },
  modalOptionText: {
    fontSize: 16,
    paddingVertical: 10,
    color: 'black',
  },
  modalOptionTextCancel: {
    fontSize: 16,
    paddingVertical: 10,
    color: 'black',
  },
  videoPreview: {
    width: '100%',
    height: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dropdownSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dropdownInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  uploadProgressText: {
    fontSize: 18,
  },
  image: {
    height: 180,
    width: '100%',
    borderRadius: 8
  },
  editicon: {
    marginTop: '5%',
    marginLeft: '4%',
    marginBottom: '4%'
  },
  editing: {
    tintColor: 'gray',
    height: 25,
    width: 25,
    borderRadius: 4
  }
});