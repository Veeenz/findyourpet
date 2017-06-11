import { USER_PROFILE_INFORMATION, USER_SET_LOCATION } from '../actions/types';
let initialState = {
  latitude: 15.102032,
  longitude: 36.019283,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}
export default userReducer = (state = initialState, action) => {
  switch(action.type){
    case USER_PROFILE_INFORMATION:
    console.log('@@@@@@@@@@ START ACTION PAYLOAD ')
    console.log(action.payload)
    console.log('@@@@@@@@@@ END ACTION PAYLOAD ')

      return {
        email: action.payload.email
      }

    case USER_SET_LOCATION:
      return{
        ...state,
        longitude: action.payload.longitude,
        latitude: action.payload.latitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    default:
      return state;
  }
}
