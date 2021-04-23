// import logo from './logo.svg';
// import './App.css';

import React, { useState, useEffect } from "react";
import {Form, Button, Alert} from "react-bootstrap";
import  { Redirect,Link, Route, Router, useHistory} from 'react-router-dom';
// import Register from './Register.js';
import axios from 'axios';
import "../Login.css";

// <Router>
//   <Route path="/register" component={Register} />
// </Router>

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://batbold.home/api/auth/login', {
      email: email,
      password: password
    })
    .then(function (response) {
      if (response.data.success === false) {
        console.log(response.data.error);
        setError(<Alert variant='danger'>
          {response.data.error}
        </Alert>);
      } else {
        const now = new Date();
        const token = {
      		value: response.data.access_token,
      		expiry: now.getTime() + 3600000,
      	}
        const role = {
      		value: response.data.user.role,
      		expiry: now.getTime() + 3600000,
      	}
        const name = {
      		value: response.data.user.name,
      		expiry: now.getTime() + 3600000,
      	}
      	localStorage.setItem('token', JSON.stringify(token));
        // console.log(JSON.parse(localStorage.getItem('token')).value, response.data.access_token);
        localStorage.setItem('role', JSON.stringify(role));
        localStorage.setItem('name', JSON.stringify(name));
        // return <Redirect to='/' />
        history.push("/");
      }
    })
    // .catch(function (error) {
    //     console.log(error);
    // });
  }

  return (
    <div className="container">
      <div className="Login">
      {error}
        <Form onSubmit={handleSubmit}>
        <h3>Login</h3>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}


export default Login;
