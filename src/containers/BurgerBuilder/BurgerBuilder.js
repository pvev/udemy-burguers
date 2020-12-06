import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import { connect } from "react-redux";
import {
  addIngredient,
  removeIngredient,
  loadIngredients,
  purchaseOrderInit,
} from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
  };

  componentDidMount = () => {
    this.props.onLoadIngredients();
  };

  isPurchasable = (ingredients) => {
    const sum1 = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum1 > 0;
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
    this.props.onPurchaseOrderInit();
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search:
    //     "ingredients=" +
    //     JSON.stringify(this.props.ingredients) +
    //     "&totalPrice=" +
    //     this.props.totalPrice,
    // });
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.errorLoadingIngredients ? (
      "Failed to load ingredients!"
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients}></Burger>
          <BuildControls
            totalPrice={this.props.totalPrice}
            disabled={disabledInfo}
            removeIngredient={(type) => this.props.onIngredientRemoved(type)}
            purchasable={this.isPurchasable(this.props.ingredients)}
            purchasing={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
            addIngredient={(type) => this.props.onIngredientAdded(type)}
          ></BuildControls>
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          purchaseContinue={this.purchaseContinueHandler}
          totalPrice={this.props.totalPrice}
          purchaseCancel={this.purchaseCancelHandler}
          ingredients={this.props.ingredients}
        ></OrderSummary>
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          modalClosed={this.purchaseCancelHandler}
          show={this.state.purchasing}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    errorLoadingIngredients: state.burgerBuilder.errorLoadingIngredients,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientType) =>
      dispatch(addIngredient(ingredientType)),
    onIngredientRemoved: (ingredientType) =>
      dispatch(removeIngredient(ingredientType)),
    onLoadIngredients: () => dispatch(loadIngredients()),
    onPurchaseOrderInit: () => dispatch(purchaseOrderInit()),
  };
};

const burgerBuilder = connect(
  mapStateToProps,
  mapDispatchToProps
)(BurgerBuilder);

export default withErrorHandler(burgerBuilder, axios);
