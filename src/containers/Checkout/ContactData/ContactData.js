import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";

import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";

import classes from "./ContactData.module.css";
import Input from "../../../components/UI/Forms/Input";

import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

import { purchaseBurger } from "../../../store/actions";

import { updateObject, checkValidity } from "../../../shared/utility.js";

import { connect } from "react-redux";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
          touched: false,
          errorMessage: "Please, enter a valid Name",
        },
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
          touched: false,
          isEmail: true,
          errorMessage:
            "Please, enter a valid Email in the format name@domain.xyz",
        },
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
          touched: false,
          errorMessage: "Please, enter a valid Street",
        },
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal Code",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
          touched: false,
          errorMessage: "Please, enter a valid Postal",
          minLength: 5,
          maxLength: 5,
        },
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
          touched: false,
          errorMessage: "Please, enter a valid Country",
        },
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {
          required: false,
          valid: true,
          touched: false,
          errorMessage: "",
        },
      },
    },
    formValid: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: this.state.orderForm.name.value,
        addres: {
          street: this.state.orderForm.street.value,
          zipCode: this.state.orderForm.postalCode.value,
          country: this.state.orderForm.country.value,
        },
        email: this.state.orderForm.email.value,
      },
      deliveryMethod: this.state.orderForm.deliveryMethod.value,
      userId: this.props.userId,
    };

    this.props.onOrderFormSubmit(order, this.props.token);
  };

  changeHandler = (event, inputIdentifier) => {
    const newStateOrderForm = updateObject(this.state.orderForm, {});
    const updatedFormElement = updateObject(
      this.state.orderForm[inputIdentifier],
      {
        value: event.target.value,
        validation: updateObject(
          this.state.orderForm[inputIdentifier].validation,
          {
            touched: true,
            valid: checkValidity(
              event.target.value,
              this.state.orderForm[inputIdentifier].validation
            ),
          }
        ),
      }
    );
    // verify the validity of the whole form
    let formValidty = Object.keys(this.state.orderForm).every((key) => {
      return this.state.orderForm[key].validation.valid;
    });

    newStateOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: newStateOrderForm, formValid: formValidty });
  };

  render() {
    let form = (
      <form className={classes.Form} onSubmit={this.handleSubmit}>
        {Object.keys(this.state.orderForm).map((key, i) => {
          let currObj = this.state.orderForm[key];
          return (
            <Input
              {...currObj}
              key={key + i}
              change={(e) => this.changeHandler(e, key)}
            ></Input>
          );
        })}

        <Button
          btnType="Success"
          type="submit"
          disabled={!this.state.formValid}
        >
          SEND
        </Button>
      </form>
    );
    if (this.props.loadingPurchaseOrder) {
      form = <Spinner></Spinner>;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loadingPurchaseOrder: state.orders.loadingPurchaseOrder,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderFormSubmit: (order, token) => dispatch(purchaseBurger(order, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
