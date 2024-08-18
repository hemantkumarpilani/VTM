import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Base_Url = 'http://3.21.214.37/';

const encryptedPasswordApi = async password => {
  console.log("User Entered Password ",password);
  
  await AsyncStorage.setItem('userEnteredPassword', password);
  const storedPassword = await AsyncStorage.getItem('userEnteredPassword');

  console.log('Retrieved user-entered password:', storedPassword);
  let response;
  const url = Base_Url + 'staging/api/V1/general/encryptpass';
  const headers = {
    'Content-Type': 'application/json',
  };
  
  let data = JSON.stringify({
    password: password,
  });

   
  try {
    response = await axios.post(url, data, {
      headers,
    });

    await AsyncStorage.setItem(
      'encryptedPassword1',
      response?.data?.encrypted_password,
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
  return response;
};

const loginApi = async (email, password) => {
  let response;

  const url = Base_Url + 'admin/api/V3/general/login';

  const headers = {
    'Content-Type': 'application/json',
  };
  let data = JSON.stringify({
    users: {
      email: email,
      password: password,
    },
    user_devices: {
      device_token: 'dt',
      device_os: 'android',
    },
  });

  try {
    response = await axios.post(url, data, {
      headers,
    });

    if (response?.data?.result == 'success') {
      await AsyncStorage.setItem(
        'sessiontoken',
        response?.data?.users?.user_session_token,
      );

      await AsyncStorage.setItem(
        'userid',
        response?.data?.users?.id.toString(),
      );
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return response;
};

const forgotPasswordApi = async email => {
  let response;

  const url = Base_Url + 'admin/api/V1/general/forgot-password';

  const headers = {
    'Content-Type': 'application/json',
  };
  let data = JSON.stringify({
    email: email,
  });

  try {
    response = await axios.post(url, data, {
      headers,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
  return response;
};

const communityVideoApi = async (authorisationToken, page) => {
  let response;

  const url = Base_Url + 'admin/api/V2/video/getVideo';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authorisationToken,
  };
  let data = JSON.stringify({
    category: 'N',
    search_term: '',
    page: page,
  });

  try {
    response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers,
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const categoriesAPI = async () => {
  const authorisationToken = await AsyncStorage.getItem('sessiontoken');
  let response;

  const url = Base_Url + 'admin/api/V1/video/getcategories';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authorisationToken,
  };

  try {
    response = await axios.get(url, {
      maxBodyLength: 'Infinity',
      headers,
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const categoryWiseVideApi = async id => {
  let response;

  let authorisationToken = await AsyncStorage.getItem('sessiontoken');

  const url = Base_Url + 'admin/api/V1/video/getCategoryVideo';

  let data = JSON.stringify({
    category_id: id,
  });

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authorisationToken,
  };

  try {
    response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers,
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const changePasswordApi = async oldEncryptedPassword => {
  let response;

  let token = await AsyncStorage.getItem('sessiontoken');
  let newEncryptedPassword = await AsyncStorage.getItem('encryptedPassword1');

  const url = Base_Url + 'admin/api/V1/general/changePassword';

  const data = JSON.stringify({
    users: {
      old_password: oldEncryptedPassword,
      password: newEncryptedPassword,
    },
  });

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };

  try {
    response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers,
    });

    return response;
  } catch (error) {
    console.log('Change pwd error:', error.response);
  }
};

const groupApi = async () => {
  let response;

  let authorisationToken = await AsyncStorage.getItem('sessiontoken');
  const url = Base_Url + 'admin/api/V1/group/getGroup';
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + authorisationToken,
  };

  try {
    response = await axios.get(url, {
      maxBodyLength: 'Infinity',
      headers,
    });
  } catch (error) {
    console.log('error -->', error);
  }
  return response;
};

const getMyVideosApi = async (authorisationToken, page) => {
  let response;
  const url = 'http://3.21.214.37/admin/api/V2/video/getMyVideos';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authorisationToken,
  };
  let data = JSON.stringify({
    page: page,
    category_id: '3',
    subcategory_id: '',
  });

  try {
    response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers,
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createManualApi = async (groupName, groupDescription, groupPhotoUri) => {
  let response;

  let authorisationToken = await AsyncStorage.getItem('sessiontoken');
  let userId = await AsyncStorage.getItem('userid');

  const url = Base_Url + 'admin/api/V1/group/addGroup';
  let data = JSON.stringify({
    groups: {
      group_name: groupName,
      group_description: groupDescription,
      group_photo_url: groupPhotoUri,
      group_admin_id: userId,
    },
  });
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authorisationToken,
  };

  try {
    response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers,
    });
  } catch (error) {
    console.log('error -->', error);
  }
  return response;
};

const editGroupApi = async (
  groupId,
  groupName,
  groupDescription,
  groupPhotoUri,
) => {
  let response;

  let authorisationToken = await AsyncStorage.getItem('sessiontoken');

  const url = Base_Url + 'admin/api/V1/group/editGroup';
  let data = JSON.stringify({
    group_id: groupId,
    groups: {
      group_name: groupName,
      group_description: groupDescription,
      group_photo_url: groupPhotoUri,
      group_admin_id: '',
    },
  });
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + authorisationToken,
    'Content-Type': 'application/json',
  };

  try {
    response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers,
    });
  } catch (error) {
    console.log('error -->', error);
  }
  return response;
};

const getGroupUsersApi = async groupId => {
  let response;

  let authorisationToken = await AsyncStorage.getItem('sessiontoken');

  const url = Base_Url + 'admin/api/V1/group/getGroupUsers/' + groupId;

  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + authorisationToken,
  };

  try {
    response = await axios.get(url, {
      maxBodyLength: 'Infinity',
      headers,
    });
  } catch (error) {
    console.log('error -->', error);
  }
  return response;
};

const getGroupVideosApi = async groupId => {
  let response;

  let authorisationToken = await AsyncStorage.getItem('sessiontoken');

  const url = Base_Url + 'admin/api/V1/group/getGroupVideos';

  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + authorisationToken,
    'Content-Type': 'application/json',
  };

  let data = JSON.stringify({
    group_id: groupId,
  });

  try {
    response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers,
    });
  } catch (error) {
    console.log('error -->', error);
  }
  return response;
};

