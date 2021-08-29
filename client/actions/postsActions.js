import {
  FEATURED_POSTS_ERROR,
  FEATURED_POSTS_REQUEST,
  FEATURED_POSTS_SUCCESS,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_ERROR,
} from "./constants";
import axios from "axios";

export const getFeaturedPosts = () => async (dispatch) => {
  dispatch({
    type: FEATURED_POSTS_REQUEST,
  });

  try {
    const { data } = await axios.get("/api/v1/posts", {
      params: {
        select: "createdAt,thumbnail,domain,header,slug",
        limit: 3,
        sort: "-createdAt",
      },
    });
    dispatch({
      type: FEATURED_POSTS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FEATURED_POSTS_ERROR,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

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
