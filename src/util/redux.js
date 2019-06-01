import * as R from "ramda";

export const payloadIdentity = R.curry((name, payload) => ({
  [name]: payload
}));
