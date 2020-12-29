import * as actionTypes from "../actions/actionTypes.js";
import { updateObject } from "../../shared/utility.js";

const initialState = {
  orders: [],
  loadingOrders: false,
  errorLoadingOrders: false,
  loadingPurchaseOrder: false,
  errorPurchasingOrder: false,
  purchaseCompleted: false,
};

const loadOrdersStarted = (state) => {
  return updateObject(state, {
    loadingOrders: true,
    errorLoadingOrders: false,
  });
};

const loadOrdersSuccess = (state, action) => {
  return updateObject(state, {
    loadingOrders: false,
    errorLoadingOrders: false,
    orders: action.orders,
  });
};

const loadOrdersFailed = (state) => {
  return updateObject(state, {
    loadingOrders: false,
    errorLoadingOrders: true,
  });
};

const purchaseBurgerStarted = (state) => {
  return updateObject(state, { loadingPurchaseOrder: true });
};

const purchaseBurgerInit = (state) => {
  return updateObject(state, { purchaseCompleted: false });
};

const purchaseBurguerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  const newOrders = updateObject(state.orders, newOrder);
  return updateObject(state, {
    ...state,
    loadingPurchaseOrder: false,
    errorPurchasingOrder: false,
    purchaseCompleted: true,
    orders: newOrders,
  });
};

const purchaseBurgerFailure = (state) => {
  return updateObject(state, {
    loadingPurchaseOrder: false,
    errorPurchasingOrder: false,
    purchaseCompleted: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_ORDERS_STARTED:
      return loadOrdersStarted(state);
    case actionTypes.LOAD_ORDERS_SUCCESS:
      return loadOrdersSuccess(state, action);
    case actionTypes.LOAD_ORDERS_FAILED:
      return loadOrdersFailed(state);
    case actionTypes.PURCHASE_BURGUER_STARTED:
      return purchaseBurgerStarted(state);
    case actionTypes.PURCHASE_PROCESS_INIT:
      return purchaseBurgerInit(state);
    case actionTypes.PURCHASE_BURGUER_SUCCESS:
      return purchaseBurguerSuccess(state, action);
    case actionTypes.PURCHASE_BURGUER_FAILURE:
      return purchaseBurgerFailure(state, action);

    default:
      return state;
  }
};

export default reducer;
