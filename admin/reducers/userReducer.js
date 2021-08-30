import {
  USER_SIGNIN_ERROR,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_RESET,
  USER_SIGNIN_SUCCESS,
} from "../actions/constants";
import { USER_INFO } from "../utils";

export const userReduser = (
  state = {
    loading: false,
    error: null,
    userInfo: null,
  },
  { type, payload }
) => {
  switch (type) {
    case USER_SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userInfo: payload,
      };
    case USER_SIGNIN_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        userInfo: null,
      };
    case USER_SIGNIN_RESET:
      // Remove from localStorage
      localStorage.removeItem(USER_INFO);
      return {
        ...state,
        loading: false,
        error: null,
        userInfo: null,
      };
    default:
      return state;
  }
};
