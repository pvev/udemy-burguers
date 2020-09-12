import React, { Component } from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {},
  };

  componentDidMount = () => {
    console.log(this.props);
    let query = new URLSearchParams(this.props.location.search);
    let ingredients = JSON.parse(query.get("ingredients"));
    this.setState({ ingredients });
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
      </div>
    );
  }
}

export default Checkout;
