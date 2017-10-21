import { types } from '../actions/home';

const initialHomeState = {};

export default function home(state = initialHomeState, action = {}) {
  const { payload } = action;
  switch (action.type) {
    case types.GET_HOME_INFO:
      return {
        ...state
      };
    case types.GET_HOME_INFO_SUCCESS:
      return {
        ...state,
        payload
      };
    case types.GET_HOME_INFO_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
