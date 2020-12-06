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
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
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
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        // save results in local storage for persist auth data
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);

        dispatch(authSuccess(response.data));
        dispatch(unauthenticate(response.data.expiresIn));
      })
      .catch((error) => {
        console.error(error);
        dispatch(authFailure(error.response.data.error.message || error));
      });
  };
};

export const checkAuthStatus = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess({ localId: userId, idToken: token }));
        dispatch(
          unauthenticate(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
