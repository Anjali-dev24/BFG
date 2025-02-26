import {SET_IMAGE, SET_USER_DETAILS, SET_USER_INFO, SET_USER_STATUS} from '../types';
var myHeaders = new Headers();

export function setImageUri(userImage: string | undefined) {
  return {
    type: SET_IMAGE,
    payload: userImage,
  };
}

export function setUserStatus(status:boolean) {
  return {
    type: SET_USER_STATUS,
    payload: status,
  };
}

export function setUserDetails(userDetails:boolean) {
  return {
    type: SET_USER_DETAILS,
    payload: userDetails,
  };
}


export function setUserInfo(
  firstName: string,
  lastName: string,
  password: any,
  email: any,
) {
  return {
    type: SET_USER_INFO,
    firstName: firstName,
    lastName: lastName,
    password: password,
    email: email,
  };
}

export function getPageList(
  firstName: string,
  lastName: string,
  password: string,
  email: string,
) {
   (dispatch:any) => {
    fetch('http://192.168.1.21:3000/user/signup', {
      method: 'POST',
      body: JSON.stringify({
        fname: firstName,
        lname: lastName,
        password: password,
        email: email,
      }),
      headers: myHeaders,
    })
      .then(res => {
        console.log('apiReq' + JSON.stringify(res));
        dispatch(setUserInfo(firstName, lastName, password, email));

        return res || [];
      })
      .catch(err => {
        console.log(err);
      });
  };
}

