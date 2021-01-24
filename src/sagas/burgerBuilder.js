import { put } from "redux-saga/effects";
import * as actions from "../store/actions/";
import axios from "../axios-orders";

export function* loadIngredientsSaga() {
  try {
    const results = yield axios.get(
      "https://react-my-burger-1740b.firebaseio.com/ingredients.json"
    );
    yield put(actions.loadSyncIngredients(results.data));
  } catch (e) {
    yield put(actions.errorLoadingIngredients());
  }
}
