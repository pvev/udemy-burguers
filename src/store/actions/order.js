import axios from "../../axios-orders";
import * as actionTypes from "./actionTypes";

export const purchaseBurger = (order, token) => {
  return (dispatch) => {
    dispatch(purchaseOrderStarted());
    axios
      .post("/orders.json?auth=" + token, order)
      .then((response) => {
        // this.props.history.push("/");
        dispatch(purchaseOrderSuccess(response.data, order));
      })
      .catch((error) => {
        console.error(error);
        dispatch(purchaseOrderFailure(error));
      });
  };
};

export const loadOrders = (token) => {
  return (dispatch) => {
    dispatch(loadOrdersStarted());
    axios
      .get("/orders.json?auth=" + token)
      .then((res) => {
        let fetchedOrders = [];
        fetchedOrders =
          res.data &&
          Object.keys(res.data).map((key) => {
            return { ...res.data[key], id: key };
          });
        if (fetchedOrders && fetchedOrders.length > 0) {
          dispatch(loadOrdersSucess(fetchedOrders));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(loadOrdersFail());
      });
  };
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
