import { combineReducers } from "redux";
import { userReduser } from "./userReducer";

export default combineReducers({
  user: userReduser,
});
