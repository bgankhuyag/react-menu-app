import React, {useState, useEffect} from "react";
import {Navbar, Button, Nav, Form, FormControl, NavDropdown} from "react-bootstrap";
import axios from 'axios';

function New() {
  const [bases, editBases] = useState([]);
  const [condiments, editCondiments] = useState([]);
  const [toppings, editToppings] = useState([]);

  useEffect(() => {
    axios.post('http://batbold.home/api/menu', {
      token: JSON.parse(localStorage.getItem('token')).value,
    })
    .then(function (response) {
      if (response.data.success === false) {
        console.log(response.data.error);

      } else {
        console.log(response.data);
      }
    })
  }, []);

  return (
    <div className="contact">
      <div class="container">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Form.Group controlId="test">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default New;
