import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerOpenToggle = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <SideDrawer
          closed={this.sideDrawerOpenToggle}
          open={this.state.showSideDrawer}
          isAuthenticated={this.props.isAuthenticated}
        />
        <Toolbar
          openSideDrawer={this.sideDrawerOpenToggle}
          isAuthenticated={this.props.isAuthenticated}
        ></Toolbar>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
