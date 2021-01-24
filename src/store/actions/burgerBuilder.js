import * as actionTypes from "./actionTypes";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientType: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientType: name,
  };
};

export const loadSyncIngredients = (ing) => {
  return {
    type: actionTypes.LOAD_INGREDIENTS,
    ingredients: ing,
  };
};

export const errorLoadingIngredients = () => {
  return { type: actionTypes.ERROR_LOADING_INGREDIENTS };
};

export const loadIngredients = () => {
  return { type: actionTypes.START_LOADING_INGREDIENTS };
};