const removeGroupUserApi = async (groupId, userId) => {
  let response;

  let authorisationToken = await AsyncStorage.getItem('sessiontoken');

  const url = Base_Url + 'admin/api/V1/group/removeGroupUser';

  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + authorisationToken,
    'Content-Type': 'application/json',
  };

  let data = JSON.stringify({
    group_id: groupId,
    user_id: userId,
  });

  try {
    response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers,
    });
  } catch (error) {
    console.log('error -->', error);
  }
  return response;
};

const deleteManualApi = async groupId => {
  let response;

  let authorisationToken = await AsyncStorage.getItem('sessiontoken');

  const url = Base_Url + 'admin/api/V1/group/deleteGroup';

  const headers = {
    Authorization: 'Bearer ' + authorisationToken,
    'Content-Type': 'application/json',
  };

  let data = JSON.stringify({
    group_id: groupId,
  });

  try {
    response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers,
    });
  } catch (error) {
    console.log('error -->', error);
  }
  return response;
};

const getVideoViewsApi = async videoId => {
  let response;

  let authorisationToken = await AsyncStorage.getItem('sessiontoken');

  const url = Base_Url + 'admin/api/V3/video/getVideoView/' + videoId;

  const headers = {
    Authorization: 'Bearer ' + authorisationToken,
  };

  try {
    response = await axios.get(url, {
      maxBodyLength: 'Infinity',
      headers,
    });
  } catch (error) {
    console.log('error -->', error);
  }
  return response;
};

const addUserInGroupApi = async groupId => {
  let response;

  let authorisationToken = await AsyncStorage.getItem('sessiontoken');

  const url = Base_Url + 'admin/api/V1/group/getnotassignuseringroup';

  const headers = {
    Authorization: 'Bearer ' + authorisationToken,
    'Content-Type': 'application/json',
  };

  let data = JSON.stringify({
    group_id: groupId,
  });

  try {
    response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers,
    });
  } catch (error) {
    console.log('error -->', error);
  }
  return response;
};

const uploadImageApi = async imageUri => {
  console.log('imageuri', imageUri)
  let response;

  let authorisationToken = await AsyncStorage.getItem('sessiontoken');

  const url = Base_Url + 'admin/api/V3/general/uploadImage';

  let data = new FormData();
  data.append('image_type', 'group');
  data.append('image', {
    uri: imageUri,
    type: 'image/jpeg',
    name: '1000000045.jpg',
  });

  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + authorisationToken,
    Accept: 'application/json',
  };

  try {
    response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers,
    });
  } catch (error) {
    console.log('error imageupload -->', error);
  }
  return response;
};

const addGroupUserApi = async (groupId, usersEmail) => {
  let response;

  let authorisationToken = await AsyncStorage.getItem('sessiontoken');

  const url = Base_Url + 'admin/api/V1/group/addGroupUser';

  let data = JSON.stringify({
    group_id: groupId,
    users: usersEmail,
  });

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authorisationToken,
    Accept: 'application/json',
  };

  try {
    response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers,
    });
  } catch (error) {
    console.log('error -->', error);
  }
  return response;
};

