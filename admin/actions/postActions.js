import {
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_ERROR,
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
