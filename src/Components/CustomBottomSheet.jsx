import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
import {addVideosInGroup, groupApi} from '../api/axiosApi';
import Button from './Button';
import LoaderModal from './LoaderModal';

const CustomBottomSheet = props => {
  // console.log('bottom sheet', props);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [groupData, setGroupData] = useState([]);
  const isFocused = useIsFocused();
  const [loaderModal, setLoaderModal] = useState(false);

  useEffect(() => {
    getGroups();
  }, [isFocused]);

  const addVideoIntoGroup = async () => {
    if (props?.videosBookmark) {
      setLoaderModal(true);
      const videoData = [];
      videoData.push({
        video_id: props.videoBookmarkData.video_id,
        group_id: value?.groupId,
      });

      const response = await addVideosInGroup(videoData);
      props?.setVideosData(prevVideos =>
        prevVideos.map(video => {
          if (video?.video_id === props?.videoBookmarkData?.video_id) {
            console.log('inside if');
            return {...video, group_count: video?.group_count + 1};
          }
          return video;
        }),
      );
      props?.setVideoAddedInManualToastModal(true);
      setTimeout(() => {
        props?.setVideoAddedInManualToastModal(false);
      }, 1500);
      setLoaderModal(false);
      props.setBottomSheetModal(false);
    }

    if (props?.categoriesBookMark) {
      setLoaderModal(true);
      console.log('hlw hemant');
      console.log('videoid', props.videoBookmarkData.video_id);
      console.log('group id', value?.groupId);
      const videoData = [];
      videoData.push({
        video_id: props.videoBookmarkData.video_id,
        group_id: value?.groupId,
      });
      console.log('hlwwww');

      const response = await addVideosInGroup(videoData);
      console.log(response.status);
      if (response.status == 200) {
        console.log('successful');
      }

      props?.setVideosData(previous =>
        previous?.map(videoCategory => ({
          ...videoCategory,
          video_details: videoCategory.video_details.map(video => {
            if (video?.video_id === props.videoBookmarkData.video_id) {
              console.log('condition satisfied');
              return {...video, group_count: video?.group_count + 1};
            } else {
              return video;
            }
          }),
        })),
      );

      props?.setVideoAddedInManualToastModal(true);
      setTimeout(() => {
        props?.setVideoAddedInManualToastModal(false);
      }, 1500);
      setLoaderModal(false);
      props.setBottomSheetModal(false);
    }

    if (props?.categoriesViewAllBookMark) {
      console.log('hemant');
      setLoaderModal(true);

      const videoData = [];
      videoData.push({
        video_id: props.videoBookmarkData.video_id,
        group_id: value?.groupId,
      });
      console.log('hlwwww');

      const response = await addVideosInGroup(videoData);
      console.log(response.status);
      if (response.status == 200) {
        console.log('successful');
      }

      props?.setVideosData(previous =>
        previous?.map(video => {
          if (video?.video_id === props?.videoBookmarkData?.video_id) {
            console.log('inside if');
            return {...video, group_count: video?.group_count + 1};
          } else {
            return video;
          }
        }),
      );

      props?.setVideoAddedInManualToastModal(true);
      setTimeout(() => {
        props?.setVideoAddedInManualToastModal(false);
      }, 1500);
      setLoaderModal(false);
      props.setBottomSheetModal(false);
    }

    if (props?.favouriteVideoBookmark) {
      setLoaderModal(true);

      const videoData = [];
      videoData.push({
        video_id: props.videoBookmarkData.video_id,
        group_id: value?.groupId,
      });

      const response = await addVideosInGroup(videoData);
      console.log(response.status);
      if (response.status == 200) {
        console.log('successful');
      }

      props?.setVideosData(previous =>
        previous?.map(videoCategory => ({
          ...videoCategory,
          video_details: videoCategory?.video_details?.map(video => {
            if (video?.video_id === props.videoBookmarkData.video_id) {
              console.log('condition satisfied');
              return {...video, group_count: video?.group_count + 1};
            } else {
              return video;
            }
          }),
        })),
      );
      props?.setVideoAddedInManualToastModal(true);
      setTimeout(() => {
        props?.setVideoAddedInManualToastModal(false);
      }, 1500);
      setLoaderModal(false);
      props.setBottomSheetModal(false);
    }

    if(props?.myVideosBookmark){
      setLoaderModal(true);

      const videoData = [];
      videoData.push({
        video_id: props.videoBookmarkData.video_id,
        group_id: value?.groupId,
      });

      const response = await addVideosInGroup(videoData);
      console.log(response.status);
      if (response.status == 200) {
        console.log('successful');
      }

      props?.setVideosData(previous =>
        previous?.map(videoCategory => ({
          ...videoCategory,
          video_details: videoCategory?.video_details?.map(video => {
            if (video?.video_id === props.videoBookmarkData.video_id) {
              console.log('condition satisfied');
              return {...video, group_count: video?.group_count + 1};
            } else {
              return video;
            }
          }),
        })),
      );
      props?.setVideoAddedInManualToastModal(true);
      setTimeout(() => {
        props?.setVideoAddedInManualToastModal(false);
      }, 1500);
      setLoaderModal(false);
      props.setBottomSheetModal(false)
    }

    if(props?.myVideosViewAllBookmark){
      setLoaderModal(true);
      const videoData = [];
      videoData.push({
        video_id: props.videoBookmarkData.video_id,
        group_id: value?.groupId,
      });

      const response = await addVideosInGroup(videoData);
      if(response.status == 200){
        console.log('successful')
      }
      props?.setVideosData(prevVideos =>
        prevVideos.map(video => {
          if (video?.video_id === props?.videoBookmarkData?.video_id) {
            console.log('inside if');
            return {...video, group_count: video?.group_count + 1};
          }
          return video;
        }),
      );
      props?.setVideoAddedInManualToastModal(true);
      setTimeout(() => {
        props?.setVideoAddedInManualToastModal(false);
      }, 1500);
      setLoaderModal(false);
      props.setBottomSheetModal(false);
    }

    if (props?.favouriteViewAllVideoBookmark) {
      setLoaderModal(true);
      const videoData = [];
      videoData.push({
        video_id: props.videoBookmarkData.video_id,
        group_id: value?.groupId,
      });

      const response = await addVideosInGroup(videoData);
      props?.setVideosData(prevVideos =>
        prevVideos.map(video => {
          if (video?.video_id === props?.videoBookmarkData?.video_id) {
            console.log('inside if');
            return {...video, group_count: video?.group_count + 1};
          }
          return video;
        }),
      );
      props?.setVideoAddedInManualToastModal(true);
      setTimeout(() => {
        props?.setVideoAddedInManualToastModal(false);
      }, 1500);
      setLoaderModal(false);
      props.setBottomSheetModal(false);
    }
  };

  const getGroups = async () => {
    setLoaderModal(true);
    try {
      const response = await groupApi();
      console.log('groupData', response.data)
      const temporaryGroupHolder = response?.data?.groups;
      const temporaryGroupNameHolder = temporaryGroupHolder.map(group => ({
        groupId: group?.group_id,
        groupName: group?.group_name,
      }));
      setGroupData(temporaryGroupNameHolder);
      setLoaderModal(false);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };
  return (
    <Modal
      visible={props.bottomSheeetModal}
      animationType="slide"
      transparent={true}>
      <TouchableOpacity
        onPress={() => props.setBottomSheetModal(false)}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}></TouchableOpacity>
      <View style={styles.container}>
        {(value || isFocus) && (
          <Text style={[styles.label, isFocus && {color: 'blue'}]}>
            Manual Name
          </Text>
        )}
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={groupData}
          search
          maxHeight={responsiveScreenHeight(50)}
          labelField="groupName"
          valueField="groupId"
          placeholder={
            !isFocus ? (value ? value.groupName : 'Select Manual...') : '...'
          }
          searchPlaceholder="Search..."
          dropdownPosition="top"
          inverted={false}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            if (isFocused) {
              setValue(item);
              setIsFocus(false);
            }
          }}
        />

        <View
          style={{marginTop: 10, paddingHorizontal: '2%', marginBottom: '0%'}}>
          <Button
            label={'Submit'}
            onPress={addVideoIntoGroup}
            bookmarkVideo={'bookmarkVideo'}
          />
        </View>
        <LoaderModal visible={loaderModal} transparent={true} />
      </View>
    </Modal>
  );
};

export default CustomBottomSheet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
