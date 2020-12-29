import { createStore, applyMiddleware, compose } from "redux";
import { reducer } from "./reducers/index.js";
import thunk from "redux-thunk";

const composeEnhancers =
  typeof window !== "undefined" && process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
