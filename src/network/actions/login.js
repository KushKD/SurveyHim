// actions/someActions.js
import axios from "../api";

import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../action_types";
// Action Creators
export const fetchLoginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const fetchLoginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Async Action to Fetch Data
export const onLogin = (username, password) => {
  return async (dispatch) => {
    try {
      console.log("jsoasd");
      const response = await axios.post(
        "/signIn",
        JSON.stringify({
          username: username,
          password: password,
        })
      );
      dispatch(fetchLoginSuccess(response.data));
    } catch (error) {
      dispatch(fetchLoginFailure(error));
    }
  };
};
