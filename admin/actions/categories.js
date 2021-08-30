import axios from "axios";
import {
  GET_CATEGORIES_ERROR,
  CREATE_CATEGORIES_SUCCESS,
  CREATE_CATEGORIES_ERROR,
  GET_CATEGORIES_SUCCESS,
  UPDATE_CATEGORIES_SUCCESS,
  UPDATE_CATEGORIES_ERROR,
  DELETE_CATEGORIES_REQUEST,
  DELETE_CATEGORIES_ERROR,
  DELETE_CATEGORIES_SUCCESS,
  CREATE_CATEGORIES_REQUEST,
  UPDATE_CATEGORIES_REQUEST,
  GET_CATEGORIES_REQUEST,
} from "./constants";
export const getCategories = () => async (dispatch, state) => {
  dispatch({
    type: GET_CATEGORIES_REQUEST,
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
    type: CREATE_CATEGORIES_REQUEST,
  });

  const user = state().user;
  const conifg = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${user.userInfo.token}`,
    },
  };
  try {
    const { data: message } = await axios.post(
      "/api/v1/categories",
      data,
      conifg
    );
    dispatch({
      type: CREATE_CATEGORIES_SUCCESS,
      payload: message.success,
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

export const updateCategory = (id, data) => async (dispatch, state) => {
  dispatch({
    type: UPDATE_CATEGORIES_REQUEST,
  });

  const user = state().user;
  const conifg = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${user.userInfo.token}`,
    },
  };
  try {
    const { data: message } = await axios.put(
      `/api/v1/categories/${id}`,
      data,
      conifg
    );
    dispatch({
      type: UPDATE_CATEGORIES_SUCCESS,
      payload: message.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORIES_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCategory = (id, subcategory) => async (dispatch, state) => {
  dispatch({
    type: DELETE_CATEGORIES_REQUEST,
  });

  const user = state().user;
  const params = {};
  if (subcategory) {
    params.subcategory = subcategory;
  }
  try {
    const { data: message } = await axios.delete(`/api/v1/categories/${id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user.userInfo.token}`,
      },
      params: params,
    });
    dispatch({
      type: DELETE_CATEGORIES_SUCCESS,
      payload: message.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORIES_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
