import { FINDLIST_FETCH_ERROR, FINDLIST_FETCH_START, FINDLIST_FETCH_SUCCESS, FIND_ADD_START, FIND_ADD_SUCCESS, FIND_ADD_ERROR } from '../actions/types';
const initialState = {
  isLoading: false,
  list: []
}
export default petReducer = (state = initialState, action) => {
  switch(action.type){
    case FINDLIST_FETCH_START:
      return {...state, isLoading: true}
    break;
    case FINDLIST_FETCH_SUCCESS:
      return {list: action.payload, isLoading: false}
    break;
    case FINDLIST_FETCH_ERROR:
      return {...state, isLoading: false}
    break;
    case FIND_ADD_START:
        return {...state, isLoading: true}
    break;
    case FIND_ADD_SUCCESS:
        return {...state, isLoading: false}
    break;
    case FIND_ADD_ERROR:
    break;
    default:
      return state;
  }
}
