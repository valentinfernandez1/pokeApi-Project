import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import history from '../shared/history';

export default class Search extends Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();
		history.push('/search/'+ this.searchParam.value);
	}

	render() {
		return (
			<div className='container-fluid mt-5 '>
				<div className='row'>
					<div className='col-12'>
						<h1 className='col-12 text-center text-light mb-4'>PokeApi Pokedex</h1>
						<img src='pokeballLogo.png' height='50px' className='App-logo mx-auto d-block ' alt='pokeball' />
					</div>
					<Form onSubmit={this.handleSubmit} className='mt-4 col-12'>
						<FormGroup>
							<div className='row d-flex justify-content-center'>
								<Label className='text-center text-light mb-3'>
									Enter the Number or Name of the Pokemon that you want to search for:
								</Label>
							</div>
							<div className='row d-flex justify-content-center'>
								<Input className='col-11 col-md-4' type="text" name="search" 
									id="searchPokemon" placeholder="Enter the pokemon you want to search for" 
									innerRef={(input) => this.searchParam = input} />
							</div>
						</FormGroup>
						<Button type='submit' className='mx-auto d-block' color='danger'>Search Pokemon</Button>
					</Form>
				</div>
			</div>
		)
	}
}
