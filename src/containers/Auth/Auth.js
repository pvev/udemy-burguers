import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Forms/Input";

import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";

import { auth } from "../../store/actions";

import classes from "./Auth.module.css";

class Auth extends Component {
  state = {
    authForm: {
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
        value: "",
        validation: {
          required: true,
          valid: false,
          minLength: 6,
          touched: false,
          errorMessage: "Please, enter a valid Password, min lenght 6 chars",
        },
      },
    },
    isSignIn: false,
    formValid: false,
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

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  changeHandler = (event, inputIdentifier) => {
    const newStateAuthForm = { ...this.state.authForm };
    const updatedFormElement = { ...newStateAuthForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.validation.touched = true;

    updatedFormElement.validation.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
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
  render() {
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return { onAuthFormSubmit: (authData) => dispatch(auth(authData)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
