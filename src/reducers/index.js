import { combineReducers } from 'redux';
import authReducer from './authReducer';
import petReducer from './petReducer';
import userReducer from './userReducer';
import reportReducer from './reportReducer';
const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  pet: petReducer,
  report: reportReducer
})

export default appReducer;
