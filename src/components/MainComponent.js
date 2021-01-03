import React, {Component } from 'react';
import Header from './Header';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Search from './SearchComponent';
import Teams from './Teams/TeamsComponent';
import TeamDetail from './Teams/TeamDetail';
import PokemonDetail from './PokemonDetail';
import { connect } from 'react-redux';
import {fetchPokemon} from '../redux/ActionCreators';
import { createTeam, deleteTeam, getTeams, putTeam } from '../redux/TeamsActionsCreators';
import { Loading } from './LoadingComponent';

const matchStateToProps = state => {
  return {
    pokemon: state.pokemon,
    teams: state.teams
  }
}

const matchDispatchToProps = dispatch => ({
  fetchPokemon: (searchParam) => dispatch(fetchPokemon(searchParam)),
  getTeams: () => dispatch(getTeams),
  deleteTeam: (teamId) => dispatch(deleteTeam(teamId)),
  putTeam: (teamId, newTeam) => dispatch(putTeam(teamId, newTeam)),
  createTeam: (teamName) => dispatch(createTeam(teamName))
});

export class Main extends Component {

  componentDidMount(){
    this.props.getTeams();
  }

  render() {
    const PokemonSearched = ({match}) =>{
      return(
        <PokemonDetail fetchPokemon={this.props.fetchPokemon} 
          searchParam={match.params.searchParam}
          pokemon={this.props.pokemon.pokemon}
          abilities={this.props.pokemon.abilities}
          pkSpecies={this.props.pokemon.pkSpecies}
          isLoading={this.props.pokemon.isLoading}
          errMess={this.props.pokemon.errMess} 
          teams={this.props.teams.teams}
          putTeam={this.props.putTeam}/>
      );
    }

    const teamSelected = ({match}) => {
      if(this.props.teams.isLoading){
        return <Loading />
      }else{
        return <TeamDetail teamSerched={this.props.teams.teams.filter((t) => t.id===parseInt(match.params.teamId))[0]}
          errMess={this.props.teams.errMess}
          putTeam={this.props.putTeam} />
      }
    }

    return (
      <div>
        <Header />
        <Switch className='h-100'>
          <Route exact path='/search' component={() => <Search />} />
          <Route path ='/pokemon/:searchParam' component={PokemonSearched} />
          <Route path='/teams/:teamId' component={teamSelected} />
          <Route exact path='/teams' component={() => <Teams 
            isLoading={this.props.teams.isLoading}
            errMess={this.props.teams.errMess}
            teams={this.props.teams.teams} 
            deleteTeam={this.props.deleteTeam}
            createTeam ={this.props.createTeam} />} />
          <Redirect to='/search' />
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect(matchStateToProps,matchDispatchToProps)(Main));
