import React from 'react';
import { Form, Button, Card, Container, Row, Col, Badge, Spinner } from 'react-bootstrap';


/*
@name ProposalContext
@description proposal context
*/
export const ProposalContext = React.createContext({
  latest_proposal: 0
});

function GetBadge(status){
  switch(status){
      case "pending":
        return (<Badge variant="secondary">Pending</Badge>)
        break;
      case "created":
        return (<Badge variant="secondary">Pending</Badge>)
        break;
      case "accepted":
        return (<Badge variant="info">Accepted</Badge>)
        break;
      case "rejected_broadcasted":
        return (<Badge variant="warning">Rejected Broadcasted</Badge>)
        break;
      case "accepted_broadcasted":
        return (<Badge variant="warning">Accepted Broadcasted</Badge>)
        break;
      case "rejected_by_network":
        return (<Badge variant="danger">Rejected By Network</Badge>)
        break;
      case "accepted_by_network":
        return (<Badge variant="info">Accepted By Network</Badge>)
        break;
      case "committed":
        return (<Badge variant="success">Committed</Badge>)
        break;
      default:
      console.log(status)
        return (<Badge variant="secondary">UNKNOWN</Badge>)
        break;
  }
}

class LatestProposal extends React.Component{
  constructor(props){
    super(props)
    this.state = ""
  }

  render(props){
    //JSON.parse({"yo":"fg"})
    //console.log(JSON)
    //console.log(JSON.parse("\{\'res\':\'fd\'\}"))

    /*
    {"proposal_id":315,"proposal_status":"committed","proposal_hash":"df91cb283da6a1660b9d5cd4d2ca34804db13805e9b1869ff9cd117742328ee5","proposal_time":"1588208969","proposal_sender":"docker.for.mac.host.internal:8081","proposal_block":{"block_id":315,"block_hash":"b22b62fdd9a06e8eb2e6c18816ee5d146a4470f347763adc5da6805d9300b46c","block_parent_hash":"0fe34b96c47a9304d037627fa8fcae2d4a9b444e2a222aac9da0abb86bd37f1b","block_time":"1588208969","proposal_hash":"df91cb283da6a1660b9d5cd4d2ca34804db13805e9b1869ff9cd117742328ee5","block_data":"TEST DATA","transactions":{}}}
    */
    // console.log("TEST: ")
    // console.log(this.props)
    // console.log(this.props.proposal)
    // console.log(this.props["proposal"])
    // console.log(typeof(this.props.proposal))
    // console.log(TEST(this.props.proposal))
    // console.log(JSON.parse)
    // console.log( JSON.parse('{"proposal_id":315,"proposal_status":"committed","proposal_hash":"df91cb283da6a1660b9d5cd4d2ca34804db13805e9b1869ff9cd117742328ee5","proposal_time":"1588208969","proposal_sender":"docker.for.mac.host.internal:8081","proposal_block":{"block_id":315,"block_hash":"b22b62fdd9a06e8eb2e6c18816ee5d146a4470f347763adc5da6805d9300b46c","block_parent_hash":"0fe34b96c47a9304d037627fa8fcae2d4a9b444e2a222aac9da0abb86bd37f1b","block_time":"1588208969","proposal_hash":"df91cb283da6a1660b9d5cd4d2ca34804db13805e9b1869ff9cd117742328ee5","block_data":"TEST DATA","transactions":{}}}') )

    try {

      //TODO: add error handling
      let proposal = JSON.parse( this.props.proposal )
      let badge = GetBadge(proposal.proposal_status)

      return (
        <>
          <br/>
          <Card>
            <Card.Header>Proposal #{proposal.proposal_id} <h3>{badge}</h3></Card.Header>
            <Card.Body>
              <Card.Title>Hash: {proposal.proposal_hash}</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional content.
              </Card.Text>
            </Card.Body>
          </Card>

          {/*<div className="container col-lg-4">
            <div className="row">
              <div className="container col-lg-4">
              A
              </div>
              <div className="container col-lg-4">
              B
              </div>
            </div>
          </div>
          <div className="container col-lg-4">
            <div className="row">
              <div className="container col-lg-4">
                A
              </div>
              <div className="container col-lg-4">
                B
              </div>
            </div>
          </div>
          <div className="container col-lg-4">
            <div className="row">
              <div className="container col-lg-4">
                A
              </div>
              <div className="container col-lg-4">
                B
              </div>
            </div>
          </div>*/}
        </>
      )

    } catch (e) {
      return (
        <>
          <br/>
          <Card>
            <Card.Header>
            <Spinner animation="border" role="status">
              <span className="sr-only">ERROR...</span>
            </Spinner>
            </Card.Header>
            <Card.Body>
              <Card.Title>Could not load latest proposal</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional content.
              </Card.Text>
            </Card.Body>
          </Card>
        </>
      )
    }

  }
}

/*
@name
@description
*/
class Proposal extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      latest_proposal: "default"
    }

  }

  /*
  @name
  @description
  */
  async get_latest_proposal(state){
    window.ipcRenderer.send('latest_proposal_call_message', state)
  }

  /*
  @name
  @description
  */
  async componentDidMount(props) {
    // TODO: perhaps set interval and call this.loadMonitoredUsers, and others?
    console.log("component loaded... interval being invoked..")
    //this.loadMonitoredUsers("g")
    let get_latest_proposal = this.get_latest_proposal
    window.ipcRenderer.on('latest_proposal_call_reply', (event, result) => {
      //console.log(result)
      //console.log("latest_proposal returnss")
      this.setState({
        latest_proposal: result.Result
      });
    })
    let state = this.props.state
    setInterval((function(){
      //iteratively call for proposal on disk
      //TODO: if real-time is displayed
      //window.ipcRenderer.send('latest_proposal_call_message', state)
      get_latest_proposal(state)
      //get_latest_proposal()
    }), 5000)

  }

  render(props){

    console.log("Proposal: Props from global")
    console.log(this.props.state)

    return (
      <ProposalContext.Provider value={this.state}>
        <ProposalContext.Consumer>
          {( {latest_proposal} ) => (
            <>
            <Container >
              <Row>
                <Col lg={{span: 11, offset: 1}}>
                  <LatestProposal proposal={latest_proposal} />
                </Col>
              </Row>
            </Container>
            {/*<div className="container offset-2 col-lg-9">
              <div className="row">
                <div className="card col-lg">
                  <div className="card-body">
                    <div className="md-form active-pink active-pink-2">

                      <div id="proposal_result">
                        <LatestProposal proposal={latest_proposal} />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>*/}
            <br/>
            </>
          )}
        </ProposalContext.Consumer>
      </ProposalContext.Provider>
    )
  }
}

// export component as default
export default Proposal;
