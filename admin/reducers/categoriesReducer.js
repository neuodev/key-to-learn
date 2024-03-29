import {
  CREATE_CATEGORIES_ERROR,
  CREATE_CATEGORIES_REQUEST,
  CREATE_CATEGORIES_RESET,
  CREATE_CATEGORIES_SUCCESS,
  DELETE_CATEGORIES_ERROR,
  DELETE_CATEGORIES_REQUEST,
  DELETE_CATEGORIES_RESET,
  DELETE_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  UPDATE_CATEGORIES_ERROR,
  UPDATE_CATEGORIES_REQUEST,
  UPDATE_CATEGORIES_RESET,
  UPDATE_CATEGORIES_SUCCESS,
} from "../actions/constants";

export const categoriesReducer = (
  state = {
    loading: false,
    error: null,
    categories: null,
  },
  { type, payload }
) => {
  switch (type) {
    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categories: payload,
      };
    case GET_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        categories: null,
      };

    default:
      return state;
  }
};

export const createCategory = (
  state = {
    loading: false,
    error: null,
    success: null,
  },
  { type, payload }
) => {
  switch (type) {
    case CREATE_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: payload,
      };
    case CREATE_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        success: null,
      };
    case CREATE_CATEGORIES_RESET:
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

export const updateCategory = (
  state = {
    loading: false,
    error: null,
    success: null,
  },
  { type, payload }
) => {
  switch (type) {
    case UPDATE_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: payload,
      };
    case UPDATE_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        success: null,
      };
    case UPDATE_CATEGORIES_RESET:
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

export const deleteCategory = (
  state = {
    loading: false,
    error: null,
    success: null,
  },
  { type, payload }
) => {
  switch (type) {
    case DELETE_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: payload,
      };
    case DELETE_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        success: null,
      };
    case DELETE_CATEGORIES_RESET:
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
