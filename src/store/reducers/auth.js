import * as actionTypes from "../actions/actionTypes.js";
import { updateObject } from "../utility.js";

const initialState = {
  token: null,
  userId: null,
  loadingAuthRequest: false,
  errorAuthenticating: false,
  errorAuthenticatingMsg: "",
};

const authStarted = (state) => {
  return updateObject(state, {
    loadingAuthRequest: true,
    errorAuthenticating: false,
  });
};

const authFailed = (state, error) => {
  return updateObject(state, {
    loadingAuthRequest: false,
    errorAuthenticating: true,
    errorAuthenticatingMsg: error || null,
  });
};

const authSuccess = (state, authData) => {
  return updateObject(state, {
    loadingAuthRequest: false,
    errorAuthenticating: false,
    token: authData.idToken || null,
    userId: authData.localId || null,
  });
};

const unauthenticate = (state) => {
  return updateObject(state, {
    token: null,
    userId: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_STARTED:
      return authStarted(state);
    case actionTypes.AUTH_FAILED:
      return authFailed(state, action.error);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action.authData);
    case actionTypes.AUTH_UNAUTHENTICATE:
      return unauthenticate(state);
    default:
      return state;
  }
};

export default reducer;
