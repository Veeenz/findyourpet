import { LOGIN_USER_START } from '../actions/types';
let initialState = {
  data:'',
}
export default authReducer = (state = initialState, action) => {
  switch(action.type){
    case LOGIN_USER_START:
      console.log('hello world');
      return 'Hello world'
    default:
      return state;
  }

}
