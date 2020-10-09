import React, { Component } from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

import { connect } from "react-redux";

import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  // componentDidMount = () => {
  //   let query = new URLSearchParams(this.props.location.search);
  //   let ingredients = JSON.parse(query.get("ingredients"));
  //   let totalPrice = JSON.parse(query.get("totalPrice"));

  //   this.setState({ ingredients, totalPrice });
  // };

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
          ingredients={this.props.ingredients}
        ></CheckoutSummary>
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        ></Route>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ingredients: state.burgerBuilder.ingredients };
};

export default connect(mapStateToProps)(Checkout);
