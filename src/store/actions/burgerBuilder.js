import * as actionTypes from "./actionTypes";

import axios from "../../axios-orders";

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
  return (dispatch) => {
    axios
      .get("https://react-my-burger-1740b.firebaseio.com/ingredients.json")
      .then((results) => {
        // this.setState({ ingredients: results.data });
        // this.props.onIngredientsLoaded(results.data);
        dispatch(loadSyncIngredients(results.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(errorLoadingIngredients());
      });
  };
};
