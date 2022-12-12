import { combineReducers } from "redux";
import authReducer from "./authReducer";
import networkReducer from "./networkReducer";

const appReducer = combineReducers({
  network: networkReducer,
  auth: authReducer,
});

export default function rootReducer(state, action) {
  let finalState = appReducer(state, action);
  return finalState;
}
