import * as R from "ramda";

export const payloadIdentity = R.curry((name, payload) => ({
  [name]: payload
}));

export const loadingMutation = R.curry(({ name, type }, state, action) => ({
  ...state,
  [`loading${name}`]: type === "loading",
  [`failure${name}`]: type === "failure" ? action.payload.failMessage : null,
  [`success${name}`]: type === "success"
}));
