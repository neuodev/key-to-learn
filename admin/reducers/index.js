import { combineReducers } from "redux";
import { userReduser } from "./userReducer";
import { categoriesReducer, createCategory } from "./categoriesReducer";
export default combineReducers({
  user: userReduser,
  categories: categoriesReducer,
  createCategory,
});
