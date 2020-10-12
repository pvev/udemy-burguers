import * as actionTypes from "../actions/actionTypes.js";

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
      return { ...state, loadingOrders: true, errorLoadingOrders: false };
    case actionTypes.LOAD_ORDERS_SUCCESS:
      return {
        ...state,
        loadingOrders: false,
        errorLoadingOrders: false,
        orders: action.orders,
      };
    case actionTypes.LOAD_ORDERS_FAILED:
      return { ...state, loadingOrders: false, errorLoadingOrders: true };
    case actionTypes.PURCHASE_BURGUER_STARTED:
      return { ...state, loadingPurchaseOrder: true };
    case actionTypes.PURCHASE_PROCESS_INIT:
      return { ...state, purchaseCompleted: false };
    case actionTypes.PURCHASE_BURGUER_SUCCESS:
      const newOrder = { ...action.orderId, ...action.orderData };
      const newOrders = { ...state.orders, ...newOrder };
      return {
        ...state,
        loadingPurchaseOrder: false,
        errorPurchasingOrder: false,
        purchaseCompleted: true,
        orders: newOrders,
      };
    case actionTypes.PURCHASE_BURGUER_FAILURE:
      return {
        ...state,
        loadingPurchaseOrder: false,
        errorPurchasingOrder: false,
        purchaseCompleted: false,
      };
    default:
      return state;
  }
};

export default reducer;
