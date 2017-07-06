import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_LOGOUT,
  USER_PROFILE_INFORMATION,
  USER_SET_LOCATION,
  USER_SET_MARKER,
  FINDLIST_FETCH_SUCCESS,
  FIND_CREATE
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

export const SignUpUser= ({email,password,navigateTo}) => {

  return (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => loginUser({
            email: email,
            password: password,
            navigateTo: navigateTo
        }))
    .catch((error) => console.log(error));
  }


}


export const logoutUser = (dispatch) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_LOGOUT})
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


export const findListFetch = () => {
  return (dispatch) => {
    firebase.database().ref("/DataList")
    .on("value", snap => {
      dispatch({type:FINDLIST_FETCH_SUCCESS, payload: snap.val()})
    })
  }
}

export const findCreate = ({ title, location, duedate, descr, images ,latitudeMarker,longitudeMarker, navigateBack}) => {
  const { currentUser } = firebase.auth();
  console.log('currentUser', currentUser.uid);
  navigateBack();


  return (dispatch) => {
    let formData = new FormData();
      //for (x in image){
        var localUri = image;
        var filename = localUri.split('/').pop();

        // Infer the type of the image
        var match = /\.(\w+)$/.exec(filename);
        var type = match ? `image/${match[1]}` : `image`;
        formData.append('photo', { uri: localUri, name: filename, type });
      //}
      fetch('http://188.213.170.165:8050/insert', {
        method: 'POST',
        body: formData,
        header: {
          'content-type': 'multipart/form-data',
        },
    });
    firebase.database().ref(`/DataList`)
      .push({ title, location, duedate, descr,images,latitudeMarker,longitudeMarker})
      .then((data) => {
          console.log(data);
          console.log('Aggiunta eseguita con successo')
      })
  }
}
