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

export const logout = () => {
  return {
    type: actionTypes.AUTH_INIT_UNAUTHENTICATE,
  };
};

export const logoutSucceed = () => {
  return { type: actionTypes.AUTH_UNAUTHENTICATE };
};

export const unauthenticate = (authExpiration) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    authExpiration: authExpiration,
  };
};

export const auth = (authData) => {
  return {
    type: actionTypes.AUTH_USER,
    authData,
  };
};

export const checkAuthStatus = () => {
  return { type: actionTypes.CHECK_AUTH_STATUS };
};
