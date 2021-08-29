import {
  USER_JOIN_ERROR,
  USER_JOIN_REQUEIST,
  USER_JOIN_RESET,
  USER_JOIN_SUCCESS,
} from "../actions/constants";
export const registerUserReducer = (
  state = {
    loading: false,
    error: null,
    success: false,
  },
  { type, payload }
) => {
  switch (type) {
    case USER_JOIN_REQUEIST:
      return {
        ...state,
        loading: true,
      };
    case USER_JOIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    case USER_JOIN_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };
    case USER_JOIN_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        success: false,
      };
    default:
      return state;
  }
};
