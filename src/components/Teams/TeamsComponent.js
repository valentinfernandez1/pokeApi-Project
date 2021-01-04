import React, { Component } from 'react'
import { Button, Card, CardBody, CardTitle, Form, FormGroup, Input, Label, Media, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { CgPokemon } from 'react-icons/cg';
import history from '../../shared/history';



const RenderTeam = ({team,deleteTeam}) => {
	const teamMember = team.teamMember.map((member)=>{
		const typesBlock = member.types.map((type) => {
			let typeSrc= '/types/'+type.name+'.png';
			return (
				<img key={member.types.indexOf(type)} src={`${process.env.PUBLIC_URL}${typeSrc}`} className='mx-1' height='25px' alt={type.name} />
			);
		});
		return (
				<Media className="my-1 mx-sm-2 mx-md-3 col-12 col-md-5 border border-5 rounded-pill">
        <Media left middle>
					<img width="100%" src={member.sprite} alt={member.name} />
        </Media>
        <Media body className='ml-2'>
          <Media heading className='mt-1 text-capitalize'>
            {member.name}
          </Media>
          {typesBlock}
        </Media>
      </Media>
			);
		});

	return (
		<Card>
			<CardBody>
				<CardTitle>
					<div className='row mx-1 justify-content-between'>
						<h3 className='text-capitalize'>{team.name}</h3>
						<Button outline color='danger' onClick={() => deleteTeam(team.id)}>Delete</Button>
					</div>
				</CardTitle>
				<hr/>
				<div className='row justify-content-center'>
					{teamMember}
				</div>
				<hr/>
				<div className='row justify-content-center'>
					<Button outline color='primary' onClick={() => history.push('/teams/'+ team.id)}>Inspect Team</Button>
				</div>
			</CardBody>
		</Card>
	);
}


export default class Teams extends Component {
	constructor(props){
		super(props);
		this.state = {
			isModalOpen:false,
		}
		this.toggleAddTeam = this.toggleAddTeam.bind(this);
		this.createTeam = this.createTeam.bind(this);
	}

	toggleAddTeam(){
		this.setState({isModalOpen: !this.state.isModalOpen});
	}

	createTeam = (lastTeamId) => (event) => {
		console.log(lastTeamId);
		this.props.createTeam(this.teamName.value, lastTeamId+1);
		event.preventDefault();
	}

  render() {
		if(this.props.isLoading){
			return (<div></div>);
		}else if(this.props.errMess){
			return (<div></div>);
		}else{
			const teamsList = this.props.teams.map((team)=>{
				return (
					<div className='col-12 col-sm-6 mb-3'>
							<RenderTeam team={team}
							deleteTeam={this.props.deleteTeam}/>
					</div>
				);
			});

			let lastTeamId=0;
			if(this.props.teams[0]){lastTeamId = this.props.teams[(this.props.teams.length)-1].id;}

			return (
				<>
				<div className='mt-3 container-fluid' style={{width:90+'%'}}>
					<div className='row'>
						<div className='col-sm-4 offset-sm-4'><h2 className='text-light text-center mr-sm-2'><CgPokemon />Your Teams</h2></div>
						<div className='col-8 col-sm-3 offset-3 offset-sm-1 justify-content-center'>
							<Button outline color='warning' onClick={() => this.toggleAddTeam()}>Create New Team</Button>
						</div>
					</div>
					
					<hr/>
					<div className='row my-3'>
						{teamsList}
					</div>
				</div>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleAddTeam}>
					<ModalHeader toggle={this.toggleAddTeam}>Create New Team</ModalHeader>
					<ModalBody>
					<Form onSubmit={this.createTeam(lastTeamId)} className='col-12'>
						<FormGroup>
							<div className='row'>
								<Label for='teamName' className='col-11'>
									Name
								</Label>
							</div>
							<div className='row justify-content-center'>
								<Input className='col-11' type="text" name="teamName" 
									id="teamName" placeholder="Enter Team's Name" 
									innerRef={(input) => this.teamName = input} />
							</div>
						</FormGroup>
						<Button type='submit' onClick={this.toggleAddTeam} className='mx-auto d-block' color='success'>Create</Button>
					</Form>
					</ModalBody>
				</Modal>
				</>
			)
		}
  }
}
