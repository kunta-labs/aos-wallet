import React from 'react';
import { Form,
         Button,
         Badge,
         Container,
         Row,
         Col,
         Card,
         InputGroup,
         FormControl,
         Modal } from 'react-bootstrap';


export const TransactionContext = React.createContext({
  interim_public_key: "blank public key",
  set_public_key: "blank public key",
  interim_private_key: "blank private key",
  set_private_key: "blank private key",
  sender: "blank sender",
  transaction_data: "blank transaction data",
  txtype: "output",
  public_key_hash: "PUBKHASH",
  private_key_hash: "PRIVKHASH"
});


const PrivateKeyModal = (props) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="info" className="float-left" onClick={handleShow}>
        Private Key
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Set Private Key for Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Private Key</Form.Label>
            <Form.Control as="textarea" rows="3"
                          onChange={props.handle_private_key_change} />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handle_private_key_save}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


const PublicKeyModal = (props) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="info" className="float-left" onClick={handleShow}>
        Public Set Key
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Set Public Key for Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Public Key</Form.Label>
            <Form.Control as="textarea" rows="3"
                          onChange={props.handle_public_key_change} />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handle_public_key_save}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


class Transaction extends React.Component{

  constructor(props) {
    super(props);

    // bind component functions
    this.handle_public_key_save = this.handle_public_key_save.bind(this);
    this.handle_public_key_change = this.handle_public_key_change.bind(this);

    this.handle_private_key_save = this.handle_private_key_save.bind(this);
    this.handle_private_key_change = this.handle_private_key_change.bind(this);

    this.handle_sender_change = this.handle_sender_change.bind(this);
    this.handle_txtype_change = this.handle_txtype_change.bind(this);
    this.handle_transaction_data_change = this.handle_transaction_data_change.bind(this);
    this.create_transaction = this.create_transaction.bind(this);

    this.state = {
      interim_public_key: "blank public key",
      set_public_key: "blank public key",
      interim_private_key: "blank private key",
      set_private_key: "default private key",
      sender: "default sender",
      transaction_data: "default transaction data",
      txtype: "output",
      public_key_hash: "PUBKHASH",
      private_key_hash: "PRIVKHASH"
    }
  }

  handle_sender_change(event){
    console.log("handle sender change: "+event.target.value)
    this.setState({
      sender: event.target.value
    })
    event.preventDefault();
  }

  handle_txtype_change(event){
    console.log("handle txtype change: "+event.target.value)
    this.setState({
      txtype: event.target.value
    })
    event.preventDefault();
  }

  handle_transaction_data_change(event){
    console.log("handle transaction data: "+event.target.value)
    this.setState({
      transaction_data: event.target.value
    })
    event.preventDefault();
  }

  async create_transaction(event){
    console.log("create_transaction: ")
    console.log(this.props)
    let object_to_pass = this.state
    object_to_pass["global_state"] = this.props.state
    //window.ipcRenderer.send('transaction_submit_output_call_message', this.state)
    window.ipcRenderer.send('transaction_submit_output_call_message', object_to_pass)
    event.preventDefault();
  }

  //private
  handle_private_key_save(event){
    console.log("HANDLE PRIVATE SAVE: "+this.state.interim_private_key)
    window.ipcRenderer.send('private_key_save_call_message', this.state)
    event.preventDefault();
  }

  handle_private_key_change(event){
    console.log("HANDLE private key change: "+event.target.value)
    this.setState({
      interim_private_key: event.target.value
    })
    event.preventDefault();
  }

  //public
  handle_public_key_save(event){
    console.log("HANDLE PUBLIC SAVE: "+this.state.interim_public_key)
    window.ipcRenderer.send('public_key_save_call_message', this.state)
    event.preventDefault();
  }

  handle_public_key_change(event){
    console.log("HANDLE public key change: "+event.target.value)
    this.setState({
      interim_public_key: event.target.value
    })
    event.preventDefault();
  }

