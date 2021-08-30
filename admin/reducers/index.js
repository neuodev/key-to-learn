import { combineReducers } from "redux";
import { userReduser } from "./userReducer";
import {
  categoriesReducer,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./categoriesReducer";

import { createPostReducer } from "./postReducer";
export default combineReducers({
  user: userReduser,
  categories: categoriesReducer,
  createCategory,
  updateCategory,
  deleteCategory,
  createPost: createPostReducer,
});
