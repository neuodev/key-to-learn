import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { USER_INFO } from "./utils";

const ISSERVER = typeof window === "undefined";
let userInfo = null;
if (!ISSERVER) {
  userInfo = localStorage.getItem(USER_INFO)
    ? JSON.parse(localStorage.getItem(USER_INFO))
    : null;
}
const initialState = {
  user: {
    userInfo,
  },
};

const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
