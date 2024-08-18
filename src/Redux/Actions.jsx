import {
  Add_EXISTING_MEMBERS,
  Favourite_Video_Status,
  MANUAL_DETAILS_FOCUS,
  MANUAL_DETAILS_UNFOCUS,
  MY_MANUALS_FOCUS,
  MY_MANUALS_UNFOCUS,
  TOGGLE_SWITCH_1, 
  TOGGLE_SWITCH_2 ,
} from './Constants';

const myManualsFocus = item => {
  // console.log('item', item);
  return {
    type: MY_MANUALS_FOCUS,
    data: item,
  };
};

const myManualsUnfocus = item => {
  return {
    type: MY_MANUALS_UNFOCUS,
    data: item,
  };
};

const manualDetailsIsFocus = item => {
  // console.log('item', item);
  return {
    type: MANUAL_DETAILS_FOCUS,
    data: item,
  };
};

const manualDetailIsUnFocus = item => {
  // console.log('item', item);
  return {
    type: MANUAL_DETAILS_UNFOCUS,
    data: item,
  };
};

const existingMembers = item =>{
  // console.log(item)
  return{
    type: Add_EXISTING_MEMBERS,
    data: item,
  }
}

const favouriteVideo = item =>{
  return {
    type : Favourite_Video_Status,
    data : item
  }
}

 const toggleSwitch1 = () => ({
  type: TOGGLE_SWITCH_1,
});

 const toggleSwitch2 = () => ({
  type: TOGGLE_SWITCH_2,
});


export {
  myManualsFocus,
  myManualsUnfocus,
  manualDetailsIsFocus,
  manualDetailIsUnFocus,
  existingMembers,
  favouriteVideo,
  toggleSwitch1,
  toggleSwitch2
};
