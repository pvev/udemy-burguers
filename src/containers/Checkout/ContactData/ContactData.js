import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";

import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";

import classes from "./ContactData.module.css";
import Input from "../../../components/UI/Forms/Input";

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
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal Code",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
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
      },
    },
    loading: false,
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
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  changeHandler = (event, inputIdentifier) => {
    console.log(event.target.value);
    const newStateOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...newStateOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    newStateOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: newStateOrderForm });
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

        <Button btnType="Success" type="submit">
          SEND
        </Button>
      </form>
    );
    if (this.state.loading) {
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

export default ContactData;
