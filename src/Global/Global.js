import React from 'react';
import { InputGroup, FormControl, Button, Badge, Container, Row, Col, Card } from 'react-bootstrap';
import GlobalContext  from '../GlobalContext/'


class NodeAddressStatus extends React.Component {
  render(props){
    console.log(this.props)
    if (this.props.status == "unsaved") {
        return (<Badge variant="warning">{this.props.status}</Badge>)
    } else {
        return (<Badge variant="success">{this.props.status}</Badge>)
    }
  }
}

/*
@name NodeAddress
@description component for setting the node address globally
*/
class NodeAddress extends React.Component {
  constructor(props) {
    super(props)
  }

  render(props){
    return (
      <GlobalContext.Consumer>
        {( {global_state_ip_address} ) => (
          <>
            <Card lg={{span: 2, offset: 2}}>
              <Card.Header>
                <h4 className="address_status float-left">
                  Set Node Address
                </h4>
              </Card.Header>
              <Card.Body>

                <Card.Title>
                  <NodeAddressStatus status={global_state_ip_address}/>
                </Card.Title>

                <Card.Text>
                <div id="proposal_result">
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text  id="basic-addon3">
                        Node
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="basic-url"
                                 aria-describedby="basic-addon3"
                                 placeholder="ex: 127.0.0.1"
                                 onChange={this.props.global_state_onchange_handler} />
                    <InputGroup.Prepend>
                      <Button variant="outline-secondary" onClick={this.props.global_state_onsubmit_handler}>Save</Button>
                    </InputGroup.Prepend>
                  </InputGroup>
                </div>
                </Card.Text>



              </Card.Body>
            </Card>
          </>
        )}
      </GlobalContext.Consumer>
    );
  }
}

/*
@name GlobalMetrics
@description component for display global metrics
*/
class GlobalMetrics extends React.Component {
  constructor(props) {
    super(props)
  }

  render(props){
    console.log("GlobalMetrics")
    console.log(this.props)
    return (
      <GlobalContext.Consumer>
        {( {global_state_block_height} ) => (
          <>
          <Card lg={{span: 2, offset: 2}}>
            <Card.Header>
              <h4 className="address_status float-left">
                Metrics
              </h4>
            </Card.Header>
            <Card.Body>


              <Card.Text>
                <Container >
                  <Row>
                    <Col lg={{span: 6, offset: 0}} className="global_metric_columns">
                      Height:
                      <Badge variant="info">
                        {global_state_block_height}
                      </Badge>
                    </Col>
                    <Col lg={{span: 6, offset: 0}} className="global_metric_columns">
                      TXs:
                      <Badge variant="success">
                        {global_state_block_height}
                      </Badge>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={{span: 6, offset: 0}} className="global_metric_columns">
                      Accts:
                      <Badge variant="warning">
                        {global_state_block_height}
                      </Badge>
                    </Col>
                    <Col lg={{span: 6, offset: 0}} className="global_metric_columns">
                      test:
                      <Badge variant="danger">
                        {global_state_block_height}
                      </Badge>
                    </Col>
                  </Row>
                </Container>
              </Card.Text>



            </Card.Body>
          </Card>
          </>
        )}
      </GlobalContext.Consumer>
    )
  }
}

export { NodeAddress, GlobalMetrics };
