import { combineReducers } from "redux";
import { featuredPostsReducer } from "./postsReducer";
export default combineReducers({ featuredPosts: featuredPostsReducer });
