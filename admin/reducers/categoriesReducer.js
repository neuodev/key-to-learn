import {
  GET_CATEGORIES_ERROR,
  GET_CATEGORIES_REQUIES,
  GET_CATEGORIES_SUCCES,
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
    case GET_CATEGORIES_REQUIES:
      return {
        ...state,
        loading: true,
      };
    case GET_CATEGORIES_SUCCES:
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
        categories: nll,
      };

    default:
      return state;
  }
};
