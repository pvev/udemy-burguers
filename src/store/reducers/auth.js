import * as actionTypes from "../actions/actionTypes.js";
import { updateObject } from "../utility.js";

const initialState = {
  loadingAuthRequest: false,
  errorAuthenticating: false,
};

const authStarted = (state) => {
  debugger;
  return updateObject(state, {
    loadingAuthRequest: true,
    errorLoadingOrders: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_STARTED:
      return authStarted(state);
    default:
      return state;
  }
};

export default reducer;
