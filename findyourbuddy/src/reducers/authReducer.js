import { LOGIN_USER_START, LOGIN_USER_SUCCESS } from '../actions/types';
let initialState = {
  user: null
}
export default authReducer = (state = initialState, action) => {
  switch(action.type){
    case LOGIN_USER_START:

      return {...state, isLoading: true}
    case LOGIN_USER_SUCCESS:

      console.log('Loggato correttamente')
      
      return {...state, user: action.payload, isLoading: false}

    default:
      return state;
  }

}
