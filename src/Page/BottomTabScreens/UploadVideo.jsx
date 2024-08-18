
import React, { useRef, useState,useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Pressable, FlatList,Dimensions,KeyboardAvoidingView, Platform, Keyboard  } from 'react-native';
import Colors from '../../utils/Colors';
import Button from '../../Components/Button';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import FormData from 'form-data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';
import { groupApi } from '../../api/axiosApi';
import { useIsFocused, useNavigation } from '@react-navigation/native';
//import CustomErrorModal from '../../Components/CustomErrorModal';
import CustomErrorModal from '../../Components/CustomErrorModal';
import ToastModal from '../../Components/ToastModal';
//import { ProgressBar } from 'react-native-paper';
import ProgressBar from 'react-native-progress/Bar';
import CustomOptionButton from '../../Components/CustomOptionButton';


const imgVideo = require('../../assets/images/videoplay.png');

const UploadVideo = () => {
  const categoryRef = useRef();
  const subcategoryRef = useRef();
  const visibilityRef = useRef();
  const manualsRef = useRef();
  
  const navigation=useNavigation();
  const [videoName, setVideoName] = useState('');
  const [checkList, setCheckList] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedVisibility, setSelectedVisibility] = useState('');
  const [selectedManual, setSelectedManual] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedVisibilities, setSelectedVisibilities] = useState([]);
  const [selectedManuals, setSelctedManuals] = useState([]);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [subcategoryModalVisible, setSubcategoryModalVisible] = useState(false);
  const [visibilityModalVisible, setVisibilityModalVisible] = useState(false);
  const [MyManualModalVisible, setMyManualModalVisible] = useState(false);

  const [messageErrorModal,setMessageErrorModal]=useState('');
  const [erroModal, setErrorModal] = useState(false);
  const [toastModal,setToastModal]= useState(false);
  const [questionAdd,setQuestionAdd]=useState(false);
  const [questionRemoveTostModal,setQuestionRemoveToastModal]=useState();

  const [keyboardActive, setKeyboardActive] = useState(false);

  const categoryOptions = ['--Select Category --', 'Administrative', 'Dental', 'Hygeine', 'Maintenace', 'Other'];

  const subcategoriesByCategory = {
    Administrative: ['--Select Subcategory --', 'Dentrix', 'Eagle Soft', 'Soft Dent', 'Open Dental', 'Easy Dental'],
    Dental: ['--Select Subcategory --', 'Restorative', 'Endodontics', 'Implants', 'Oral Surgery', 'Periodontics', 'Orthodontics', 'Pedodontics', 'Prosthetics', 'Hygine sub 2'],
    // Hygiene: ['--Select Subcategory --', 'Hygiene sub 1'],
    Hygeine: ['--Select Subcategory --', 'Hygine sub 1'],
    Maintenace: ['--Select Subcategory --', 'maintenance sub 1', 'maintenance sub 2'],
    Other: ['--Select Subcategory --', 'other sub1', 'other sub2'],
  };

  const visibilityOptions = ['-- Select Visibilty --', 'Community', 'My Videos'];
  
  const MyManualsOptions = ['-- Select My Manuals --', ...selectedManuals.map(manual => manual.groupName)];

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const [isButtonVisible1, setIsButtonVisible1] = useState(false);
  const [isButtonVisible2, setIsButtonVisible2] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);

  const [isChecked2, setIsChecked2] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);

  const [selectedGroupId,setSelectedGroupId]=useState(null);
 
  const [selectedTag, setSelectedTag] = useState(null); 
  const [questionText, setQuestionText] = useState('');

  const [option1Text, setOption1Text] = useState(''); 
  const [option2Text, setOption2Text] = useState(''); 

  const [selectedOption, setSelectedOption] = useState(null); 

  const [uploadProgress, setUploadProgress] = useState(0); // State variable to track upload progress
  const [uploadModalVisible, setUploadModalVisible] = useState(false); // State variable to manage upload modal visibility
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const screenHeight = Dimensions.get('window').height;


  const isFocused = useIsFocused();


  const [questionList, setQuestionList] = useState([
    {
      question_name: "",
      options: [{text: ''}, {text: ''}],
    }
  ]);

  const [options, setOptions] = useState([
    { id: 1, text: '' }, // Initial option
  ]);
  
  useEffect(() => {
    if (isFocused) {
    //  setActivityLoder(true);
      setTimeout(() => {
       // setActivityLoder(false)
      }, 1000);
    }
    return () => {
      setVideoName('');
      setCheckList('');
      setSelectedCategory('');
      setSelectedSubcategory('');
      setSelectedVisibility('');
      setSelectedManual('');
      setSelectedCategories([]);
      setSelectedSubcategories([]);
      setSelectedVisibilities([]);
      setSelctedManuals([]);
      setCategoryModalVisible(false);
      setSubcategoryModalVisible(false);
      setVisibilityModalVisible(false);
      setMyManualModalVisible(false);
      // setIsChecked('')
      setIsChecked1('')
      setIsChecked2('')
      setIsChecked('')
      //setQuestionList('')
     // setIsButtonVisible(false);
     setIsButtonVisible('')
      setSelectedVideo(null);
      // setQuestionList([{'',[]}])
      setQuestionList([
        {
          question_name: "",
          options: [{ text: '' }, { text: '' }],
        }
      ]);
    };
  }, [isFocused]);
  

  const handleTagSelect = (tagNumber) => {
    setSelectedTag(tagNumber); 
  };
   


  const getCategoryID = (category) => {

    const categoryIDMap = {
      'Administrative': 1,
      'Dental': 2,
      'Hygeine': 3,
     // 'Maintenance': 4,
      'Maintenace':4,
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
        'Restorative': 6,
        'Endodontics': 7,
        'Implants': 8,
        'Oral Surgery': 9,
        'Periodontics': 10,
        'Orthodontics': 11,
        'Pedodontics': 12,
        'Prosthetics': 13,
        'Hygine sub 2': 15
      },
      3: {
       'Hygine sub 1': 14
      },
      4: {
        'maintenance sub 1': 16,
        'maintenance sub 2': 17,
      
      },
      5: {
        'other sub1': 18,
        'other sub2': 19
      }
    };
    const categoryId = getCategoryID(selectedCategory);
    return subcategoryIDMap[categoryId] ? subcategoryIDMap[categoryId][subcategory] : null;
  };



  const getVisibilityID = (visibility) => {
    const visibilityIDMap = {
      'Community': 'Y',
      'My Videos': 'N'
    };
    return visibilityIDMap[visibility] || null;
  };

  const uploadVideos = async () => {
    if (selectedVideo === null) {
      setMessageErrorModal('Please select video')
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 2000)
      return;
    }

    if (videoName === "") {
      setMessageErrorModal('Please enter video name')
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 2000)
      return;
    }

    if (checkList === "") {
      setMessageErrorModal('Please enter video checklist')
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 2000)
      return;
    }
    
    if (selectedCategory == "" || selectedCategory == '--Select Category --') {
      setMessageErrorModal('Please select category')
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 2000)
      return;
    }

    if (selectedSubcategory == '' ||selectedSubcategory == '--Select Subcategory --') {
      console.log('selected subcategory')
      setMessageErrorModal('Please select subcategory')
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 2000)
      return;
    }

    // if (selectedVisibility === "") {
    //   setMessageErrorModal('Please select visibility')
    //   setErrorModal(true);
    //   setTimeout(() => {
    //     setErrorModal(false);
    //   }, 2000)
    //   return;
    // }
    if (selectedVisibility == ''|| selectedVisibility == '-- Select Visibilty --') {
      setMessageErrorModal('Please select visibility');
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 2000);
      return
    }

    const isEmpty = questionList.some(question => (
      question.question_name.trim() === '' || question.options.some(option => option.text.trim() === '' )
    ));
    const optionIsEmpty = questionList.some(question => (
      question.options.every(option => !option.selected)
    ));if (isEmpty && isChecked) {
      setMessageErrorModal('Fill all questions/answers.');
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 2000);
      return;
    }

    if (optionIsEmpty && isChecked) {
      setMessageErrorModal('Select answer of each question.');
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 2000);
     
      return;
    }
  
    // for (const question of questionList) {
    //   if (question.question_name === "") {
    //     setMessageErrorModal('Please enter a question');
    //     setErrorModal(true);
    //     setTimeout(() => {
    //       setErrorModal(false);
    //     }, 2000);
    //     return ;
    //   }
      
    //   for (const option of question.options) {
    //     if (option.text === "") {
    //       setMessageErrorModal('Please enter an option for the question');
    //       setErrorModal(true);
    //       setTimeout(() => {
    //         setErrorModal(false);
    //       }, 2000);
    //       return ;
    //     }
    //   }
    // }
  
   

    setUploadProgress(0); // Reset upload progress when starting upload
    setUploadModalVisible(true); 
    console.log('Inside uploadvideos')
    setUploadModalVisible(true);
    const formData = new FormData();
    formData.append('videourl', {
      uri: selectedVideo,
      name: 'BKL-test_001.mp4',
      type: 'video/mp4',
    });
    console.log("formdata", formData);
    formData.append('video_name', videoName);
    formData.append('video_description', checkList);
    formData.append('category_id', getCategoryID(selectedCategory));
    console.log(selectedCategory)
    formData.append('subcategory_id', getSubcategoryID(selectedSubcategory));
    console.log(selectedSubcategory)
    formData.append('video_public_yn', getVisibilityID(selectedVisibility));
    console.log(selectedVisibility)
    formData.append('video quiz yn', 'Y');

    formData.append('tag_ids', selectedTag);
    console.log(selectedTag)
    console.log("Selected Group ID:", selectedGroupId);
    formData.append('group_id',selectedGroupId);
    console.log("Selected Group ID:", selectedGroupId);
    console.log('Before axios.post');
    try {
      let token = await AsyncStorage.getItem('sessiontoken');

      const response = await axios.post('http://3.21.214.37/admin/api/V3/video/addvideo', formData, {
       
      // http://3.21.214.37/admin/api/V1/video/addvideo
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + token,
        },

        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100); // Calculate upload progress
          setUploadProgress(progress); // Update upload progress state variable
          // setUploadModalVisible(true);
        },
      });
      console.log('Video uploaded successfully:', response.data);
      console.log("Video ID => ",response.data?.video?.video_id);
      console.log("Video ID => ",response.data.video.video_id);

      
        const videoId = response.data?.video?.video_id;
  
        
        addQuestionsAPI(videoId);
  
        console.log('Video uploaded successfully:', response.data);
        // setMessageErrorModal('Video Uploaded Successfully');
        setToastModal(true);
        setTimeout(() => {
          setToastModal(false);
          navigation.navigate('Home');
        }, 2000);
    
      
        setUploadProgress(0); 
      
      
    
      setUploadModalVisible(false); 


    } catch (error) {
      console.error('Error uploading video:', error);
      setUploadProgress(0); 
      setUploadModalVisible(false); 

    }
    console.log('After axios.post');
  };

  const addQuestionsAPI = async (videoId) => {
    console.log('videoId In Add Question API => ',videoId)
    if (questionList.length < 10) {
      let data = {
        video_id:videoId,
        video_data: questionList.map(question => ({
          question_name: question.question_name,
          question_option: question.options.map((option, index) => ({
            answer_id: index + 1028, 
            option_id: 334, 
            sequence: index + 1, 
            option: option.text,
            is_correct: option.selected ? "Y" : "N", 
            user_answer: "" 
          }))
        }))
      };
      
      try {
        const token = await AsyncStorage.getItem('sessiontoken');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        };

        const response = await axios.post('http://3.21.214.37/admin/api/V3/video/questions/add', data, { headers });
        console.log('Add Question Response:', response.data);
      } catch (error) {
        console.error('Error While Uploading Question:', error);
      }
    } else {
      console.log("Maximum number of questions reached");
    }
  };

  useEffect(() => {
    getMyManuals();
  
}, []);

