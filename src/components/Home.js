import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Navigation, Footer, About, Contact } from ".";
import {Carousel} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import "../Home.css";

function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.post('http://batbold.home/api/images', {
      // token: JSON.parse(localStorage.getItem('token')).value,
    })
    .then(function (response) {
      if (response.data.success === false) {
        console.log(response.data.error, 'here');

      } else {
        console.log(response.data);
        setImages([]);
        response.data.forEach(image => {
          setImages((prev) => {
            return [<img className="testing" src={image.name} />, ...prev];
          });
        });
      }
    })
  }, []);

  const imageList = images.map((image, i) => <li key={'image'+i}>{image}</li>);

  return (
    <div className="home">
      <div class="container">
        <h1>Welcome to a <br /> restaurant near you</h1>
        <ul className="images-list">
          {imageList}
        </ul>
        <ul className="contacts">
          <li>Contact Us: </li>
          <li><FontAwesomeIcon icon={faPhoneAlt} /> 9999-9999</li>
          <li><FontAwesomeIcon icon={faEnvelope} /> restaurant@gmail.com</li>
          <li><FontAwesomeIcon icon={faMapMarkerAlt} /> Ulaanbaatar, Mongolia</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
