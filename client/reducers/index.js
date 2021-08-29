import { combineReducers } from "redux";
import { featuredPostsReducer } from "./postsReducer";
import { layoutReducer } from "./layoutReducer";
import { registerUserReducer, userReduser } from "./usersReducer";
export default combineReducers({
  featuredPosts: featuredPostsReducer,
  layout: layoutReducer,
  join: registerUserReducer,
  user: userReduser,
});
