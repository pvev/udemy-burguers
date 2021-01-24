import * as actionTypes from "./actionTypes";

export const purchaseBurger = (order, token) => {
  return { type: actionTypes.PURCHASE_BURGUER, payload: { order, token } };
};

export const loadOrders = (token, userId) => {
  return { type: actionTypes.LOAD_ORDERS, payload: { token, userId } };
};

// purchase orders actions
export const purchaseOrderSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGUER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseOrderFailure = (error) => {
  return { type: actionTypes.PURCHASE_BURGUER_FAILURE, error: error };
};

export const purchaseOrderStarted = () => {
  return { type: actionTypes.PURCHASE_BURGUER_STARTED };
};

export const purchaseOrderInit = () => {
  return { type: actionTypes.PURCHASE_PROCESS_INIT };
};

// load orders actions
export const loadOrdersStarted = () => {
  return { type: actionTypes.LOAD_ORDERS_STARTED };
};

export const loadOrdersSucess = (orders) => {
  return { type: actionTypes.LOAD_ORDERS_SUCCESS, orders: orders };
};

export const loadOrdersFail = () => {
  return { type: actionTypes.LOAD_ORDERS_FAILED };
};
