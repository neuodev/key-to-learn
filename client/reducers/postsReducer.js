import {
  FEATURED_POSTS_ERROR,
  FEATURED_POSTS_REQUEST,
  FEATURED_POSTS_SUCCESS,
} from "../actions/constants";
const featuredPostsInitialState = {
  posts: [],
  loading: false,
  eror: null,
};
export const featuredPostsReducer = (
  state = featuredPostsInitialState,
  { type, payload }
) => {
  switch (type) {
    case FEATURED_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FEATURED_POSTS_ERROR:
      return {
        ...state,
        loading: false,
        eror: payload,
      };
    case FEATURED_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: payload,
      };

    default:
      return state;
  }
};
