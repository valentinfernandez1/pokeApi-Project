import * as ActionTypes from './ActionTypes';

const baseUrl = 'https://pokeapi.co/api/v2/';


export const pokemonLoading = () => ({
    type: ActionTypes.POKEMON_LOADING,
});

export const pokemonError = (errMess) => ({
    type: ActionTypes.POKEMON_ERROR,
    payload: errMess,
});

export const getPokemon = (pokemon) => {
    return {
        type: ActionTypes.GET_POKEMON,
        payload: {
            id: pokemon.id,
            name: pokemon.name,
            weight: ''+ (pokemon.weight/10) + ' kg',
			height: ''+(pokemon.height / 10)+' m',
			abilities: pokemon.abilities,
            sprites: {
                defaultSprite: pokemon.sprites.front_default,
                shinySprite: pokemon.sprites.front_shiny
            },
            stats: pokemon.stats,
            types: pokemon.types    
		}
	}
};

export const fetchPokemon = (searchParam) => (dispatch) => {
    dispatch(pokemonLoading());
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
        .then(response => {
            dispatch(fetchSpecies(response.id));
            return response;
        })
        .then(response => {
            response.abilities.map((ability)=>dispatch(fetchAbility(ability)));
            return response;
        })
        .then(pokemon => {
            dispatch(getPokemon(pokemon));
            return pokemon;
            }
        )
        .catch(error => dispatch(pokemonError(error.message)))
        
}

export const fetchAbility = (ability) => (dispatch) => {
        dispatch(clearAbilities());
		return fetch(baseUrl + 'ability/' + ability.ability.name)
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
			.then(response => dispatch(addAbility(response)))
			.catch(error => error.message);
}

export const addAbility = (ability) => {
	return {
		type: ActionTypes.ADD_ABILITY,
		payload: {
			name: ability.name,
			description: ability.effect_entries[1].effect
		}
	}
}

export const clearAbilities = () => {
    return {
        type: ActionTypes.CLEAR_ABILITIES,
    }
}

export const fetchSpecies = (pkId) => (dispatch) => {
    dispatch(clearSpecies());
    return fetch(baseUrl + 'pokemon-species/' + pkId)
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
        .then(response => dispatch(getSpecies(response)))
        .catch(error => error.message);
}

export const getSpecies = (species) => {
	return {
		type: ActionTypes.GET_POKEMON_SPECIES,
		payload: {
			forms: species.varieties,
            evoChain: species.evolution_chain,
            pkDescriptions: species.flavor_text_entries
		}
	}
}

export const clearSpecies = () => {
    return {
        type: ActionTypes.CLEAR_SPECIES,
    }
}

