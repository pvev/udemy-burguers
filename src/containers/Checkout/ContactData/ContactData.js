import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";

import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";

import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "Pablo Velez",
        addres: {
          street: "Test street",
          zipCode: "345rwe",
          country: "Spain",
        },
        email: "pablo@genesis.com",
      },
      deliveryMethod: "fastests",
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

  render() {
    let form = (
      <form action="" className={classes.Form}>
        <input
          className={classes.Input}
          name="name"
          placeholder="Your Name"
          type="text"
        />
        <input
          className={classes.Input}
          name="email"
          placeholder="Your Email"
          type="email"
        />
        <input
          className={classes.Input}
          name="street"
          placeholder="Your Street"
          type="text"
        />
        <input
          className={classes.Input}
          name="postal"
          placeholder="Your Postal"
          type="text"
        />
        <Button clicked={this.orderHandler} btnType="Success">
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
