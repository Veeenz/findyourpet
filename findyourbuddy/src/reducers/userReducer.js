import { USER_PROFILE_INFORMATION } from '../actions/types';
export default userReducer = (state = {}, action) => {
  switch(action.type){
    case USER_PROFILE_INFORMATION:
    console.log('@@@@@@@@@@ START ACTION PAYLOAD ')
    console.log(action.payload)
    console.log('@@@@@@@@@@ END ACTION PAYLOAD ')

      return {
        email: action.payload.email
      }
    default:
      return state;
  }
}
