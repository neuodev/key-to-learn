import { combineReducers } from "redux";
import { userReduser } from "./userReducer";
import {
  categoriesReducer,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./categoriesReducer";
export default combineReducers({
  user: userReduser,
  categories: categoriesReducer,
  createCategory,
  updateCategory,
  deleteCategory,
});
