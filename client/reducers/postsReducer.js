import {
  FEATURED_POSTS_ERROR,
  FEATURED_POSTS_REQUEST,
  FEATURED_POSTS_SUCCESS,
  GET_ALL_POSTS_ERROR,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_CATEGORIES_ERROR,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  POST_CREATE_ERROR,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  SEARCH_POSTS_ERROR,
  SEARCH_POSTS_REQUEST,
  SEARCH_POSTS_RESET,
  SEARCH_POSTS_SUCCESS,
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

export const createPostReducer = (
  state = {
    loading: false,
    error: null,
    success: null,
  },
  { type, payload }
) => {
  switch (type) {
    case POST_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case POST_CREATE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case POST_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: payload,
      };

    default:
      return state;
  }
};

export const searchPostReducer = (
  state = {
    loading: false,
    error: null,
    posts: [],
  },
  { type, payload }
) => {
  switch (type) {
    case SEARCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        posts: null,
      };
    case SEARCH_POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case SEARCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: payload.data,
        count: payload.count,
      };
    case SEARCH_POSTS_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        posts: [],
      };
    default:
      return state;
  }
};
export const getCategories = (
  state = {
    loading: false,
    error: null,
    categories: null,
  },
  { type, payload }
) => {
  switch (type) {
    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CATEGORIES_SUCCESS:
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
        categories: null,
      };

    default:
      return state;
  }
};

export const getAllPosts = (
  state = {
    loading: false,
    error: null,
    posts: [],
    count: 0,
  },
  { type, payload }
) => {
  switch (type) {
    case GET_ALL_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_POSTS_SUCCESS:
      const filteredPosts = [];
      const allIds = new Set();
      const allPosts = [...state.posts, ...payload.data];

      for (const post of allPosts) {
        if (!allIds.has(post._id)) {
          filteredPosts.push(post);
          allIds.add(post._id);
        }
      }

      return {
        ...state,
        loading: false,
        error: null,
        posts: filteredPosts,
        count: payload.count,
      };
    case GET_ALL_POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        posts: [],
      };

    default:
      return state;
  }
};
