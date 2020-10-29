import axios from "axios";
import * as actionTypes from "./actionTypes";

const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};

const authFailure = (error) => {
  return { type: actionTypes.AUTH_FAILED, error: error };
};

const authStarted = () => {
  return { type: actionTypes.AUTH_STARTED };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_UNAUTHENTICATE,
  };
};

const unauthenticate = (authExpiration) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, authExpiration * 1000);
  };
};

export const auth = (authData) => {
  console.log(authData);
  authData = { ...authData, returnSecureToken: true };
  let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";

  if (authData.isSignIn) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  }

  const key = "AIzaSyABJV_ZRYT44SAjlxAKLNWdJO06XfMRZI8";
  return (dispatch) => {
    dispatch(authStarted());
    axios
      .post(url + key, authData)
      .then((response) => {
        console.log(response.data);
        dispatch(authSuccess(response.data, authData));
        dispatch(unauthenticate(response.data.expiresIn));
      })
      .catch((error) => {
        console.error(error);
        dispatch(authFailure(error.response.data.error.message || error));
      });
  };
};
