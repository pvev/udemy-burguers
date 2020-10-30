import React from "react";

import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

import { Route, Switch } from "react-router-dom";
import Auth from "./containers/Auth/Auth";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/auth" component={Auth}></Route>
          <Route path="/logout" component={Auth}></Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