const getMyManuals = async () => {
  
  try {
    const response = await groupApi();
    const groups = response?.data?.groups;
    if (groups && groups.length > 0) {
      const manuals = groups.map(group => ({
        groupId: group.group_id,
        groupName: group.group_name
      }));
      setSelctedManuals(manuals); 
      console.log(manuals);
    }
  } catch (error) {
    console.error('Error fetching My Manuals:', error);
  }
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
    //console.log("hello");
    setIsChecked2(!isChecked2);
  };
  const toggleButtonVisibility = () => {
    setIsButtonVisible(!isButtonVisible);
  };

  const toggleButtonVisibility1 = () => {
    setIsButtonVisible1(!isButtonVisible1);
    setIsChecked1(!isChecked1); // Toggle the checkbox
  };

  const toggleButtonVisibility2 = () => {
    setIsButtonVisible2(!isButtonVisible2);
    setIsChecked2(!isChecked2); // Toggle the checkbox
  };


  const handleCategorySelect = (category) => {
    console.log('category select', category)
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

  const handleMyManualsSelect = (manual) => {
    setSelectedManual(manual);
    const selectedGroup = selectedManuals.find(item => item.groupName === manual);
    if (selectedGroup) {
      setSelectedGroupId(selectedGroup.groupId); 
    }
    if (!selectedManuals.includes(manual)) {
      setSelctedManuals([...selectedManuals, manual]);
    }
    setMyManualModalVisible(false);
  };


  const openVideoPicker = async () => {
    setModalVisible1(false);
    try {
      const video = await ImagePicker.openPicker({
        mediaType: 'video',
      });
      setSelectedVideo(video.path);
      console.log('Video Path', selectedVideo)
    } catch (error) {
      console.error('Error picking video:', error);
    }
  };


  const addQuestions = () => {
    // if (question.question_name === "") {
    //   setMessageErrorModal('Please enter a question');
    //   setErrorModal(true);
    //   setTimeout(() => {
    //     setErrorModal(false);
    //   }, 2000);
    //   return ;
    // }
    if (questionList.length < 10) {
      let questionListCopy = [...questionList];
      let object = {
        question_name: "",
        options: [{text: '', selected: false}, {text: '', selected: false}],
      };
      questionListCopy.push(object);
      setQuestionList(questionListCopy);
      setQuestionAdd(true);
      setTimeout(() => {
        setQuestionAdd(false);
      }, 1500);
    } else {
    
      console.log("Maximum number of questions reached");
    }
  };

  const onChangeQuestionValue = (text, index,optin) => {
    let questionListCopy = [...questionList];
    questionListCopy[index]['question_name'] = text;
    setQuestionList(questionListCopy); 
  };
 

  const onChangeOptionValue = (text, questionIndex, optionIndex) => {
    // if ([optionIndex]['text'] === "") {
    //   setMessageErrorModal('Please enter an option for the question');
    //   setErrorModal(true);
    //   setTimeout(() => {
    //     setErrorModal(false);
    //   }, 2000);
    //   return ;
    // }

    let questionListCopy = [...questionList];
    questionListCopy[questionIndex]['options'][optionIndex]['text'] = text;
    setQuestionList(questionListCopy); 
  };
  

 
  const toggleOptionSelection = (questionIndex, optionIndex) => {
    // if (questionList[questionIndex]?.options[optionIndex]?.text === '') {
    //   setMessageErrorModal('Please enter an option');
    //   setErrorModal(true);
    //   setTimeout(() => {
    //     setErrorModal(false);
    //   }, 2000);
    //   return;
    // }
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
  // const toggleOptionSelection = (questionIndex, optionIndex) => {
  
  
  //   let questionListCopy = [...questionList];
  //   questionListCopy[questionIndex]['options'].forEach((option, index) => {
  //     if (index === optionIndex) {
  //       questionListCopy[questionIndex]['options'][index]['selected'] = true;
  //     } else {
  //       questionListCopy[questionIndex]['options'][index]['selected'] = false;
  //     }
  //   });
  //   setQuestionList(questionListCopy);
  // };
  

  
 
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
    // setQuestionRemoveToastModal(true);
    // setTimeout(() => {
    //   setQuestionRemoveToastModal(false)
    // }, 1500);
  };

  useEffect(() => {
    measureRefPosition(categoryRef, setModalPosition, categoryModalVisible);
  }, [categoryModalVisible]);
  
  useEffect(() => {
    measureRefPosition(subcategoryRef, setModalPosition, subcategoryModalVisible);
  }, [subcategoryModalVisible]);
  
  useEffect(() => {
    measureRefPosition(visibilityRef, setModalPosition, visibilityModalVisible);
  }, [visibilityModalVisible]);
  
  useEffect(() => {
    measureManualRefPosition(manualsRef, setModalPosition, MyManualModalVisible);
  }, [MyManualModalVisible]);
  
  
  const handleOpenCategoryModal = () => {
    setCategoryModalVisible(true);
  };
  
  const handleOpenSubCategoryModal = () => {
    setSubcategoryModalVisible(true);
  };
  const handleOpenVisibilityModal = () => {
    setVisibilityModalVisible(true);
  };
  
  const handleOpenManualModal = () => {
    setMyManualModalVisible(true);
  };
  
  const measureRefPosition = (ref, setModalPosition, modalVisible) => {
    if (ref.current && modalVisible) {
      ref.current.measure((x, y, width, height, pageX, pageY) => {
        setModalPosition({ x: pageX, y: pageY });
      });
    }
  };
  
  const measureManualRefPosition = (ref, setModalPosition, modalVisible, modalHeight) => {
    if (ref.current && modalVisible && !isNaN(modalHeight)) {
      ref.current.measure((x, y, width, height, pageX, pageY) => {
        if (!isNaN(pageY)) {
          const newY = pageY - modalHeight;
          setModalPosition({ x: pageX, y: newY });
        } else {
          console.error("Invalid pageY value:", pageY);
        }
      });
    } else {
      console.error("Invalid parameters:", ref.current, modalVisible, modalHeight);
    }
  };


  const handleKeyboardDidShow = () => {
    setKeyboardActive(true);
  };
  
  const handleKeyboardDidHide = () => {
    setKeyboardActive(false);
  };
  
  // Subscribe to keyboard events
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
  
    // Clean up listeners
    // return () => {
    //   Keyboard.removeListener('keyboardDidShow', handleKeyboardDidShow);
    //   Keyboard.removeListener('keyboardDidHide', handleKeyboardDidHide);
    // };
  }, []);
  

  return (
   
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : null}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust this value according to your UI
  >

    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        
    <View style={styles.imageContainer}>
  {/* {selectedVideo && (
    <Image source={{ uri: selectedVideo }} style={{  height: 130,
      width: 130,borderRadius:10}} />
  )}
  {!selectedVideo && (
    <Image source={imgVideo} style={styles.img} />
  )} */}
  <View style={styles.imageContainer}>
  {selectedVideo ? (
    <Image source={{ uri: selectedVideo }} style={{ height: 130, width: 130, borderRadius: 10 }} />
  ) : (
    <Image source={imgVideo} style={styles.img} />
  )}
