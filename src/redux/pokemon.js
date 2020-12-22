import * as ActionTypes from './ActionTypes';

export const Pokemon = (state = {
    isLoading: true,
    errMess: null,
    pokemon: null
    }, action) => {
    switch(action.type){
        case ActionTypes.GET_POKEMON:
            return {...state, isLoading: false, errMess: null, pokemon: action.payload}
        case ActionTypes.POKEMON_LOADING:
            return {...state, isLoading: true, errMess: null, pokemon: null}
        case ActionTypes.POKEMON_ERROR:
            return {...state, isLoading: false, errMess: action.payload, pokemon: null}
        default:
            return state;
    }
}
