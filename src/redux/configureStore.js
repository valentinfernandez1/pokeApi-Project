import { applyMiddleware, combineReducers, createStore } from "redux";
import {Teams} from "./teams";
import {Pokemon} from './pokemon';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            pokemon: Pokemon,
            teams: Teams
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}