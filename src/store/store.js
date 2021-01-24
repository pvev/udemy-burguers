import { createStore, applyMiddleware, compose } from "redux";
import { reducer } from "./reducers/index.js";
import thunk from "redux-thunk";

import createSagaMiddleware from "redux-saga";

import { watchAuth, watchBurgerBuilder } from "../sagas/";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window !== "undefined" && process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);

export default store;
