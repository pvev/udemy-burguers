import * as actionTypes from "../actions/actionTypes.js";
import { updateObject } from "../../shared/utility.js";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  errorLoadingIngredients: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 1,
  meat: 1.3,
};

const loadIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    errorLoadingIngredients: false,
    totalPrice: 4,
  });
};

const addIngredient = (state, action) => {
  const updatedIngredients = {
    ...state.ingredients,
  };
  updatedIngredients[action.ingredientType] =
    state.ingredients[action.ingredientType] + 1;
  const newPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredientType];
  return updateObject(
    { ingredients: updatedIngredients },
    { totalPrice: newPrice }
  );
};

const removeIngredient = (state, action) => {
  if (state.ingredients[action.ingredientType] === 0) {
    return;
  }
  const updatedIngredientsRemove = {
    ...state.ingredients,
  };
  updatedIngredientsRemove[action.ingredientType] =
    state.ingredients[action.ingredientType] - 1;
  const newPriceRemove =
    state.totalPrice - INGREDIENT_PRICES[action.ingredientType];
  return updateObject(
    {
      ingredients: updatedIngredientsRemove,
    },
    { totalPrice: newPriceRemove }
  );
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_INGREDIENTS:
      return loadIngredients(state, action);
    case actionTypes.ERROR_LOADING_INGREDIENTS:
      return updateObject(state, { errorLoadingIngredients: true });
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    default:
      return state;
  }
};

export default reducer;
