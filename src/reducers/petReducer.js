import { FINDLIST_FETCH_ERROR, FINDLIST_FETCH_START, FINDLIST_FETCH_SUCCESS } from '../actions/types';
const initialState = {
  isLoading: false,
  petList: []
}
export default petReducer = (state = initialState, action) => {
  switch(action.type){
    case FINDLIST_FETCH_START:
      return {...state, isLoading: true}
    break;
    case FINDLIST_FETCH_SUCCESS:
      return {petList: action.payload, isLoading: false}
    break;
    case FINDLIST_FETCH_ERROR:
      return {...state, isLoading: false}
    default:
      return state;
  }
}
