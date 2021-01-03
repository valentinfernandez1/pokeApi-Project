import React, { Component } from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap'

export default class EvoChain extends Component {
  render() {
    if (this.props.isLoading || this.props.errMess != null){
      return (<div></div>);
    }else{
      return (
        <Card className='mt-sm-3'>
          <CardBody>
            <CardTitle>Evolutions</CardTitle>
            <hr/>
            <h5>In Development</h5>
          </CardBody>
        </Card>
      );
    }
  }
}
