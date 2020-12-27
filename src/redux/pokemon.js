import * as ActionTypes from './ActionTypes';

export const Pokemon = (state = {
    isLoading: true,
    errMess: null,
    pokemon: null,
    abilities: [],
    pkDescriptions: []
    }, action) => {
    switch(action.type){
        case ActionTypes.GET_POKEMON:
            return {...state, isLoading: false, errMess: null, pokemon: action.payload}
        case ActionTypes.POKEMON_LOADING:
            return {...state, isLoading: true, errMess: null, pokemon: null, abilities: state.abilities}
        case ActionTypes.POKEMON_ERROR:
            return {...state, isLoading: false, errMess: action.payload, pokemon: null, abilities: null}
        case ActionTypes.ADD_ABILITY:
            return {...state, abilities: state.abilities.concat(action.payload)}
        case ActionTypes.CLEAR_ABILITIES:
            return {...state, abilities: []}
        default:
            return state;
    }
}
