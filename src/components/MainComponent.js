import React, {Component } from 'react';
import Header from './Header';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Search from './SearchComponent';
import Teams from './TeamsComponent';
import PokemonDetail from './PokemonDetail';
import { connect } from 'react-redux';
import { getPokemon } from '../redux/ActionCreators';

const matchStateToProps = state => {
  return {
    pokemon: state.pokemon,
    teams: state.teams
  }
}

const matchDispatchToProps = dispatch => ({
  getPokemon: (searchParam) => dispatch(getPokemon(searchParam)),
});

export class Main extends Component {

  render() {

    return (
      <div>
        <Header />
        <Switch>
          <Route path='/search' component={() => <Search getPokemon={this.props.getPokemon} />} />
          <Route path ='/search/:searchParam' component={<PokemonDetail />} />
          <Route path='/teams' component={() => <Teams />}/>
          <Redirect to='/search' />
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect(matchStateToProps,matchDispatchToProps)(Main));
