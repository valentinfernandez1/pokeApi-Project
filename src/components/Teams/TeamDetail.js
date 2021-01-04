import React, { Component } from 'react'
import { CgPokemon } from 'react-icons/cg';
import { Badge, Button, Card, CardBody, CardTitle } from 'reactstrap';
import PokemonStats from '../PokemonComponents/Stats';

const defineTeam = (team, memberId) => {
  if(team){
    let newTeam = team.teamMember.filter((member) => member.id !== memberId);
    newTeam = newTeam.map(member => {member.id = newTeam.indexOf(member); return member});
    team.teamMember=newTeam;
    console.log(team);
    return team;
  }
}

export default class TeamDetail extends Component {

  render() {
    if(this.props.errMess){
      return <h3 className='text-light'>{this.props.errMess}</h3>
    }else{
      const renderMember = this.props.teamSerched.teamMember.map((teamMember) => {
        return (
          <Card className='col-12 col-sm-5 mb-3 mx-md-2'>
            <CardBody>
              <CardTitle>
                <div className='row justify-content-between'>
                  <h3 className='text-capitalize'>{teamMember.name+' '}<Badge color="danger">N°{teamMember.pkId}</Badge></h3>
                  <Button className='justify-self-center' outline color='danger'
                    onClick={() => this.props.putTeam(this.props.teamSerched.id, defineTeam(this.props.teamSerched, teamMember.id), this.props.teams.indexOf(this.props.teamSerched))}>
                    Delete
                  </Button>
                </div>
              </CardTitle>
              <div className='row justify-content-center'>
                <img className='col-10 col-sm-5' src={teamMember.sprite} alt={teamMember.name}/>
              </div>
              <PokemonStats isLoading={false}
                  errMess={null}
                  pokemon={teamMember}/>
            </CardBody>
          </Card>
        );
      });

      return (
        <div className='mt-3 container-fluid' style={{width:95+'%'}}>
					<h2 className='text-warning text-center'><CgPokemon />{this.props.teamSerched.name}</h2>
					<hr/>
					<div className='row my-3 justify-content-center'>
						{renderMember}
					</div>
				</div>
      );
    }
   
  }
}
