import { LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_LOGOUT,SIGNUP_USER_START,SIGNUP_USER_SUCCESS,SIGNUP_USER_FAIL } from '../actions/types';
let initialState = {
  user: null,
  error: null,
  isLoading: false,
  isLogged: false,
}
export default authReducer = (state = initialState, action) => {
  switch(action.type){
    case LOGIN_USER_START:
      console.log("Start login")
      return {...state, isLoading: true, error: null}
    case LOGIN_USER_SUCCESS:
      console.log('Loggato correttamente')
      return {...state, user: action.payload, isLoading: false, isLogged: true,error: null}
    case LOGIN_USER_FAIL:
      console.log('login user fail')
      return {
        error: action.payload,
        isLoading: false
      }
    case LOGIN_USER_LOGOUT:
      console.log('logout users')
      return {
        user: null,
        error: null,
        isLoading: false,
        isLogged: false
      }
    case SIGNUP_USER_START:
      console.log('Avvio della registrazione')
      return{
        user: null,
        error: null,
        isLoading: true,
        isLogged: false
      }
    case SIGNUP_USER_SUCCESS:
      console.log('Registrazione effettuatata')
      return{
        user: null,
        error: null,
        isLoading: false,
        isLogged: false
      }
    case SIGNUP_USER_FAIL:
      console.log('Errore Registrazione')
      return{
        user: null,
        error: action.payload,
        isLoading: false,
        isLogged: false
      }


    default:
      return state;
  }

}
