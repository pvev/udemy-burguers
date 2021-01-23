import { takeEvery } from "redux-saga/effects";
import { logoutSaga, unauthenticateSaga, authSaga } from "./auth";
import * as actionTypes from "../store/actions/actionTypes";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INIT_UNAUTHENTICATE, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, unauthenticateSaga);
  yield takeEvery(actionTypes.AUTH_USER, authSaga);
}
