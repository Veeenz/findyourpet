import { REPORT_FETCH_ERROR, REPORT_FETCH_START, REPORT_FETCH_SUCCESS } from '../actions/types';
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
    default:
      return state;
  }
}
