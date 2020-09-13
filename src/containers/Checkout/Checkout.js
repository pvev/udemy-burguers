import React, { Component } from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: {},
    totalPrice: 0,
  };

  componentDidMount = () => {
    let query = new URLSearchParams(this.props.location.search);
    let ingredients = JSON.parse(query.get("ingredients"));
    let totalPrice = JSON.parse(query.get("totalPrice"));

    this.setState({ ingredients, totalPrice });
  };

  checkoutContinueHandler = () => {
    this.props.history.push("/checkout/contact-data");
  };

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCancelled={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
          ingredients={this.state.ingredients}
        ></CheckoutSummary>
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...this.props}
            ></ContactData>
          )}
        ></Route>
      </div>
    );
  }
}

export default Checkout;
