import { takeEvery } from "redux-saga/effects";
import {
  logoutSaga,
  unauthenticateSaga,
  authSaga,
  checkAuthStatusSaga,
} from "./auth";

import { loadIngredientsSaga } from "./burgerBuilder";

import * as actionTypes from "../store/actions/actionTypes";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INIT_UNAUTHENTICATE, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, unauthenticateSaga);
  yield takeEvery(actionTypes.AUTH_USER, authSaga);
  yield takeEvery(actionTypes.CHECK_AUTH_STATUS, checkAuthStatusSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.START_LOADING_INGREDIENTS, loadIngredientsSaga);
}
