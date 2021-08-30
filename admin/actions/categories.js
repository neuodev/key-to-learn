import axios from "axios";
import {
  GET_CATEGORIES_ERROR,
  GET_CATEGORIES_REQUIES,
  GET_CATEGORIES_SUCCES,
} from "./constants";
export const getCategories = () => async (dispatch, state) => {
  dispatch({
    type: GET_CATEGORIES_REQUIES,
  });
  try {
    const {
      data: { categories },
    } = await axios.get("/api/v1/categories");
    dispatch({
      type: GET_CATEGORIES_SUCCES,
      payload: categories,
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
