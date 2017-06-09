import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} from './types';
import firebase from 'firebase';

export const loginUser = (/*{ email, password, navigateTo }*/) => {

  return (dispatch) => {
    dispatch({ type: LOGIN_USER_START });
    /*firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user, navigateTo))
      .catch(error => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user, navigateTo))
          .catch(error => loginUserFailed(dispatch, error))
      });*/
  }
};

const loginUserSuccess = (dispatch, user, navigateTo) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
  // vai a home screen
  navigateTo('home')
}

const loginUserFailed = (dispatch, error)  => {
  dispatch({ type: LOGIN_USER_FAIL, payload: error })
}
