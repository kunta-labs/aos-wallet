import React from 'react';
import { Switch, Route, IndexRoute } from 'react-router-dom';
import Transaction from './views/Transaction/';
import Proposal from './views/Proposal/';



/*
@name Content
@description content component containing the main navigation router
This is because a Route will match for any URL that contains its path by default
*/
class Content extends React.Component {
  render(props){
    console.log(this.props)
    return (
      <>
      <Switch>
        <Route exact path='/' component={() => <Proposal state={this.props.state}/>}></Route>
        <Route exact path='/transactions' component={() => <Transaction state={this.props.state}/>}></Route>
      </Switch>
      </>
    )
  }
}


export default Content;
