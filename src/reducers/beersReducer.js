import { FETCH_FULFILLED, SET_STATUS, FETCH_FAILED, RESET } from './beersActions';

const initialState = {
  data: [],
  status: 'idle'
};

export function beersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STATUS:
      return {
        ...state,
        status: action.payload
      }
    case RESET:
      return {
        ...state,
        status: 'idle',
        messages: []
      }
    case FETCH_FULFILLED:
      return {
        ...state,
        status: 'success',
        data: action.payload,
        message: []
      }
    case FETCH_FAILED:
      return {
        ...state,
        status: 'failure',
        messages: [{
          type: 'error',
          text: action.payload
        }]
      }
    default: return state;
  }
}