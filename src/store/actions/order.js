import axios from "../../axios-orders";
import * as actionTypes from "./actionTypes";

export const purchaseBurger = (order) => {
  return (dispatch) => {
    dispatch(purchaseOrderStarted());
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.props.history.push("/");
        dispatch(purchaseOrderSuccess(response.data, order));
      })
      .catch((error) => {
        dispatch(purchaseOrderFailure(error));
      });
  };
};

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
