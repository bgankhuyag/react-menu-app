import React, {useState, useEffect} from "react";
import {Navbar, Button, Nav, Form, FormControl, NavDropdown} from "react-bootstrap";
import axios from 'axios';

function New() {
  const [bases, setBases] = useState([]);
  const [condiments, setCondiments] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [selectedBase, setSelectedBase] = useState("");
  const [selectedCondiments, setSelectedCondiments] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);

  useEffect(() => {
    // setSelectedBase("");
    // setSelectedToppings([]);
    // setSelectedCondiments([]);
    axios.post('http://batbold.home/api/menu', {
      token: JSON.parse(localStorage.getItem('token')).value,
    })
    .then(function (response) {
      if (response.data.success === false) {
        console.log(response.data.error);

      } else {
        console.log(response.data.bases);
        setCondiments([]);
        response.data.condiments.forEach(condiment => {
          setCondiments((prev) => {
            if (selectedCondiments.includes(condiment.condiment)) {
              return [<Form.Check type="checkbox" onChange={(e) => click('condiments', e)} id={condiment.condiment} label={condiment.condiment} checked={true} />, ...prev];
            } else {
              return [<Form.Check type="checkbox" onChange={(e) => click('condiments', e)} id={condiment.condiment} label={condiment.condiment} />, ...prev];
            }
          });
        });
        setToppings([]);
        response.data.toppings.forEach(topping => {
          setToppings((prev) => {
            return [<Form.Check type="checkbox" onClick={(e) => click('toppings', e)} id={topping.topping} label={topping.topping} />, ...prev];
          });
        });
      }
    })
  }, [selectedCondiments]);

  const condimentsList = condiments.map((condiment, i) => <div key={'condiment'+i}>{condiment}</div>);
  const toppingsList = toppings.map((topping, i) => <div key={'topping'+i}>{topping}</div>);

  function click(category, e) {
    // e.preventDefault();
    console.log(e.target.checked);
    if (category == 'condiments') {
      if (e.target.checked) {
        setSelectedCondiments((prev) => { return [...prev, e.target.id];});
        console.log(selectedCondiments);
      } else {
        setSelectedCondiments((prev) => prev.filter(
          (condiment) => condiment !== e.target.id
        ));
        console.log(selectedCondiments);
      }
    }
  }

  function handleSubmit(e) {
    console.log(condiments);
    return false;
  }

  return (
    <div className="contact">
      <div class="container">
      Order
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" onChange={click} label="Check me out" />
          </Form.Group>
          <Form.Group controlId="test">
            <Form.Check type="checkbox" onClick={click} label="Check me out" />
          </Form.Group>
          <Form.Check type="checkbox" onClick={(e) => click('category', e)} label="Check me out" className="category" id="category" />
          <Form.Check type="checkbox" onClick={() => click('category')} label="Check me out" className="category" id="categor" />
          {condimentsList}
          {toppingsList}
          <Button block size="lg" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default New;
