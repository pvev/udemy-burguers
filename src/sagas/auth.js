import { put, delay } from "redux-saga/effects";
import * as actions from "../store/actions/";
import axios from "axios";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutSucceed());
}

export function* unauthenticateSaga(action) {
  yield delay(action.authExpiration * 1000);
  yield put(actions.logout());
}

export function* authSaga(action) {
  yield put(actions.authStarted());

  action.authData = { ...action.authData, returnSecureToken: true };
  let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";

  if (action.authData.isSignIn) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  }

  const key = "AIzaSyABJV_ZRYT44SAjlxAKLNWdJO06XfMRZI8";
  try {
    const response = yield axios.post(url + key, action.authData);
    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    // save results in local storage for persist auth data
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);

    yield put(actions.authSuccess(response.data));
    yield put(actions.unauthenticate(response.data.expiresIn));
  } catch (error) {
    console.error(error);
    yield actions.authFailure(error.response.data.error.message || error);
  }
}
