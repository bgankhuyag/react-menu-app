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
            return [<div>
                      <div className="base-input">
                        <input className="base" type="radio" id={base.base} name="base" />
                      </div>
                      <div className="description">
                        <img src={base.images.name} />
                        <div>
                          <div className="description-label">{base.base}</div>
                          <div className="description-extra">{base.description}</div>
                          <div className="description-price">₮{base.price}</div>
                        </div>
                        <div className="description-quantity">Quantity: <input type="number" min="0" /></div>
                      </div>
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

  const basesList = bases.map((base, i) => <label key={'base'+i} onClick={clickBase}><div className="bases">{base}</div></label>);
  const condimentsList = condiments.map((condiment, i) => <div key={'condiment'+i}>{condiment}</div>);
  const toppingsList = toppings.map((topping, i) => <div key={'topping'+i}>{topping}</div>);

  function clickBase(e) {
    // e.preventDefault();
    var baseOptions = document.getElementsByClassName('base');
    for (var i = 0; i < baseOptions.length; i++) {
      if (baseOptions[i].checked) {
        // console.log(baseOptions[i].parentElement);
        baseOptions[i].parentElement.parentElement.parentElement.style.border = "2px solid yellow";
      } else {
        baseOptions[i].parentElement.parentElement.parentElement.style.border = "2px solid grey";
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
    var baseOptions = document.getElementsByName('base');
    for (var i = 0; i < baseOptions.length; i++) {
      if (baseOptions[i].checked) {
        // console.log(baseOptions[i].id);
        selectedBase = baseOptions[i].id;
      }
    }
    console.log(selectedBase);
  }

  return (
    <div className="contact">
      <div class="container form">
        <Form onSubmit={handleSubmit}>
          <h4>Entree</h4>
          <div className="base-options">
            {basesList}
          </div>
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
