import { REPORT_FETCH_ERROR, REPORT_FETCH_START, REPORT_FETCH_SUCCESS,REPORT_ADD_START,REPORT_ADD_SUCCESS,REPORT_ADD_ERROR } from '../actions/types';
const initialState = {
  isLoading: false,
  list: []
}
export default reportReducer = (state = initialState, action) => {
  switch(action.type){
    case REPORT_FETCH_START:
        return { ...state, isLoading: true }
    case REPORT_FETCH_SUCCESS:
        return { isLoading: false, list: action.payload}
    case REPORT_ADD_START:
        return {...state, isLoading: true}
    break;
    case REPORT_ADD_SUCCESS:
        return {...state, isLoading: false}
    break;
    case REPORT_ADD_ERROR:
    break;
    default:
      return state;
  }
}
