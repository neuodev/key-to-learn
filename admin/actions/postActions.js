import {
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_ERROR,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_ERROR,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_ERROR,
} from "./constants";
import axios from "axios";

export const createPost = (postData) => async (dispatch, state) => {
  dispatch({
    type: POST_CREATE_REQUEST,
  });
  const user = state().user;

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${user.userInfo.token}`,
    },
  };
  try {
    const { data } = await axios.post("/api/v1/posts", postData, config);
    dispatch({
      type: POST_CREATE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: POST_CREATE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePost = (id) => async (dispatch, state) => {
  dispatch({
    type: POST_DELETE_REQUEST,
  });
  const user = state().user;

  const config = {
    headers: {
      Authorization: `Bearer ${user.userInfo.token}`,
    },
  };
  try {
    const { data } = await axios.delete(`/api/v1/posts/${id}`, config);
    dispatch({
      type: POST_DELETE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: POST_DELETE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePost = (id, postData) => async (dispatch, state) => {
  dispatch({
    type: POST_UPDATE_REQUEST,
  });
  const user = state().user;

  const config = {
    headers: {
      Authorization: `Bearer ${user.userInfo.token}`,
      "content-type": "application/json",
    },
  };
  try {
    const { data } = await axios.put(`/api/v1/posts/${id}`, postData, config);
    console.log("update", data);
    dispatch({
      type: POST_UPDATE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: POST_UPDATE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
