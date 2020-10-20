import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};

export const authFailure = (error) => {
  return { type: actionTypes.AUTH_FAILED, error: error };
};

export const authStarted = () => {
  return { type: actionTypes.AUTH_STARTED };
};

export const auth = (authData) => {
  console.log(authData);
  authData = {...authData, returnSecureToken: true};
  return (dispatch) => {
    dispatch(authStarted());
    axios
      .post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyABJV_ZRYT44SAjlxAKLNWdJO06XfMRZI8", authData)
      .then((response) => {
        console.log(response.data);
        dispatch(authSuccess(response.data, authData));
      })
      .catch((error) => {
        console.error(error);
        dispatch(authFailure(error));
      });
  };
};
