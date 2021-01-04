import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import {formatStrings} from './Pokemon';
import classnames from 'classnames';

const PokemonAbilities = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  if (props.isLoading || props.errMess != null){
    return (<div></div>);
  }else{

    const abilityTabs = props.abilities.map((ability)=>{
      let tabNumber = props.abilities.indexOf(ability)+1;
      return (
        <NavItem>
          <NavLink className={classnames({ active: activeTab === tabNumber})}
            onClick={() => { toggle(tabNumber); }}>
            <h6 className='text-capitalize'>{formatStrings(ability.name)}</h6>
          </NavLink>
        </NavItem>
      );
    });

    const abilityContent = props.abilities.map((ability)=>{
      let tabNumber = props.abilities.indexOf(ability)+1;
      return (
        <TabPane tabId={tabNumber}>
           <Row>
            <Col sm="12">
              <h6 className='text-secondary mt-2'>{formatStrings(ability.description)}</h6>
            </Col>
          </Row>         
        </TabPane>   
      );
    });

    return (
      <Card className='mt-sm-2'>
        <CardBody>
          <CardTitle><h3>Pokemon Abilities</h3></CardTitle>
          <Nav tabs>
            {abilityTabs}
          </Nav>
          <TabContent activeTab={activeTab}>
            {abilityContent}
          </TabContent>
        </CardBody>
      </Card>
    );
  }
}
export default PokemonAbilities;