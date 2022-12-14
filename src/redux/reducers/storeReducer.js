import {
  RESET_STORE,
  GET_ALL_STORE_LIST,
  GET_ALL_STORE_LIST_BY_ALPHA,
} from "../actions/types";

const INITIAL_STATE = {
  storeListByAlpha: [],
  storeList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_STORE_LIST_BY_ALPHA:
      return { ...state, storeListByAlpha: action.payload };
    case GET_ALL_STORE_LIST:
      return { ...state, storeList: action.payload };
    case RESET_STORE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
