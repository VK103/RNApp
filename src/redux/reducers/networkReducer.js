import { NETWORK_CONNECTED, RESET_STORE } from '../actions/types';

const INITIAL_STATE = {
    isConnected: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NETWORK_CONNECTED:
            return { ...state, isConnected: action.payload };
        case RESET_STORE:
            return INITIAL_STATE
        default:
            return state;
    }
};