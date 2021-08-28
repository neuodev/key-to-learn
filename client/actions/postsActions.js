import {
  FEATURES_POSTS_ERROR,
  FEATURES_POSTS_REQUEST,
  FEATURES_POSTS_SUCCESS,
} from "./constants";
import axios from "axios";

export const getFeaturedPosts = () => async (dispatch) => {
  dispatch({
    type: FEATURES_POSTS_REQUEST,
  });

  try {
    const { data } = await axios.get("/api/v1/posts");
    console.log(data);
    dispatch({
      type: FEATURES_POSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FEATURES_POSTS_ERROR,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
