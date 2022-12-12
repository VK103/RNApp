import { RESET_STORE, GET_ALL_COUNTRIES } from "../actions/types";

const INITIAL_STATE = {
  allCountriesList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return { ...state, allCountriesList: action.payload };
    case RESET_STORE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