</View>

</View>
        <View style={styles.buttonContainer}>
          <Button label={'Select Video'} onPress={() => setModalVisible1(true)} />
        </View>
      </View>
      <View style={styles.container2}>
        <View style={styles.container2}>
          <Text style={[styles.placeholder, styles.placeholderText]}>Video Name</Text>
          <TextInput
            style={[styles.textInput, styles.videoNameTextInput]}
            placeholderTextColor='gray'
            multiline={true}
            onChangeText={setVideoName}
            value={videoName}
          />
        </View>

        <View style={styles.container2}>
          <Text style={[styles.placeholder, styles.placeholderText]}>Check List</Text>
          <TextInput
            style={[styles.textInput, styles.checkListTextinput]}
            placeholderTextColor='gray'
            multiline={true}
            onChangeText={setCheckList}
            value={checkList}
          />
        </View>

        <View style={styles.categoryContainer}>

          <Text style={[styles.placeholder, styles.placeholderText]}>Category Name</Text>

          <TouchableOpacity style={[styles.textInput, styles.otherTextinput]}
             ref={categoryRef}
          onPress={handleOpenCategoryModal}>
            <Text style={styles.modalText}>{selectedCategory || "--Select Category--"}</Text>
            <Pressable style={styles.dropDownImgCon}>
              <Image source={require('../../assets/images/dropdown.png')} style={styles.imgdropdown} />
            </Pressable>
          </TouchableOpacity>

        </View>

        <View style={styles.subcategoryContainer}>
          <Text style={[styles.placeholder, styles.placeholderText]}>Subcategory</Text>
          <TouchableOpacity style={[styles.textInput, styles.otherTextinput]} 
             ref={categoryRef}
             onPress={handleOpenSubCategoryModal}>
            <Text style={styles.modalText}>{selectedSubcategory || "--Select Subcategory--"}</Text>
            <Pressable style={styles.dropDownImgCon}>
              <Image source={require('../../assets/images/dropdown.png')} style={styles.imgdropdown} />
            </Pressable>
          </TouchableOpacity>
        </View>

        <View style={styles.visibilityContainer}>
  <Text style={[styles.placeholder, styles.placeholderText]}>Visibility</Text>
  <TouchableOpacity style={[styles.textInput, styles.otherTextinput]}
  ref={categoryRef}
  onPress={handleOpenVisibilityModal}>
    <Text style={styles.modalText}>{selectedVisibility || "--Select Visibility--"}</Text>
    <Pressable style={styles.dropDownImgCon}>
      <Image source={require('../../assets/images/dropdown.png')} style={styles.imgdropdown} />
    </Pressable>
  </TouchableOpacity>
