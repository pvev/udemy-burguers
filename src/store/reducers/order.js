import * as actionTypes from "../actions/actionTypes.js";
import { updateObject } from "../utility.js";

const initialState = {
  orders: [],
  loadingOrders: false,
  errorLoadingOrders: false,
  loadingPurchaseOrder: false,
  errorPurchasingOrder: false,
  purchaseCompleted: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_ORDERS_STARTED:
      return updateObject(state, {
        loadingOrders: true,
        errorLoadingOrders: false,
      });
    case actionTypes.LOAD_ORDERS_SUCCESS:
      return updateObject(state, {
        loadingOrders: false,
        errorLoadingOrders: false,
        orders: action.orders,
      });
    case actionTypes.LOAD_ORDERS_FAILED:
      return updateObject(state, {
        loadingOrders: false,
        errorLoadingOrders: true,
      });
    case actionTypes.PURCHASE_BURGUER_STARTED:
      return updateObject(state, { loadingPurchaseOrder: false });
    case actionTypes.PURCHASE_PROCESS_INIT:
      return updateObject(state, { purchaseCompleted: false });
    case actionTypes.PURCHASE_BURGUER_SUCCESS:
      const newOrder = updateObject(action.orderData, { id: action.orderId });
      const newOrders = updateObject(state.orders, newOrder);
      return updateObject(state, {
        ...state,
        loadingPurchaseOrder: false,
        errorPurchasingOrder: false,
        purchaseCompleted: true,
        orders: newOrders,
      });
    case actionTypes.PURCHASE_BURGUER_FAILURE:
      return updateObject(state, {
        loadingPurchaseOrder: false,
        errorPurchasingOrder: false,
        purchaseCompleted: false,
      });

    default:
      return state;
  }
};

export default reducer;
