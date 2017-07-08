import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_LOGOUT,
  USER_PROFILE_INFORMATION,
  USER_SET_LOCATION,
  USER_SET_MARKER,
  FINDLIST_FETCH_SUCCESS,
  FIND_CREATE,
  SIGNUP_USER_FAIL,
  SIGNUP_USER_START,
  SIGNUP_USER_SUCCESS
} from './types';
import firebase from 'firebase';

export const loginUser = ({ email, password, navigateTo }) => {
  console.log("entra sulla funzione login")
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_START });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user, navigateTo))
      .catch(error => {
        console.log("errore sign")
        loginUserFailed(dispatch,error)
      });
  }
};

const loginUserSuccess = (dispatch, user, navigateTo) => {
  console.log("Login effettuato")
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
  // vai a home screen
  navigateTo()
}

const loginUserFailed = (dispatch, error)  => {
  dispatch({ type: LOGIN_USER_FAIL, payload: error })

}

const signupUserSuccess = (dispatch, email,password, navigateBack) => {
  console.log("Registrazione effettuata")
  dispatch({type: SIGNUP_USER_SUCCESS})
  console.log("Loggato")

  loginUser({
    email: email,
    password: password,
    navigateTo: navigateBack
  })

  //navigateBack()
}

const signupUserFailed= (dispatch,error) => {
  alert(error)
}

export const SignUpUser= ({email,password,navigateToBack}) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_USER_START });
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => signupUserSuccess(dispatch,email,password,navigateToBack))
    .catch((error) =>{ signupUserFailed(dispatch,error) });
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
    for (image in images){
        var localUri = image;
        var filename = localUri.split('/').pop();

        // Infer the type of the image
        var match = /\.(\w+)$/.exec(filename);
        var type = match ? `image/${match[1]}` : `image`;
        formData.append('photo', { uri: localUri, name: filename, type });
      }
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
