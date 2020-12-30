import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes.js";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      loadingAuthRequest: false,
      errorAuthenticating: false,
      errorAuthenticatingMsg: "",
    });
  });

  it("should store the token on successful login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          loadingAuthRequest: false,
          errorAuthenticating: false,
          errorAuthenticatingMsg: "",
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          authData: { idToken: "token", localId: "userId" },
        }
      )
    ).toEqual({
      token: "token",
      userId: "userId",
      loadingAuthRequest: false,
      errorAuthenticating: false,
      errorAuthenticatingMsg: "",
    });
  });
});
