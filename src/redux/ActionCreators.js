import * as ActionTypes from './ActionTypes';

const baseUrl = 'https://pokeapi.co/api/v2/';

export const pokemonLoading = () => ({
    type: ActionTypes.POKEMON_LOADING,
});

export const pokemonError = (errMess) => ({
    type: ActionTypes.POKEMON_ERROR,
    payload: errMess,
});

export const getPokemon = (pokemon) => ({
    type: ActionTypes.GET_POKEMON,
    payload: {
        id: pokemon.id,
        name: pokemon.name,
        weight: pokemon.weight,
        height: pokemon.height,
        sprites: {
            defaultSprite: pokemon.sprites.front_default,
            shinySprite: pokemon.sprites.front_shiny
        },
        stats: pokemon.stats,
        types: pokemon.types
    }
});

export const fetchPokemon = (searchParam) => (dispatch) => {
    dispatch(pokemonLoading());
    console.log(searchParam);
    return fetch(baseUrl + 'pokemon/' + searchParam)
        .then(response => {
            if(response.ok){
                return response;
            }else{
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            let errMess = new Error(error.message);
            throw errMess; 
        })
        .then(response => response.json())
        .then(pokemon => {
            return dispatch(getPokemon(pokemon))
        })
        .catch(error => dispatch(pokemonError(error.message)));
}