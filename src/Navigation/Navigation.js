import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';


const NavbarBrand = () => (
  <>
  <NavLink to='/' className="nav-item nav-link" href="#">
    <span className="navbar-brand">
      <div className="container offset-2 col-lg-9">
        <div className="row">
          AOS
        </div>
      </div>
    </span>
  </NavLink>
  </>
);

const NavbarMain = () => (

  <div className="container navbar-nav navbar-expand-lg navbar-dark bg-dark">
    <div className="row">
      <Nav defaultActiveKey="/home" id="nav_sidebar" className="flex-column">
        <NavbarBrand/>
        <NavLink to='/' className="nav-item nav-link main_nav" href="#">
          Proposals <span className="sr-only">(current)</span>
        </NavLink>
        <NavLink to='/transactions' className="nav-item nav-link main_nav">
          Transactions
        </NavLink>
      </Nav>
    </div>
  </div>

);

//
// const element = <TestProp name="dev" />;


/*
@name
@description global navigator
*/
const Navigation = () => (
  <NavbarMain/>
);



// export the navigation component
export default Navigation;
