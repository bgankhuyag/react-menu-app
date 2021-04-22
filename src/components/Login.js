// import logo from './logo.svg';
// import './App.css';

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import  { Redirect,Link, Route, Router } from 'react-router-dom';
import Register from './Register.js';
import axios from 'axios';
import "./Login.css";

// <Router>
//   <Route path="/register" component={Register} />
// </Router>

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      } else {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('name', response.data.user.name);
        return <Redirect to='/home' />
      }
    })
    // .catch(function (error) {
    //     console.log(error);
    // });
  }

  return (
    <div className="Login">

      <Form onSubmit={handleSubmit}>
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
  );
}


export default Login;
