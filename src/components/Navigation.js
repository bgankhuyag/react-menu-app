import React from "react";
import { Link, withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigation(props) {
  // localStorage.removeItem('token');
  if (localStorage.getItem('token') === null) {
    return (
      <div className="navigation">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
        <nav class="navbar navbar-expand navbar-dark bg-dark">
          <div class="container">
            <Link class="navbar-brand" to="/">
              Home
            </Link>

            <div>
              <ul class="navbar-nav ml-auto">
                <li
                  class={`nav-item  ${
                    props.location.pathname === "/login" ? "active" : ""
                  }`}
                >
                  <Link class="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li
                  class={`nav-item  ${
                    props.location.pathname === "/register" ? "active" : ""
                  }`}
                >
                  <Link class="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="navigation">
        <nav class="navbar navbar-expand navbar-dark bg-dark">
          <div class="container">
            <Link class="navbar-brand" to="/">
              Home
            </Link>

            <div>
              <ul class="navbar-nav ml-auto">
                <li
                  class={`nav-item  ${
                    props.location.pathname === "/" ? "active" : ""
                  }`}
                >
                  <Link class="nav-link" to="/">
                    Home
                    <span class="sr-only">(current)</span>
                  </Link>
                </li>
                <li
                  class={`nav-item  ${
                    props.location.pathname === "/about" ? "active" : ""
                  }`}
                >
                  <Link class="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li
                  class={`nav-item  ${
                    props.location.pathname === "/contact" ? "active" : ""
                  }`}
                >
                  <Link class="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navigation);
