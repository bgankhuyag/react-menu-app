import React from "react";
import { Redirect, Link, withRouter, useHistory } from "react-router-dom";
import {Navbar, Button, Nav, Form, FormControl, NavDropdown} from "react-bootstrap";
import axios from 'axios';

function Navigation(props) {
  const history = useHistory();
  // localStorage.removeItem('token');
  function logout(event) {
    event.preventDefault();
    axios.post('http://batbold.home/api/auth/logout', {
      token: JSON.parse(localStorage.getItem('token')).value,
    })
    .then(function (response) {
      if (response.data.success === false) {
        console.log(response.data.error);

      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        // return <Redirect to='/' />
        history.push("/");
      }
    })
    // .catch(function (error) {
    //     console.log(error);
    // });
  }
  if (localStorage.getItem('token') === null) {
    return (
      <div className="navigation">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <div className="container">
          <Navbar.Brand href="#home">
            <Link class="navbar-brand" to="/">
              Home
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Nav>
              <ul className="navbar-nav ml-auto">
                <Nav.Link><li
                  class={`nav-item  ${
                    props.location.pathname === "/login" ? "active" : ""
                  }`}
                >
                  <Link class="nav-link" to="/login">
                    <Button variant="outline-light" size="sm">Login</Button>
                  </Link>
                </li></Nav.Link>
                <Nav.Link><li
                  class={`nav-item  ${
                    props.location.pathname === "/register" ? "active" : ""
                  }`}
                >
                  <Link class="nav-link" to="/register">
                    <Button variant="outline-light" size="sm">Register</Button>
                  </Link>
                </li></Nav.Link>
              </ul>
            </Nav>
          </Navbar.Collapse>
          </div>
        </Navbar>
      </div>
    );
  } else {
    return (
      <div className="navigation">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <div className="container">
          <Navbar.Brand href="#home">
            <Link class="navbar-brand" to="/">
              Home
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Nav>
              <ul class="navbar-nav ml-auto">
                <Nav.Link><li
                  class={`nav-item  ${
                    props.location.pathname === "/" ? "active" : ""
                  }`}
                >
                  <Link class="nav-link" to="/">
                    Home
                    <span class="sr-only">(current)</span>
                  </Link>
                </li></Nav.Link>
                <Nav.Link><li
                  class={`nav-item  ${
                    props.location.pathname === "/about" ? "active" : ""
                  }`}
                >
                  <Link class="nav-link" to="/about">
                    About
                  </Link>
                </li></Nav.Link>
                <Nav.Link><li
                  class={`nav-item  ${
                    props.location.pathname === "/contact" ? "active" : ""
                  }`}
                >
                  <Link class="nav-link" to="/contact">
                    Contact
                  </Link>
                </li></Nav.Link>
                <Nav.Link><NavDropdown title={JSON.parse(localStorage.getItem('name')).value} id="collasible-nav-dropdown">
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown></Nav.Link>
              </ul>
            </Nav>
          </Navbar.Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Navigation);
