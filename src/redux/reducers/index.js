import { combineReducers } from 'redux';
import networkReducer from './networkReducer';

const appReducer = combineReducers({
    network: networkReducer,
});

export default function rootReducer(state, action) {
    let finalState = appReducer(state, action);
    return finalState;
}
