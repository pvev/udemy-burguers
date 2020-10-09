import burgerBuilderReducer from "./burgerBuilder";
import orderReducer from "./order";

import { combineReducers } from "redux";

export const reducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  orders: orderReducer,
});
