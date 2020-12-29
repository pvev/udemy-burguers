import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Forms/Input";

import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";

import { auth, logout } from "../../store/actions";

import classes from "./Auth.module.css";
import { Redirect } from "react-router-dom";

import { updateObject, checkValidity } from "../../shared/utility.js";

class Auth extends Component {
  state = {
    authForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "test@test.com",
        validation: {
          required: true,
          valid: false,
          isEmail: true,
          touched: false,
          errorMessage:
            "Please, enter a valid Email in the format name@domain.xyz",
        },
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "testuser",
        validation: {
          required: true,
          valid: false,
          minLength: 6,
          touched: false,
          errorMessage: "Please, enter a valid Password, min lenght 6 chars",
        },
      },
    },
    isSignIn: true,
    formValid: true,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const authInfo = {
      email: this.state.authForm.email.value,
      password: this.state.authForm.password.value,
      isSignIn: this.state.isSignIn,
    };
    this.props.onAuthFormSubmit(authInfo);
  };

  changeHandler = (event, inputIdentifier) => {
    const newStateAuthForm = updateObject(this.state.authForm, {});
    const updatedFormElement = updateObject(newStateAuthForm[inputIdentifier], {
      value: event.target.value,
      validation: updateObject(newStateAuthForm[inputIdentifier].validation, {
        touched: true,
        valid: checkValidity(
          event.target.value,
          newStateAuthForm[inputIdentifier].validation
        ),
      }),
    });
    // verify the validity of the whole form
    let formValidty = Object.keys(this.state.authForm).every((key) => {
      return this.state.authForm[key].validation.valid;
    });

    newStateAuthForm[inputIdentifier] = updatedFormElement;
    this.setState({ authForm: newStateAuthForm, formValid: formValidty });
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignIn: !prevState.isSignIn };
    });
  };

  buildingBurger = (ingredients) => {
    if (!ingredients) {
      return false;
    }
    const sum1 = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum1 > 0;
  };

  render() {
    if (this.props.isAuthenticated) {
      let redirectPath = "/";
      if (this.buildingBurger(this.props.ingredients)) {
        redirectPath = "/checkout";
      }
      return <Redirect to={redirectPath}></Redirect>;
    }
    let form = (
      <form className={classes.Form} onSubmit={this.handleSubmit}>
        {Object.keys(this.state.authForm).map((key, i) => {
          let currObj = this.state.authForm[key];
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
          {this.state.isSignIn ? "SIGN-IN" : "SIGN-UP"}
        </Button>
      </form>
    );

    if (this.props.loadingAuthRequest) {
      form = <Spinner></Spinner>;
    }

    let errorAuthenticating = null;

    if (this.props.errorAuthenticating) {
      errorAuthenticating = (
        <h3 className={classes.AuthError}>
          {this.props.errorAuthenticatingMsg}
        </h3>
      );
    }

    return (
      <div className={classes.Auth}>
        <h4>Enter your credentials</h4>
        {errorAuthenticating}
        {form}
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          {this.state.isSignIn
            ? "Don't have an account yet? SWITCH TO SIGN UP"
            : "Already have an account? SWITCH TO SIGN IN"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loadingAuthRequest: state.auth.loadingAuthRequest,
    errorAuthenticating: state.auth.errorAuthenticating,
    errorAuthenticatingMsg: state.auth.errorAuthenticatingMsg,
    isAuthenticated: state.auth.token !== null,
    ingredients: state.burgerBuilder.ingredients,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthFormSubmit: (authData) => dispatch(auth(authData)),
    onLogout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