const addVideosInGroup = async videoData => {
  let response;

  let authorisationToken = await AsyncStorage.getItem('sessiontoken');

  const url = Base_Url + 'admin/api/V1/group/addVideoToGroup';

  let data = JSON.stringify({
    video_groups: videoData,
  });

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authorisationToken,
    Accept: 'application/json',
  };

  try {
    response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers,
    });
  } catch (error) {
    console.log('error -->', error);
  }
  return response;
};

const removeVideoApi = async (videoId, groupId) => {
  console.log('video id', videoId);
  console.log('group id', groupId);
  let response;

  let authorisationToken = await AsyncStorage.getItem('sessiontoken');

  const url = Base_Url + 'admin/api/V1/group/removeVideoFromGroup';

  let data = JSON.stringify({
    video_id: videoId,
    group_id: groupId,
  });

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authorisationToken,
    Accept: 'application/json',
  };

  try {
    response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers,
    });
    console.log(response.data);
  } catch (error) {
    console.log('error -->', error);
  }
  return response;
};

const approveVideoApi = async (videoId, groupId) => {
  console.log('video id', videoId);
  console.log('group id', groupId);
  let response;

  let authorisationToken = await AsyncStorage.getItem('sessiontoken');

  const url = Base_Url + 'admin/api/V1/video/approvevideo';

  let data = JSON.stringify({
    data: {
      group_id: groupId,
      video_id: videoId,
      video_approved_yn: 'Y',
    },
  });

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authorisationToken,
  };

  try {
    response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers,
    });
    console.log('approve video', response.data);
  } catch (error) {
    console.log('error -->', error);
  }
  return response;
};

const rejectVideoApi = async (videoId, groupId, videoApproved) => {
  let response;

  let authorisationToken = await AsyncStorage.getItem('sessiontoken');

  const url = Base_Url + 'admin/api/V1/video/approvevideo';

  let data = JSON.stringify({
    data: {
      group_id: groupId,
      video_id: videoId,
      video_approved_yn: videoApproved,
    },
  });

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authorisationToken,
  };

  try {
    response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers,
    });
    console.log('reject video', response.data);
  } catch (error) {
    console.log('error -->', error);
  }
  return response;
};

const searchVideoApi = async videoName => {
  let response;

  const url = Base_Url + 'admin/api/V3/video/getVideo';

  const authorisationToken = await AsyncStorage.getItem('sessiontoken');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authorisationToken,
  };
  let data = JSON.stringify({
    category: 'N',
    search_term: videoName,
    page: 0,
    android_verion: 1,
  });

  try {
    response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers,
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getSubCategories = async categoryId => {
  let response;

  const url = Base_Url + 'admin/api/V1/video/getsubcategories';

  const authorisationToken = await AsyncStorage.getItem('sessiontoken');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authorisationToken,
  };
  let data = JSON.stringify({
    category_id: categoryId,
  });

  try {
    response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers,
    });

    // console.log('getsubcategory', response.data)

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUserInfo = async userId => {
  userId = userId?.toString();

  let response;

  const url = Base_Url + 'admin/api/V1/general/getUser';

  const authorisationToken = await AsyncStorage.getItem('sessiontoken');

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + authorisationToken,
  };
  let data = new FormData();
  data.append('user_id', userId);

  try {
    response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers,
    });

    // console.log('get user', response.data)

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addVideoView = async (video_id)=>{
  console.log('add videoid', video_id)
  let response;

  const url = Base_Url + 'admin/api/V1/video/addView';

  const authorisationToken = await AsyncStorage.getItem('sessiontoken');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authorisationToken,
  };
  let data = JSON.stringify({
    video_id: video_id
  });

  try {
    response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers,
    });

    console.log('add video view', response.data)

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// const closeAccount = async ()=>{
//   let response;

//   const url = Base_Url + 'admin/api/V1/general/closeaccount';

//   const authorisationToken = await AsyncStorage.getItem('sessiontoken');

//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: 'Bearer ' + authorisationToken,
//   };
//   let data = JSON.stringify({
//     account_closed_yn: "Y"
//   });

//   try {
//     response = await axios.post(url, data, {
//       headers,
//     });
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
//   return response;
// }

export {
  encryptedPasswordApi,
  loginApi,
  forgotPasswordApi,
  communityVideoApi,
  categoriesAPI,
  categoryWiseVideApi,
  changePasswordApi,
  groupApi,
  getMyVideosApi,
  createManualApi,
  editGroupApi,
  getGroupUsersApi,
  getGroupVideosApi,
  removeGroupUserApi,
  deleteManualApi,
  getVideoViewsApi,
  addUserInGroupApi,
  uploadImageApi,
  addGroupUserApi,
  addVideosInGroup,
  removeVideoApi,
  approveVideoApi,
  rejectVideoApi,
  searchVideoApi,
  getSubCategories,
  getUserInfo,
  addVideoView,
  // closeAccount
};
