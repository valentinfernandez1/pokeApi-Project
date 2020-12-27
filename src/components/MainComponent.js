import React, {Component } from 'react';
import Header from './Header';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Search from './SearchComponent';
import Teams from './TeamsComponent';
import PokemonDetail from './PokemonDetail';
import { connect } from 'react-redux';
import { fetchPokemon} from '../redux/ActionCreators';

const matchStateToProps = state => {
  return {
    pokemon: state.pokemon,
    teams: state.teams
  }
}

const matchDispatchToProps = dispatch => ({
  fetchPokemon: (searchParam) => dispatch(fetchPokemon(searchParam)),
});

export class Main extends Component {

  render() {
    const PokemonSearched = ({match}) =>{
      return(
        <PokemonDetail fetchPokemon={this.props.fetchPokemon} 
          searchParam={match.params.searchParam}
          pokemon={this.props.pokemon.pokemon}
          abilities={this.props.pokemon.abilities}
          pkSpecies={this.props.pokemon.pkSpecies}
          isLoading={this.props.pokemon.isLoading}
          errMess={this.props.pokemon.errMess} />
      );
    }

    return (
      <div>
        <Header />
        <Switch className='h-100'>
          <Route exact path='/search' component={() => <Search />} />
          <Route path ='/pokemon/:searchParam' component={PokemonSearched} />
          <Route path='/teams' component={() => <Teams />}/>
          <Redirect to='/search' />
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect(matchStateToProps,matchDispatchToProps)(Main));
