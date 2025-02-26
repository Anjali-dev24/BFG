import {SET_IMAGE, SET_USER_DETAILS, SET_USER_INFO, SET_USER_STATUS} from '../types';

const initialState = {
  userImage: '',
  userData: {
    firstName: '',
    lastName: '',
    password: '',
    email: '',
  },
  userDetails:{
    email: '',
    token:'',
    expiry:''
  },
  status:false, 
};
export const ImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGE:
      console.log('image' + JSON.stringify(state.userImage));
      return {
        ...state,
        userImage: action.payload,
      };
    default:
      return state;
  }
};

export const UserStatus =(state = initialState, action) => {
  switch (action.type) {
    case SET_USER_STATUS:
      console.log('userStatus' + JSON.stringify(state));
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export const userDetails =(state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      console.log('details' + JSON.stringify(state));
      return {
        ...state,
        userDetails: action.payload,
      };
    default:
      return state;
  }
};

export const SignUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      console.log('firstName' + JSON.stringify(action.payload.firstName));
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        password: action.payload.password,
        email: action.payload.password,
      };
    default:
      return state;
  }
};

