import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Navigation, Footer, About, Contact } from ".";
import {Carousel} from "react-bootstrap";
import axios from 'axios';
import "../Home.css";

function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.post('http://batbold.home/api/images', {
      token: JSON.parse(localStorage.getItem('token')).value,
    })
    .then(function (response) {
      if (response.data.success === false) {
        console.log(response.data.error);

      } else {
        console.log(response.data);
        setImages([]);
        response.data.forEach(image => {
          setImages((prev) => {
            return [<img className="d-block w-100" src={image.name} />, ...prev];
          });
          console.log(images);
        });
      }
    })
  }, []);

  const imageList = images.map(image => <li>{image}</li>);
  const imageCarousel = images.map(image => <Carousel.Item>
                                              {image}
                                              <Carousel.Caption>
                                                <h3>First slide label</h3>
                                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                              </Carousel.Caption>
                                            </Carousel.Item>);

  return (
    <div className="home">
      <div class="container">
        <h1>Welcome to a <br /> restaurant near you</h1>
        <ul className="images-list">
          {imageList}
        </ul>
        <Carousel>
          {imageCarousel}
        </Carousel>
      </div>
    </div>
  );
}

export default Home;
