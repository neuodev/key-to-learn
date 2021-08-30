import {
  POST_CREATE_RESET,
  POST_CREATE_ERROR,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
} from "../actions/constants";
const featuredPostsInitialState = {
  posts: [],
  loading: false,
  eror: null,
};

export const createPostReducer = (
  state = {
    loading: false,
    error: null,
    success: null,
  },
  { type, payload }
) => {
  switch (type) {
    case POST_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case POST_CREATE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case POST_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: payload,
      };
    case POST_CREATE_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };
    default:
      return state;
  }
};
