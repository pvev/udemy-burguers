import React, { Component } from "react";

import Order from "../../components/Order/Order";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Aux/Aux";

import { connect } from "react-redux";
import { loadOrders } from "../../store/actions";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount = () => {
    this.props.onLoadOrders();
  };
  render() {
    let orderList =
      this.props.orders.length > 0 ? (
        <div>
          {this.props.orders &&
            this.props.orders.map((order) => {
              return <Order key={order.id} order={order}></Order>;
            })}
        </div>
      ) : (
        <h1 style={{ margin: "5px auto", textAlign: "center" }}>
          No orders Placed
        </h1>
      );

    if (this.props.loadingOrders) {
      orderList = <Spinner></Spinner>;
    } else if (this.props.errorLoadingOrders) {
      orderList = "Failed to load orders!";
    }
    return <Aux>{orderList}</Aux>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    loadingOrders: state.orders.loadingOrders,
    errorLoadingOrders: state.orders.errorLoadingOrders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadOrders: () => dispatch(loadOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
