import React, {useState, useEffect} from "react";
import {Navbar, Button, Nav, Form, FormControl, NavDropdown, Row, Col} from "react-bootstrap";
import axios from 'axios';
import '../New.css';

function New() {
  const [bases, setBases] = useState([]);
  const [condiments, setCondiments] = useState([]);
  const [toppings, setToppings] = useState([]);

  useEffect(() => {
    axios.post('http://batbold.home/api/menu', {
      token: JSON.parse(localStorage.getItem('token')).value,
    })
    .then(function (response) {
      if (response.data.success === false) {
        console.log(response.data.error);

      } else {
        console.log(response.data.bases);
        setBases([]);
        response.data.bases.forEach(base => {
          setBases((prev) => {
            return [base.base, ...prev];
          });
        });
        setCondiments([]);
        response.data.condiments.forEach(condiment => {
          setCondiments((prev) => {
            return [<Form.Check type="checkbox" className="condiment" id={condiment.condiment} label={condiment.condiment} />, ...prev];
          });
        });
        setToppings([]);
        response.data.toppings.forEach(topping => {
          setToppings((prev) => {
            return [<Form.Check type="checkbox" className="topping" id={topping.topping} label={topping.topping} />, ...prev];
          });
        });
      }
    })
  }, []);

  const basesList = bases.map((base, i) => <input key={'base'+i} type="radio" value={base} name="base" />{base});
  const condimentsList = condiments.map((condiment, i) => <div key={'condiment'+i}>{condiment}</div>);
  const toppingsList = toppings.map((topping, i) => <div key={'topping'+i}>{topping}</div>);

  function handleSubmit(e) {
    e.preventDefault();
    var toppingOptions = document.getElementsByClassName('topping');
    const selectedToppings = [];
    for (var i = 0; i < toppingOptions.length; i++) {
      if (toppingOptions[i].firstChild.checked) {
        var item = toppingOptions[i].firstChild.id;
        selectedToppings.push(item);
      }
    }
    console.log(selectedToppings);
    var condimentOptions = document.getElementsByClassName('condiment');
    const selectedCondiments = [];
    for (var i = 0; i < condimentOptions.length; i++) {
      if (condimentOptions[i].firstChild.checked) {
        var item = condimentOptions[i].firstChild.id;
        selectedCondiments.push(item);
      }
    }
    console.log(selectedCondiments);
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
          <Form.Group as={Row}>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="first radio"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
              <Form.Check
                type="radio"
                label="second radio"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
              />
              <Form.Check
                type="radio"
                label="third radio"
                name="formHorizontalRadios"
                id="formHorizontalRadios3"
              />
            </Col>
          </Form.Group>
          <div className="options">
            <div class="categories">
              <h4>Condiments</h4>
              {condimentsList}
            </div>
            <div className="toppings">
              <h4>Toppings</h4>
              {toppingsList}
            </div>
          </div>
          <Button className="submit" variant="primary" type="submit">
            Submit Order
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default New;
