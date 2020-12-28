import { Component } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import {formatStrings} from './Pokemon';

class PokemonAbilities extends Component{

  render(){
    if (this.props.isLoading || this.props.errMess != null){
      return (<div></div>);
    }else{
      const abilityList = this.props.abilities.map((ability)=>{
        return (
          <div key={this.props.abilities.indexOf(ability)}>
            <hr/>
            <h5 className='text-center text-capitalize text-primary'>{formatStrings(ability.name)}</h5>
            <h6 className=' text-secondary'>{ability.description}</h6>
          </div>
        );
      });

      return (
        <Card>
          <CardBody>
            <CardTitle><h3>Pokemon Abilities</h3></CardTitle>
            {abilityList}
          </CardBody>
        </Card>
      );
    }
  }
}
export default PokemonAbilities;