import React, { Component } from "react";

import Order from "../../components/Order/Order";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Aux/Aux";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount = () => {
    axios
      .get("/orders.json")
      .then((res) => {
        let fetchedOrders = [];
        fetchedOrders =
          res.data &&
          Object.keys(res.data).map((key) => {
            return { ...res.data[key], id: key };
          });
        if (fetchedOrders && fetchedOrders.length > 0) {
          this.setState({ orders: fetchedOrders });
        }
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  };
  render() {
    let orderList =
      this.state.orders.length > 0 ? (
        <div>
          {this.state.orders &&
            this.state.orders.map((order) => {
              return <Order key={order.id} order={order}></Order>;
            })}
        </div>
      ) : (
        <h1 style={{ margin: "5px auto", textAlign: "center" }}>
          No orders Placed
        </h1>
      );

    if (this.state.loading) {
      orderList = <Spinner></Spinner>;
    }
    return <Aux>{orderList}</Aux>;
  }
}

export default withErrorHandler(Orders, axios);
