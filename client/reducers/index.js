import { combineReducers } from "redux";
import { featuredPostsReducer } from "./postsReducer";
import { layoutReducer } from "./usersReducer";
export default combineReducers({
  featuredPosts: featuredPostsReducer,
  layout: layoutReducer,
});
