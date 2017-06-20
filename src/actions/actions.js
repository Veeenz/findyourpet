import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_LOGOUT,
  USER_PROFILE_INFORMATION,
  USER_SET_LOCATION,
  USER_SET_MARKER
} from './types';
import firebase from 'firebase';

export const loginUser = ({ email, password, navigateTo }) => {

  return (dispatch) => {
    dispatch({ type: LOGIN_USER_START });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user, navigateTo))
      .catch(error => {
        loginUserFailed(dispatch,error)
        /*firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user, navigateTo))
          .catch(error => loginUserFailed(dispatch, error))*/
      });
  }
};

const loginUserSuccess = (dispatch, user, navigateTo) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
  // vai a home screen
  navigateTo('Main')
}

const loginUserFailed = (dispatch, error)  => {
  dispatch({ type: LOGIN_USER_FAIL, payload: error })

}


export const logoutUser = (dispatch, navigateTo) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_LOGOUT})
    navigateTo('Login')
  }
}

export const userProfileInformation = (dispatch) => {
  return (dispatch) => {
    const { currentUser } = firebase.auth();
    console.log('Current user: ');
    console.log(currentUser);
    console.log('END OF CURRENT USER @@@@@@@@')
    dispatch({type: USER_PROFILE_INFORMATION, payload: currentUser})
  }
}


export const setUserLocation = (coordinates) => {
  return (dispatch) =>{
    console.log("coordinates: ")
    console.log(coordinates);
    dispatch({type: USER_SET_LOCATION, payload: coordinates})
  }
}


export const setUserMarker = (coordinates) => {
  return (dispatch) =>{
    dispatch({type: USER_SET_MARKER, payload: coordinates})
  }
}
