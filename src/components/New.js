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
            return [<div><label>
                      <input onClick={clickBase} className="base" type="radio" id={base.base} value={base.base} name="base" />
                      <img src={base.images.name} /><div className="description">{base.base}<br />₮{base.price}</div></label>
                    </div>, ...prev];
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

  const basesList = bases.map((base, i) => <div className="bases" key={'base'+i}>{base}</div>);
  const condimentsList = condiments.map((condiment, i) => <div key={'condiment'+i}>{condiment}</div>);
  const toppingsList = toppings.map((topping, i) => <div key={'topping'+i}>{topping}</div>);

  function clickBase(e) {
    e.preventDefault();
    console.log(e.target);
    var baseOptions = document.getElementsByClassName('base');
    for (var i = 0; i < baseOptions.length; i++) {
      if (baseOptions[i].checked) {
        console.log(baseOptions[i].parentElement.children[1]);
        baseOptions[i].parentElement.children[1].style.border = "2px solid yellow";
      } else {
        baseOptions[i].parentElement.children[1].style.border = "2px solid #343a40";
      }
    }
  }

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
    var selectedBase;
    console.log(selectedCondiments);
    var selectedBase = "";
    var baseOptions = document.getElementsByClassName('base');
    for (var i = 0; i < baseOptions.length; i++) {
      if (baseOptions[i].checked) {
        console.log(baseOptions[i]);
        selectedBase = baseOptions[i].value;
      }
    }
    console.log(selectedBase);
  }

  return (
    <div className="contact">
      <div class="container form">
      Order
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <h4>Entree</h4>
          {basesList}
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
