import { put } from "redux-saga/effects";
import * as actions from "../store/actions/";
import axios from "../axios-orders";

export function* purchaseBurgerSaga(action) {
  const { token, order } = action.payload;
  yield put(actions.purchaseOrderStarted());
  try {
    const response = yield axios.post("/orders.json?auth=" + token, order);
    yield put(actions.purchaseOrderSuccess(response.data, order));
  } catch (error) {
    console.error(error);
    yield put(actions.purchaseOrderFailure(error));
  }
}

export function* loadOrdersSaga(action) {
  const { token, userId } = action.payload;
  yield put(actions.loadOrdersStarted());
  try {
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    const response = yield axios.get("/orders.json" + queryParams);
    let fetchedOrders = [];
    fetchedOrders =
      response.data &&
      Object.keys(response.data).map((key) => {
        return { ...response.data[key], id: key };
      });
    if (fetchedOrders && fetchedOrders.length > 0) {
      yield put(actions.loadOrdersSucess(fetchedOrders));
    }
  } catch (error) {
    yield put(actions.loadOrdersFail());
  }
}
