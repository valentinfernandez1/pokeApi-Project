import React from 'react'
import { Component } from 'react';
import {Badge, Button, Card, CardBody, CardText, CardTitle } from 'reactstrap'
import { Loading } from '../LoadingComponent';


class RenderPokemon extends Component{
	constructor(props){
		super(props);
		this.state = {
			shinyButton: 'Shiny'
		}
		this.handleShinyButton = this.handleShinyButton.bind(this);
	}

	handleShinyButton(){
		if(this.state.shinyButton === 'Shiny'){
			document.getElementById('pokemon-image').src=this.props.pokemon.sprites.shinySprite;
			this.setState({shinyButton: 'Normal'});
		}else{
			document.getElementById('pokemon-image').src=this.props.pokemon.sprites.defaultSprite;
			this.setState({shinyButton: 'Shiny'});
		}
	}


	render(){


		if (this.props.isLoading){
			return (
				<div className='row justify-content-center mt-4'>
					<Loading />
				</div>);
		}else if (this.props.errMess){
			return (
				<h3 className='text-light'>{this.props.errMess}</h3>
			);
		}else{
			const typesBlock = this.props.pokemon.types.map((type) => {
				let typeSrc= '/types/'+type.type.name+'.png';
				return (
					<img src={`${process.env.PUBLIC_URL}${typeSrc}`} height='25px' alt='pokeball' />
				);
			});

			return (
				<Card>
					<CardBody>
						<CardTitle><h3 className='text-capitalize'>{this.props.pokemon.name} <Badge color="danger">N°{this.props.pokemon.id}</Badge></h3></CardTitle>
						<hr/>
						<row className='d-flex justify-content-center'>
							{typesBlock}
						</row>
						<img id='pokemon-image' className='mx-auto d-block' width="45%" src={this.props.pokemon.sprites.defaultSprite} alt={this.props.pokemon.name} />
						<div className='row justify-content-center mt-2 '>
							<h6 className='col-4 col-sm-2 p-1 text-light rounded bg-primary mr-1'>{this.props.pokemon.height}</h6>
							<h6 className='col-4 col-sm-2 p-1 text-light rounded bg-primary '>{this.props.pokemon.weight}</h6>
						</div>
						<Button onClick={this.handleShinyButton} color="warning my-2" id='shiny-button'>{this.state.shinyButton}</Button>{' '}
						<CardText>Esto es un texto de prueba, aqui ira una descripcion del pokemon</CardText>
					</CardBody>
				</Card>
			);
		}
	}
	
}

export default RenderPokemon;