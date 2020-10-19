import axios from "../../axios-orders";
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
  return (dispatch) => {
    dispatch(authStarted());
  };
};
