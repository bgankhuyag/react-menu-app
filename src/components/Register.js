// import logo from './logo.svg';
// import './App.css';

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import  { Redirect,Link, Route } from 'react-router-dom';
import axios from 'axios';
import "../Login.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0 && name.length > 0 && password_confirmation.length > 0;
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
      <h3>Register</h3>
        <Form.Group size="lg" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
        <Form.Group size="lg" controlId="password_confirmation">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Register
        </Button>
      </Form>
    </div>
  );
}


export default Register;
