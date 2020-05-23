import React from 'react';
import logo from './logo.svg';
import './App.css';

import { NavLink, Switch, Route } from 'react-router-dom';
import Navigation from './Navigation/';
import Content from './Content/'
import { NodeAddress, GlobalMetrics } from './Global/'
import { Container, Row, Col } from 'react-bootstrap';

import GlobalContext  from './GlobalContext/'


class Output extends React.Component{
  render(){
    return (
      <div>Test Outputsss</div>
    )
  }
}


/*
@name HeaderCSS
@ddescription
*/
class HeaderCSS extends React.Component {
  render() {
    return (<link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
            />)
  }
}


const GlobalCSS = <HeaderCSS />

/*
@name
@description
*/
class GlobalComponent extends React.Component {
  default_node_ip_address_display = "unsaved"

  constructor(props) {
    super(props)
    this.handleNodeIPAddressChange = this.handleNodeIPAddressChange.bind(this);
    this.handleNodeIPAddressSubmit = this.handleNodeIPAddressSubmit.bind(this);
    this.state = {
      global_state_ip_address: "",
      global_state_ip_address_interim: "",
      global_state_block_height: -1
    }
  }

  /*
  @name get_global_metrics
  @description
  */
  async get_global_metrics(){
    window.ipcRenderer.send('global_metric_call_message', this.state)
  }


  componentDidMount(){
    this.setState({
      global_state_ip_address: this.default_node_ip_address_display,
      global_state_ip_address_interim: "TESTss",
      global_state_block_height: -1
    });

    window.ipcRenderer.on('global_metric_call_reply', (event, result) => {
      console.log(result)
      console.log("global_metric returns")

      this.setState({
        global_state_ip_address: this.state.global_state_ip_address,
        global_state_ip_address_interim: this.state.global_state_ip_address_interim,
        global_state_block_height: result.result.block_height
      });

    })

    this.get_global_metrics()

  }

  /*
  @name handleNodeIPAddressChange
  @description
  */
  handleNodeIPAddressChange(event) {
    console.log("changed: "+this.state.global_state_ip_address)
    this.setState({
      global_state_ip_address: this.default_node_ip_address_display,
      global_state_ip_address_interim: event.target.value,
      global_state_block_height: this.state.global_state_block_height
    });
    event.preventDefault();
  }

  /*
  @name handleNodeIPAddressSubmit
  @description
  */
  handleNodeIPAddressSubmit(event) {
    console.log('A address was submitted 1: ' + this.state.global_state_ip_address);
    console.log('A address was submitted 2: ' + this.state.global_state_ip_address_interim);

    this.setState({
      global_state_ip_address:  this.state.global_state_ip_address_interim,
      global_state_ip_address_interim: this.state.global_state_ip_address_interim,
      global_state_block_height: this.state.global_state_block_height
    });

    console.log('Address change confirm: ');
    console.log(this.state);
    this.get_global_metrics()
    event.preventDefault();
  }

  render() {
    return (
      <>
      <GlobalContext.Provider value={this.state}>
        <GlobalContext.Consumer>
          {( {global_state_ip_address} ) => (
            <>
            <Navigation />

            <br/>
            <Container >
              <Row>
                <Col lg={{span: 5, offset: 1}}>
                  <NodeAddress global_state_onchange_handler={this.handleNodeIPAddressChange}
                               global_state_onsubmit_handler={this.handleNodeIPAddressSubmit} />
                </Col>
                <Col lg={{span: 6, offset: 0}}>
                  <GlobalMetrics />
                </Col>
              </Row>
            </Container>

            {/*<div className="container offset-2 col-lg-12" id="status">
              <div className="row">
                <NodeAddress global_state_onchange_handler={this.handleNodeIPAddressChange} global_state_onsubmit_handler={this.handleNodeIPAddressSubmit} global_state={global_state_ip_address} />
                <GlobalMetrics global_state={global_state_ip_address} />
              </div>
            </div>*/}

            <Content state={this.state} />
            </>
          )}
        </GlobalContext.Consumer>
      </GlobalContext.Provider>
      </>
    );
  }
}

function App() {
  return (
    <div className="App">

      <header className="App-header">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>

      {GlobalCSS}
      <GlobalComponent />

      </header>
    </div>
  );
}

export default App;
