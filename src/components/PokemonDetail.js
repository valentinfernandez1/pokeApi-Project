import React, { Component } from 'react'
import RenderPokemon from './PokemonComponents/Pokemon'
import PokemonStats from './PokemonComponents/Stats'
import PokemonAbilities from './PokemonComponents/PokemonAbilities'

const lowerCaseFirstLetter = (string) => string.charAt(0).toLowerCase() + string.slice(1);

//Helps avoiding the loop on componentDidMount
let lastSearchParam = null;
class PokemonDetail extends Component{

	componentDidMount(){
		if (lastSearchParam == null || lastSearchParam != this.props.searchParam){
			lastSearchParam = this.props.searchParam;
			this.props.fetchPokemon(lowerCaseFirstLetter(this.props.searchParam));
		}
	}

	render(){
		return(
			<div className='container-fluid mt-5 pl-sm-5 pr-sm-5'>
				<div className='row h-100'>
					<div align='center' className='col-12 col-sm-6'>
						<RenderPokemon 
							isLoading={this.props.isLoading}
							errMess={this.props.errMess}
							pokemon={this.props.pokemon}
							pkSpecies={this.props.pkSpecies}/>
					</div>
					<div className='col-12 col-sm-6'>
						<div className='row'>
							<div className='mt-3 mt-sm-0 col-12'>
								<PokemonStats 
										isLoading={this.props.isLoading}
										errMess={this.props.errMess}
										pokemon={this.props.pokemon} />
							</div>
						</div>
						<div className='row '>
							<div className='mt-3 col-12'>
								<PokemonAbilities 
									isLoading={this.props.isLoading}
									errMess={this.props.errMess}
									pokemon={this.props.pokemon}
									abilities={this.props.abilities} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PokemonDetail;