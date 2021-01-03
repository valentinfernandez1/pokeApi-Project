import * as ActionTypes from './ActionTypes';

const teamsUrl = 'http://10.0.0.104:3001/teams';


export const getTeams = (dispatch) => {
  dispatch(teamsLoading());

  return fetch(teamsUrl)
    .then(response =>{
      if(response.ok){
        return response;
      }else{
        let error = new Error('Error' + response.status + ': ' + response.statusText);
        throw error;
      }
    }, error=>{
      let errMess = new Error(error.message);
      throw errMess; 
    })
    .then(response => response.json())
    .then(teams => dispatch(addTeams(teams)))
    .catch(error => error.message);
}
export const addTeams = teams => ({
  type: ActionTypes.ADD_TEAMS,
  payload: teams
});


export const teamsLoading = () => ({
  type: ActionTypes.TEAMS_LOADING
});

export const teamsError = errMess => ({
  type: ActionTypes.TEAMS_ERROR,
  payload: errMess
});

export const deleteTeam = teamId => dispatch => {
  return fetch(teamsUrl+'/'+teamId, {
    method: 'DELETE',
    credentials: 'same-origin'
  })
  .then(response => {
    if (response.ok){
        return response
    }else{
       let error = new Error('Error '+ response.status + ': ' + response.statusText);
       error.response = response;
       throw error;
    }
  }, error => {
    let errMess = new Error(error.message);
    throw errMess;
  })
  .then(response => response.json())
  .then(response => dispatch(removeTeam(teamId)))
  .catch(error => console.log('Delete Feedback', error.message));
}

export const removeTeam = (teamId) => ({
    type: ActionTypes.REMOVE_TEAM,
    payload: teamId
  }
);

export const putTeam = (teamId, newTeam) => dispatch => {
  return fetch(teamsUrl + '/' + teamId, {
    method: 'PUT',
    body: JSON.stringify(newTeam),
    headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
  })
  .then(response => {
    if(response.ok){
      return response;
    }else {
      let error = new Error('Error ' + response.status + ': ' + response.statusText);
      throw error;
    }
  }, error => {
    let errMess = new Error(error.message);
    throw errMess;
  })
  .then(response => response.json())
  .then(response => {
    console.log(response);
    dispatch(updateTeam(teamId,newTeam));
  })
  .catch(error => console.log('Put FeedBack', error.message));
}

export const updateTeam = (teamId, newTeam) => ({
  type: ActionTypes.UPDATE_TEAM,
  payload:{
    id: teamId,
    team: newTeam
  }
});


export const createTeam = (teamName, newTeamId) => dispatch => {
  const newTeam = {
    name: teamName,
    teamMember: []
  }
  return fetch(teamsUrl,{
    method: 'POST',
        body: JSON.stringify(newTeam),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
  })
  .then(response => {
    if (response.ok){
        return response
    }else{
       let error = new Error('Error '+ response.status + ': ' + response.statusText);
       error.response = response;
       throw error;
    }
  }, error => {
    let errMess = new Error(error.message);
    throw errMess;
  })
  .then(() => dispatch(postNewTeam(teamName, newTeamId)))
  .catch(error => alert('The team could not be created: ' + error.message));
}

export const postNewTeam = (teamName, newTeamId) => ({
  type: ActionTypes.CREATE_TEAM,
  payload: {
    id: newTeamId,
    name: teamName,
    teamMember: []
  }
})