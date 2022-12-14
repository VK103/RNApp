import { combineReducers } from "redux";
import authReducer from "./authReducer";
import networkReducer from "./networkReducer";
import storeReducer from "./storeReducer";

const appReducer = combineReducers({
  network: networkReducer,
  auth: authReducer,
  stores: storeReducer,
});

export default function rootReducer(state, action) {
  let finalState = appReducer(state, action);
  return finalState;
}
