import * as actionTypes from "../actions/actionTypes.js";

const initialState = {
  orders: [],
  loadingPurchaseOrder: false,
  errorPurchasingOrder: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGUER_STARTED:
      return { ...state, loadingPurchaseOrder: true };
    case actionTypes.PURCHASE_BURGUER_SUCCESS:
      const newOrder = { ...action.orderId, ...action.orderData };
      const newOrders = { ...state.orders.concat(newOrder) };
      return {
        ...state,
        loadingPurchaseOrder: false,
        errorPurchasingOrder: false,
        orders: newOrders,
      };
    case actionTypes.PURCHASE_BURGUER_FAILURE:
      return {
        ...state,
        loadingPurchaseOrder: false,
        errorPurchasingOrder: false,
      };
    default:
      return state;
  }
};

export default reducer;
