import React from "react";
import { Card, CardBody, CardTitle, Progress } from "reactstrap";

const statAverage = (stat, statName) => {
	switch (statName){
		case 'hp': return statBarColor(stat, 68.86);
		case 'attack': return statBarColor(stat, 76.86);
		case 'defense': return statBarColor(stat, 72.32);
		case 'special-attack': return statBarColor(stat,70);
		case 'special-defense': return statBarColor(stat,70.4);
		case 'speed': return statBarColor(stat, 66.6);
		default: return statBarColor(stat, 70.85);
	}
}

const statBarColor = (stat, statAverage) => {
	if (stat <= statAverage * 0.75){
		return 'danger';
	}else if (stat >= statAverage * 1.75){
		return 'warning';
	}else if(stat >= statAverage * 1.25){
		return 'success';
	}else{
		return 'primary';
	}
}

function PokemonStats({isLoading, errMess, pokemon}){
  if (isLoading || errMess != null){
		return (<div></div>);
	}else{
		let statList = Object.entries(pokemon.stats);
		let statCount = 0;
		statList = statList.map((statItem) => {
			statCount = statCount + statItem[1].base_stat
			return(
				<div key={statList.indexOf(statItem)} className='row'>
					<div className='col-12 col-sm-3'>
						<h6 className='text-sm-right text-capitalize'>{statItem[1].stat.name}</h6>
					</div>
					<div className='col-8 col-sm-7'>
						<Progress color={statAverage(statItem[1].base_stat, statItem[1].stat.name)} value={(statItem[1].base_stat/255)*100} />
					</div>
					<div className='col-4 col-sm-2'>
						<h6>{statItem[1].base_stat}/255</h6>
					</div>
				</div>
			);
		});

		return (
			<Card>
				<CardBody>
					<CardTitle><h3>Pokemon Base Stats</h3></CardTitle>
					<hr/>
					{statList}
					<div className='row justify-content-center mt-3'>
						<div className='col-3 col-sm-2 '>
							<div className='bg-danger rounded-pill py-1 text-center'>Bad</div>
						</div>
						<div className='col-3 col-sm-2'>
							<div className='bg-primary rounded-pill py-1 text-center'>Avg</div>
						</div>
						<div className='col-3 col-sm-2'>
							<div className='bg-success rounded-pill py-1 text-center'>Good</div>
						</div>
						<div className='col-3 col-sm-2'>
							<div className='bg-warning rounded-pill py-1 text-center'>Great</div>
						</div>
					</div>
					<hr/>
					<h5 className='text-center'>Total Base Stats: {statCount} </h5>
				</CardBody>
			</Card>
		);
	}
}

export default PokemonStats;