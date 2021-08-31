import {
  POST_CREATE_RESET,
  POST_CREATE_ERROR,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_DELETE_REQUEST,
  POST_DELETE_ERROR,
  POST_DELETE_SUCCESS,
  POST_DELETE_RESET,
} from "../actions/constants";

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

export const deletePost = (
  state = {
    loading: false,
    error: null,
    success: null,
  },
  { type, payload }
) => {
  switch (type) {
    case POST_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case POST_DELETE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case POST_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: payload,
      };
    case POST_DELETE_RESET:
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

export const updatePost = (
  state = {
    loading: false,
    error: null,
    success: null,
  },
  { type, payload }
) => {
  switch (type) {
    case POST_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case POST_DELETE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case POST_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: payload,
      };
    case POST_DELETE_RESET:
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
