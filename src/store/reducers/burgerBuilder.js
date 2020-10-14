import * as actionTypes from "../actions/actionTypes.js";
import { updateObject } from "../utility.js";

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_INGREDIENTS:
      return updateObject(state, {
        ingredients: action.ingredients,
        errorLoadingIngredients: false,
        totalPrice: 4,
      });

    case actionTypes.ERROR_LOADING_INGREDIENTS:
      return updateObject(state, { errorLoadingIngredients: true });

    case actionTypes.ADD_INGREDIENT:
      const updatedIngredients = {
        ...state.ingredients,
      };
      updatedIngredients[action.ingredientType] =
        state.ingredients[action.ingredientType] + 1;
      const newPrice =
        state.totalPrice + INGREDIENT_PRICES[action.ingredientType];
      return updateObject(
        { ingredients: updatedIngredients },
        { totalPrice: newPrice }
      );

    case actionTypes.REMOVE_INGREDIENT:
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

    default:
      return state;
  }
};

export default reducer;
