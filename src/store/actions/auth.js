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
