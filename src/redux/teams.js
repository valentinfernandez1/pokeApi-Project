import * as ActionTypes from './ActionTypes';

export const Teams = (state = {
	isLoading: true,
	errMess: null,
	teams: []
	}, action) => {
	switch(action.type){
		case ActionTypes.ADD_TEAMS:
			return {...state, isLoading: false, errMess: null, teams: action.payload}

		case ActionTypes.TEAMS_LOADING:
			return {...state, isLoading: true, errMess: null, teams: null}
		case ActionTypes.TEAMS_ERROR:
			return {...state, isLoading: false, errMess: action.payload, teams: null}

		case ActionTypes.REMOVE_TEAM:
			return {...state, teams: state.teams.filter((team) => team.id !== action.payload)}

		case ActionTypes.UPDATE_TEAM:
			let newTeams= state.teams;
			newTeams[(action.payload.id)] = action.payload.team;
			return{...state, teams: newTeams}

			case ActionTypes.CREATE_TEAM:
				console.log(action.payload)
				return {...state, teams: state.teams.concat(action.payload)}

		default:
			return state;
	}
}
