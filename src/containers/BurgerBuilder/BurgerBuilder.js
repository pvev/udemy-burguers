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
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount = () => {
    // axios
    //   .get("https://react-my-burger-1740b.firebaseio.com/ingredients.json")
    //   .then((results) => {
    //     this.setState({ ingredients: results.data });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     this.setState({ error: true });
    //   });
  };

  updatePurchaseState = (ingredients) => {
    const sum1 = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum1 > 0 });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push({
      pathname: "/checkout",
      search:
        "ingredients=" +
        JSON.stringify(this.props.ingredients) +
        "&totalPrice=" +
        this.state.totalPrice,
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? "Failed to load ingredients!" : <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients}></Burger>
          <BuildControls
            totalPrice={this.props.totalPrice}
            disabled={disabledInfo}
            removeIngredient={(type) => this.props.onIngredientRemoved(type)}
            purchasable={this.state.purchasable}
            purchasing={this.purchaseHandler}
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
  return { ingredients: state.ingredients, totalPrice: state.totalPrice };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientType) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientType: ingredientType,
      }),
    onIngredientRemoved: (ingredientType) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientType: ingredientType,
      }),
  };
};

const burgerBuilder = connect(
  mapStateToProps,
  mapDispatchToProps
)(BurgerBuilder);

export default withErrorHandler(burgerBuilder, axios);
