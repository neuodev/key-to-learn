import {
  FEATURED_POSTS_ERROR,
  FEATURED_POSTS_REQUEST,
  FEATURED_POSTS_SUCCESS,
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
