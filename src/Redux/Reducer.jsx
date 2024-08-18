import {Add_EXISTING_MEMBERS, Favourite_Video_Status, MANUAL_DETAILS_FOCUS, MANUAL_DETAILS_UNFOCUS, MY_MANUALS_FOCUS, MY_MANUALS_UNFOCUS,TOGGLE_SWITCH_1, TOGGLE_SWITCH_2} from './Constants';

const initialState = {
  myManualIsFocused : false,
  manualDetails : false, 
  existingMembers :[],
  favouriteVideo : false,
  isenabled1: false,
  isEnabled2: false,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_MANUALS_FOCUS:
      return {
        ...state, myManualIsFocused : action.data
      };

    case MY_MANUALS_UNFOCUS:
      return {
        ...state, myManualIsFocused : action.data
      };

      case MANUAL_DETAILS_FOCUS:
      return {
        ...state, manualDetails : action.data
      };

    case MANUAL_DETAILS_UNFOCUS:
      return {
        ...state, manualDetails : action.data
      };

      case Add_EXISTING_MEMBERS:
        return {
          ...state, existingMembers : action.data
        };


      case  Favourite_Video_Status : {

      }

    
        case TOGGLE_SWITCH_1:
          return {
            ...state,
            isenabled1: !state.isenabled1,
          };
        case TOGGLE_SWITCH_2:
          return {
            ...state,
            isEnabled2: !state.isEnabled2,
          };

    
    

    default:
      return state;
  }
};
