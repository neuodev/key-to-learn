import axios from "axios";
import {
  GET_CATEGORIES_ERROR,
  GET_CATEGORIES_REQUIES,
  CREATE_CATEGORIES_REQUIES,
  CREATE_CATEGORIES_SUCCESS,
  CREATE_CATEGORIES_ERROR,
  GET_CATEGORIES_SUCCESS,
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
      type: GET_CATEGORIES_SUCCESS,
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

export const createCategory = (data) => async (dispatch, state) => {
  dispatch({
    type: CREATE_CATEGORIES_REQUIES,
  });

  const user = state().user;
  const conifg = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${user.userInfo.token}`,
    },
  };
  try {
    await axios.post("/api/v1/categories", data, conifg);
    dispatch({
      type: CREATE_CATEGORIES_SUCCESS,
      payload: categories,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORIES_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
