import {
  USER_JOIN_ERROR,
  USER_JOIN_REQUEIST,
  USER_JOIN_SUCCESS,
  USER_SIGNIN_ERROR,
  USER_SIGNIN_REQUEIST,
  USER_SIGNIN_SUCCESS,
} from "./constants";
import axios from "axios";

export const registerUser = (userInfo) => async (dispatch) => {
  dispatch({
    type: USER_JOIN_REQUEIST,
  });
  const conifg = {
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    await axios.post("/api/v1/users", userInfo, conifg);
    dispatch({
      type: USER_JOIN_SUCCESS,
    });

    //@todo Will dispatch login as will here
  } catch (error) {
    dispatch({
      type: USER_JOIN_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signIn = (userInfo) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEIST,
  });
  const conifg = {
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    const { data } = await axios.post("/api/v1/users/login", userInfo, conifg);
    console.log(data);
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });

    //@todo Will dispatch login as will here
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
