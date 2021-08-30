import {
  USER_SIGNIN_ERROR,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_RESET,
} from "./constants";
import axios from "axios";
import { USER_INFO } from "../utils";

export const signIn = (userInfo) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
  });
  const conifg = {
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    const { data } = await axios.post("/api/v1/users/login", userInfo, conifg);
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem(USER_INFO, JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
