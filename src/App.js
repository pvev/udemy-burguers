import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";

import { checkAuthStatus } from "./store/actions/";

class App extends Component {
  componentDidMount = () => {
    this.props.onTryAutoSignIn();
  };
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Route path="/auth" component={Auth}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Redirect to="/"></Redirect>
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { onTryAutoSignIn: () => dispatch(checkAuthStatus()) };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