</View>

{selectedVisibility !== 'Community' && (
  <View style={styles.visibilityContainer}>
    <Text style={[styles.placeholder, styles.placeholderText]}>My Manuals</Text>
    <TouchableOpacity style={[styles.textInput, styles.otherTextinput]} onPress={() => setMyManualModalVisible(true)}>
      <Text style={styles.modalText}> {selectedManual || "-- Select My Manuals --"}</Text>
      <Pressable style={styles.dropDownImgCon}>
        <Image source={require('../../assets/images/dropdown.png')} style={styles.imgdropdown} />
      </Pressable>
    </TouchableOpacity>
  </View>
)}



        <View style={styles.container2}>
          <Text style={[styles.placeholder, styles.placeholderText]}>Tag</Text>

          <View style={[styles.tagcon, styles.textInputTag]}>

           
            <TouchableOpacity onPress={() => { handleTagSelect(1); toggleButtonVisibility1(); toggleCheck1(); }} style={styles.tag1Style}>
              <Image style={styles.imgTag} source={isChecked1 ? require('../../assets/images/check.png') : require('../../assets/images/square.png')} />
              <Text style={styles.tagText}>Tag 1</Text>
            </TouchableOpacity>

         

            <TouchableOpacity onPress={() => { handleTagSelect(2); toggleButtonVisibility2(); toggleCheck2(); }} style={styles.tag1Style}>
              <Image style={styles.imgTag} source={isChecked2 ? require('../../assets/images/check.png') : require('../../assets/images/square.png')} />
              <Text style={styles.tagText}>Tag 2</Text>
            </TouchableOpacity>

          </View>



        </View>
        <View style={styles.addQuizMainCon}>

          <TouchableOpacity onPress={() => { toggleButtonVisibility(); toggleCheck(); }} style={styles.addQuizCon}>
            <Image style={styles.imgTag} source={isChecked ? require('../../assets/images/check.png') : require('../../assets/images/square.png')} />
            <Text style={styles.tagText}>Add Quiz</Text>
          </TouchableOpacity>
          {/* <ToastModal visible={questionAdd} label={'Question added  successfully'}/> */}

          {isButtonVisible && (
            <View style={styles.addQuestionButton}>
              {/* <Button label={'ADD QUESTION'} onPress={addQuestions}/> */}
              {/* <Button label={'ADD QUESTION'} /> */}
              <View style={{ width: '100%', alignSelf: 'flex-end', }}> 
              <CustomOptionButton title={'ADD QUESTION'} onPress={addQuestions} style={styles.addQuestionButtonStyle} disabled={questionList.length>=10}
              textColor="#737373"/>
               </View>
               <ToastModal visible={questionAdd} label={'Question added  successfully'}/>
           <>
      {questionList?.map((question, index) => (
        <View key={index}>
          <Text style={styles.questionLabel}>Question {index + 1}</Text>
        
            <View style={{flexDirection:'row'}}>
          <TextInput
           placeholder='Enter Question'
            style={styles.questionInput}
            value={question.question_name}
            onChangeText={(text) => onChangeQuestionValue(text, index)}
          />
           {index >= 1 && (
                        <TouchableOpacity onPress={() => questionRemove(index)} style={{alignSelf:'center',left:5}}>
                          <Image
                            source={require('../../assets/images/crossradio.png')}
                            style={{ width: 23, height: 23 }}
                            resizeMode='cover'
                          />
                        </TouchableOpacity>
                      )}
                      </View>
                      {/* <ToastModal visible={questionRemoveTostModal} label={'Question Remove  successfully'}/> */}
          
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={styles.questionLabel}> Quiz Options</Text>
          <Text style={styles.optionLabel2}> Upto 5 Options</Text>
          </View>
          {question?.options?.map((option, optionIndex) => (
            <View key={optionIndex} style={styles.optionContainer}>
              <View style={{flexDirection:'row'}}>
              <TextInput
                style={styles.optionInput}
                placeholder={`Option ${optionIndex + 1}`}
                value={option.text}
                onChangeText={(text) => onChangeOptionValue(text, index, optionIndex)}
              />
                 <TouchableOpacity style={styles.toggleOptionSelectionSelection} onPress={() => toggleOptionSelection(index, optionIndex)}>
                
                <Image
                  source={option.selected ? require('../../assets/images/radio-selected.png') : require('../../assets/images/radio-unselected.png')}
                  style={styles.imgTag}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              {optionIndex >= 2 && (
             <TouchableOpacity  style={styles.removeOptionSelection} onPress={() => removeOption(index, optionIndex)}>
             <Image
               source={require('../../assets/images/crossradio.png')}
               style={styles.imgTag}
               resizeMode="contain"
             />
           </TouchableOpacity>
            )}
            
            </View>
            
            {optionIndex === question.options.length - 1 && (
                          <View style={{ width: '60%', alignSelf: 'center' }} >
                            <CustomOptionButton title='Add Option'
                              onPress={() => addOption(index)}
                              disabled={question.options.length >= 5}
                              textColor="#737373" 
                              
                            />
                </View>
              )}
            </View>
          ))}
        </View>
      ))}
     
    </>
    </View>
             
             )}

        </View>
      </View>

      {/* <View style={{ flexDirection: 'row', alignSelf: 'center', width: '100%', justifyContent: 'space-between', marginBottom: 10}}>
          <View style={{ width: '45%', left: 10}}>
            <Button label={'Save'} onPress={() => uploadVideos()} />
          </View>
          <ToastModal visible={toastModal} label={'Video Uploaded successfully'}/>
          <CustomErrorModal isVisible={erroModal} message={messageErrorModal} />
          <View style={{ width: '45%', right: 10 }}>
            <Button label={'Cancel'}  onPress={() => handleCancel()} />
          </View>
        </View> */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={categoryModalVisible}
        onRequestClose={() => {
          setCategoryModalVisible(false);
        }}
      >
        <TouchableOpacity
       style={styles.overlay1}
      activeOpacity={1}
       onPress={() => setCategoryModalVisible(false)}
          >
        {/* <View style={[styles.centeredView,  { zIndex: 3,justifyContent:'center',marginTop:'55%'}]}> */}
        <View style={[styles.MainModalView,   { top: modalPosition.y, left: modalPosition.x }]}>
          <View style={[styles.modalViewCategory,]}>
            {categoryOptions.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryOption} onPress={() => handleCategorySelect(category)}>
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={subcategoryModalVisible}
        onRequestClose={() => {
          setSubcategoryModalVisible(false);
        }}
      >
        <TouchableOpacity
       style={styles.overlay1}
      activeOpacity={1}
       onPress={() => setSubcategoryModalVisible(false)}
          ></TouchableOpacity>
        <View style={[styles.MainModalView2,   { top: modalPosition.y, left: modalPosition.x }]}>
            <ScrollView >
              <View style={styles.modalView}>
              {subcategoriesByCategory[selectedCategory]?.length > 0 ? (
                subcategoriesByCategory[selectedCategory].map((subcategory, index) => (
                  <TouchableOpacity key={index} style={styles.categoryOption} onPress={() => handleSubcategorySelect(subcategory)}>
                    <Text style={styles.categoryText}>{subcategory}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <TouchableOpacity style={styles.categoryOption} onPress={() => setSubcategoryModalVisible(false)}>
                  <Text style={styles.categoryText}>--Select Subcategory--</Text>
                </TouchableOpacity>
              )}
              </View>
            </ScrollView>
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
         <TouchableOpacity
       style={styles.overlay1}
      activeOpacity={1}
       onPress={() => setSubcategoryModalVisible(false)}
          >
       <View style={[styles.MainModalView,   { top: modalPosition.y, left: modalPosition.x }]}>
          <View style={styles.modalView}>
            {visibilityOptions.map((visibility, index) => (
              <TouchableOpacity key={index} style={styles.categoryOption} onPress={() => handleVisibilitySelect(visibility)}>
                <Text style={styles.categoryText}>{visibility}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        </TouchableOpacity>
      </Modal>

      <Modal
  animationType="fade"
  transparent={true}
  visible={MyManualModalVisible && selectedVisibility !== 'Community'}
  onRequestClose={() => {
    setMyManualModalVisible(false);
  }}
>
  <View style={[styles.centeredView, styles.visibilityModalView]}>
    <View style={styles.modalView}>
    <ScrollView >
      {MyManualsOptions.map((mymanual, index) => (
        <TouchableOpacity key={index} style={styles.categoryOption} onPress={() => handleMyManualsSelect(mymanual)}>
          <Text style={styles.categoryText}>{mymanual}</Text>
        </TouchableOpacity>
      ))}
      </ScrollView>
    </View>
  </View>
</Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => setModalVisible1(false)}
      >
        <View style={[styles.modalContainer, { marginTop: '80%' }]}>
          <View style={[styles.modalContent]}>
            <Text style={styles.modalHeader1}>Upload Video</Text>
            <TouchableOpacity onPress={openVideoPicker}>
              <Text style={styles.modalOptionText}>Choose Video from Library</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible1(false)}>
              <Text style={styles.modalOptionTextCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

<Modal
        animationType="slide"
        transparent={true}
        visible={uploadModalVisible}
        onRequestClose={() => setUploadModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>Uploading Video..</Text>
            <ProgressBar progress={uploadProgress / 100} color='#038476' style={styles.progressBar} />
            <View style={{position:'absolute',right:10,top:66}}>
             
            <Text>{uploadProgress}{'/100'}</Text>
         
            </View>  
            <View style={{right:10,top:5}}>
            <Text>{uploadProgress}%</Text>
            </View>
          </View>
        </View>
      </Modal>

    </ScrollView>
    {!keyboardActive && (
    <View style={styles.uploadVideostl}>
      <View style={styles.uploadvdostl}>
        <Button label={'Save'} onPress={() => uploadVideos()} />
      </View>
      <ToastModal visible={toastModal} label={'Video Uploaded successfully'} />
      <CustomErrorModal isVisible={erroModal} message={messageErrorModal} />
      <View style={styles.handleCancelstyle}>
        <Button label={'Cancel'}  onPress={() => handleCancel()} />
      </View>
    </View>
  )}
</KeyboardAvoidingView>
  
  )
}

export default UploadVideo;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
   // position:'absolute'
  },
  uploadVideostl:{
     flexDirection: 'row', 
     alignSelf: 'center',
      width: '100%', 
      justifyContent: 'space-between',
       marginBottom: 10 
      },
  addQuestionButtonStyle:{ width: '80%',
   alignSelf: 'center', 
   marginTop: '5%',
   borderWidth:7 
  },
  handleCancelstyle:{
     width: '45%',
      right: 10 
    },
  uploadvdostl:{ 
    width: '45%', 
    left: 10 },
  MainModalView: {
 //   height:'10%',
    position: 'absolute',
    bottom: 0,
    right: '5%',
    width: '100%',
   // marginTop:'-35%',
    left:'5%',
    alignSelf:'center',
  },
  MainModalView2: {
    position: 'absolute',
    bottom: 0,
    right: '5%',
    width: '100%',
    marginTop:'-25%',
    left:'5%'
  },

  overlay1: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tag1Style:{
     marginLeft: '2%', flexDirection: 'row', padding: 5, alignItems: 'center' 
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: '3%'
  },
  imageContainer: {
    height: 130,
    width: '36%',
    backgroundColor: '#f7f4f4',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgTag:{ width: 22, height: 22 },
  tagcon: { position: 'absolute', flexDirection: 'row', width: '70%', alignItems: 'center' },
  img: {
    height: 90,
    width: 90,
    tintColor: '#e1e1e1'
  },
  buttonContainer: {
    width: '59%',
    alignSelf: 'center',
    left: '17%'
  },
  container2: {
    flexDirection: 'column',
    width: '100%'
  },
  textInputContainer: {},
  checkListTextinput: {
    height: 80
  },
  videoNameTextInput: {
     height: 65 
    },

  otherTextinput: {
    height: 55,
    justifyContent: 'center',
    padding: 10,
  
  },
  tagText:{ fontSize: 16, color: 'black', marginLeft: 5, fontWeight: '500' },
  textInput: {
    borderWidth: 1.5,
    opacity: 0.8,
    margin: 8,
    borderRadius: 8,
    padding: 10,
    color: 'black',
    width: '95%',
    marginHorizontal: '3%',
    borderColor: Colors.grey,
  },
  QuestextInput: {
    borderWidth: 1.5,
    opacity: 0.8,
    margin: 8,
    borderRadius: 6,
    padding: 10,
    color: 'black',
    width: '85%',
    height:'17%',
    marginHorizontal: '3%',
    borderColor: Colors.grey,
  },
  questionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  optionLabel2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color:Colors.darkGrey,
    right:10
  },
  textInputOp: {
    borderWidth: 1.5,
    opacity: 0.8,
    margin: 8,
    borderRadius: 6,
    padding: 10,
    color: 'black',
    width: '75%',
    height:'60%',
    marginHorizontal: '3%',
    borderColor: Colors.grey,
  },
  textInputTag: {
    borderWidth: 1.5,
    opacity: 0.8,
    margin: 8,
    borderRadius: 8,
    padding: 9,
    color: 'black',
    width: '95%',
    marginHorizontal: '3%',
    borderColor: Colors.grey,


  },
  placeholder: {
    position: 'absolute',
    top: -20,
    fontSize: 16,
    color: 'gray',
    backgroundColor: 'white',
    paddingHorizontal: 2,
    zIndex: 1,
  },
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
   // marginTop: 22
   position:'absolute',
  
    bottom: 0,
    right: '5%',
    width: '100%',

  },
  modalView: {
    backgroundColor: "white",
    // borderRadius: 20,
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
   // marginTop: 22
  },
  modalViewCategory: {
    backgroundColor: "white",
    // borderRadius: 20,
    marginTop:'-35%',
   // padding: 20,
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
   // marginTop: 22
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
    color: 'black', fontSize: 16,top:5
  },
  dropDownImgCon: {
    alignSelf: 'flex-end', top: -10
  },
  imgdropdown: {
    width: 15, height: 15, tintColor: 'gray'
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

  addQuizCon:{ marginLeft: '2%', flexDirection: 'row', padding: 5, alignItems: 'center', marginBottom: 5 },
  videoPreview: {
    width: '100%',
    height: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
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
    borderColor: Colors.gray,
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   // marginTop:20
   // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  uploadProgressText: {
   // fontSize: 12,
  },
  addQuizMainCon:{ marginTop: '18%' },
  addQuestionButton:{ width: '95%', alignSelf: 'center', marginTop: 3, marginBottom: 5 },
  questionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  questionInput: {
    height: 40,
    width:'90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 10,
    borderRadius:8
  },
  optionInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 10,
    width:'80%',
    borderRadius:8
  },
  uploadProgressText: {
    fontSize: 18,
  },
  progressBar: {
    height: 3,
    width: 250,
    color: "#038476",
    borderRadius: 1

  },
  toggleOptionSelectionSelection:{alignSelf:'center',left:10,marginBottom:5},
  removeOptionSelection:{alignSelf:'center',left:20,marginBottom:5},
});