  async componentDidMount(props) {

    let state = this.props.state
    // TODO: perhaps set interval and call this.loadMonitoredUsers, and others?
    console.log("component loaded...")
    window.ipcRenderer.on('private_key_save_call_reply', (event, result) => {
      //console.log(result)
      console.log("private_key_save_call_reply returnss")
      console.log(result)
      this.setState({
        interim_private_key: this.props.state.interim_private_key,
        set_private_key: result.Result,
        private_key_hash: result.Result
      });
    })

    window.ipcRenderer.on('public_key_save_call_reply', (event, result) => {
      //console.log(result)
      console.log("public_key_save_call_reply returnss")
      console.log(result)
      this.setState({
        interim_public_key: this.props.state.interim_public_key,
        set_public_key: result.Result,
        public_key_hash: result.Result
      });
    })

    window.ipcRenderer.on('transaction_submit_output_call_reply', (event, result) => {
      //console.log(result)
      console.log("transaction_submit_output_call_reply returnss")
      this.setState({
        transaction_submission_status: "done"
      });
    })

  }

  render(props){

    console.log("Transaction: Props from global")
    console.log(this.props.state)

    return (
      <TransactionContext.Provider value={this.state}>
        <TransactionContext.Consumer>
          {( {set_private_key,
              interim_private_key,
              set_public_key,
              interim_public_key,
              public_key_hash,
              private_key_hash} ) => (
            <>
              <br/>
              <Container>
                <Row>
                  <Col lg={{span: 5, offset: 1}}>
                    <Card lg={{span: 2, offset: 2}}>
                      <Card.Header>
                        <h4 className="address_status float-left">
                          Submit Transaction
                        </h4>
                      </Card.Header>
                      <Card.Body>
                        <Card.Text>
                        {/**/}
                        <Container>
                          <Row>
                            <Col lg={{span: 12, offset: 0}}>

                              <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                  <InputGroup.Text  id="basic-addon3">
                                    Sender
                                  </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id="basic-url"
                                             aria-describedby="basic-addon3"
                                             placeholder="ex: user_a"
                                             onChange={this.handle_sender_change} />
                              </InputGroup>


                              <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                  <InputGroup.Text  id="basic-addon3">
                                    TX Type:
                                  </InputGroup.Text>
                                </InputGroup.Prepend>
                                  <Form.Control
                                    as="select"
                                    onChange={this.handle_txtype_change}
                                    custom>
                                      <option>output</option>
                                      <option>input</option>
                                  </Form.Control>
                              </InputGroup>


                              <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                  <InputGroup.Text  id="basic-addon3">
                                    Transaction Data
                                  </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id="basic-url"
                                             as="textarea"
                                             rows="3"
                                             resizable="false"
                                             aria-describedby="basic-addon3"
                                             placeholder="ex: user_a"
                                             onChange={this.handle_transaction_data_change} />
                              </InputGroup>

                              <Button className="float-left" variant="outline-secondary" onClick={this.create_transaction}>
                                Submit
                              </Button>


                            </Col>

                            <Col lg={{span: 12, offset: 0}}>
                              <hr/><h1>TEST</h1>
                            </Col>

                          </Row>
                        </Container>
                        {/**/}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/*PRIVATE KEY*/}
                  <Col>
                    <Row>
                      <Col lg={{span: 12, offset: 0}}>
                        <Card lg={{span: 2, offset: 2}}>
                          <Card.Header>
                            <Row>
                              <Col>
                                <h4 className="address_status float-left">
                                  Private Key
                                </h4>
                              </Col>
                              <Col>
                                <PrivateKeyModal handle_private_key_save={this.handle_private_key_save}
                                          handle_private_key_change={this.handle_private_key_change}
                                          set_private_key={set_private_key} />

                                <PublicKeyModal handle_public_key_save={this.handle_public_key_save}
                                          handle_public_key_change={this.handle_public_key_change}
                                          set_public_key={set_public_key} />
                              </Col>
                            </Row>
                          </Card.Header>
                          <Card.Body>
                            <Card.Text>
                            {/**/}
                            <Row style={{ height: 'auto', maxWidth: '40vw' }}>
                              <Col>
                                <b>?:</b> {set_private_key}
                                <hr/>
                              </Col>
                            </Row>
                            <Row style={{ height: 'auto', maxWidth: '40vw' }}>
                              <Col>
                                <b>Public Key: </b> {public_key_hash}
                                <hr/>
                              </Col>
                            </Row>
                            <Row style={{ height: 'auto', maxWidth: '40vw' }}>
                              <Col>
                                <b>Private Key: </b> {private_key_hash}
                                <hr/>
                              </Col>
                            </Row>
                            {/**/}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
              <br/>
            </>
          )}
        </TransactionContext.Consumer>
      </TransactionContext.Provider>
    )
  }
}



export default Transaction;
