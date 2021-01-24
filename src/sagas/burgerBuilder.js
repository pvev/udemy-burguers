import { put } from "redux-saga/effects";
import * as actions from "../store/actions/";
import axios from "axios";

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
// export function* checkAuthStatusSaga() {
//   const token = yield localStorage.getItem("token");
//   if (!token) {
//     yield put(actions.logout());
//   } else {
//     const expirationDate = yield new Date(
//       localStorage.getItem("expirationDate")
//     );
//     if (expirationDate > new Date()) {
//       const userId = yield localStorage.getItem("userId");
//       yield put(actions.authSuccess({ localId: userId, idToken: token }));
//       yield put(
//         yield actions.unauthenticate(
//           (expirationDate.getTime() - new Date().getTime()) / 1000
//         )
//       );
//     } else {
//       yield put(actions.logout());
//     }
//   }
// }
