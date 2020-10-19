import burgerBuilderReducer from "./burgerBuilder";
import orderReducer from "./order";
import authReducer from "./auth";

import { combineReducers } from "redux";

export const reducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  orders: orderReducer,
  auth: authReducer,
});
