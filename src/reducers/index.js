import { combineReducers } from 'redux';
import authReducer from './authReducer';
import petReducer from './petReducer';
import userReducer from './userReducer';
const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  pet: petReducer
})

export default appReducer;
