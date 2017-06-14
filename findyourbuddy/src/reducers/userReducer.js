import { USER_PROFILE_INFORMATION, USER_SET_LOCATION, USER_SET_MARKER } from '../actions/types';
let initialState = {
  latitude: 15.102032,
  longitude: 36.019283,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
  latidudeMarker: 0.0,
  longitudeMarker: 0.0
}
export default userReducer = (state = initialState, action) => {
  switch(action.type){
    case USER_PROFILE_INFORMATION:
      return {
        ...state,
        email: action.payload.email
      }

    case USER_SET_LOCATION:
      return{
        ...state,
        longitude: action.payload.longitude,
        latitude: action.payload.latitude,
        longitudeMarker: action.payload.longitude,
        latidudeMarker: action.payload.latitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    case USER_SET_MARKER:
      return{
        ...state,
        longitudeMarker: action.payload.longitude,
        latitudeMarker: action.payload.latitude,
      }
    default:
      return state;
  }
}
