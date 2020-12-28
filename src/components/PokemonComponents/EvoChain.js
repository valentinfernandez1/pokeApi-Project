import React, { Component } from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap'

export default class EvoChain extends Component {
  render() {
    if (this.props.isLoading || this.props.errMess != null){
      return (<div></div>);
    }else{
      return (
        <Card>
          <CardBody>
            <CardTitle>Evolutions</CardTitle>
            <hr/>
          </CardBody>
        </Card>
      );
    }
  }
}
