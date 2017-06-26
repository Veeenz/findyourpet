import {
  FIND_CREATE,
  FINDLIST_FETCH_SUCCESS,
  DOWNLOAD_INITIALTODOLIST_START,
  DOWNLOAD_INITIALTODOLIST_SUCCESS,
  FINDLIST_FETCH_START
 } from './types';
import firebase from 'firebase';

export const findCreate = ({ title, location, duedate, descr,image,latitudeMarker,longitudeMarker, navigateBack }) => {
  const { currentUser } = firebase.auth();
  console.log('currentUser', currentUser.uid);
  navigateBack();

  return (dispatch) => {
    firebase.database().ref(`/DataList`)
      .push({ title, location, duedate, descr,image,latitudeMarker,longitudeMarker})
      //.then(() => dispatch({ type: 'FIND_CREATE'} ))
      .then(() => console.log('Aggiunta eseguita con successo'))

  }
}

export const findlistFetch = () => {

  return (dispatch) => {
    dispatch({ type: FINDLIST_FETCH_START });
    //firebase.database().ref(`Findlist/${currentUser.uid}/`)
    firebase.database().ref("FindList").orderByKey()
      .on('value', snapshot => {
        dispatch({ type: FINDLIST_FETCH_SUCCESS, payload: snapshot.val()})
        dispatch({ type: DOWNLOAD_INITIALLIST_SUCCESS })
      })
  }
};
