import * as actionTypes from "../actions/actionTypes.js";

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
      return {
        ...state,
        ingredients: action.ingredients,
        errorLoadingIngredients: false,
      };

    case actionTypes.ERROR_LOADING_INGREDIENTS:
      return { ...state, errorLoadingIngredients: true };

    case actionTypes.ADD_INGREDIENT:
      //   console.log("add ingredient");
      const updatedIngredients = {
        ...state.ingredients,
      };
      updatedIngredients[action.ingredientType] =
        state.ingredients[action.ingredientType] + 1;
      const newPrice =
        state.totalPrice + INGREDIENT_PRICES[action.ingredientType];
      //   updatePurchaseState(updatedIngredients);
      return { ingredients: updatedIngredients, totalPrice: newPrice };

    case actionTypes.REMOVE_INGREDIENT:
      //   console.log("removeIngredient");
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
      //   updatePurchaseState(updatedIngredientsRemove);
      return {
        ingredients: updatedIngredientsRemove,
        totalPrice: newPriceRemove,
      };

    default:
      return state;
  }
};

export default reducer;
