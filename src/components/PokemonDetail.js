import React, { Component } from 'react'
import { Button, Card, CardText, CardTitle } from 'reactstrap'
import { Loading } from './LoadingComponent';

function RenderPokemon({isLoading, errMess, pokemon}){
	console.log(errMess);
	if (isLoading){
		return <Loading />
	}else if (errMess){
		return (
			<h3 className='text-light'>{errMess}</h3>
		);
	}else{
		return (
			<div>Hola</div>
		);
	}
}

//Helps avoiding the loop on componentDidMount
let compMounted = 0;

class PokemonDetail extends Component{
	
	componentDidMount(){
		if(compMounted===0){
			compMounted++;
			this.props.fetchPokemon(this.props.searchParam);
		}
	}

	render(){
		return(
			<div className='container-fluid mt-5 pl-4 pr-4'>
				<div className='row h-100 test-container align-items-center'>
					<div align="center" className='test-container col-12 col-sm-6'>
						<RenderPokemon 
							isLoading={this.props.isLoading}
							errMess={this.props.errMess}
							pokemon={this.props.pokemon}/>
					</div>
					<div className='test-container col-12 col-sm-6'>
						<div className='test-container col-12'>hola</div>
						<div className='test-container col-12'>hola</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PokemonDetail;