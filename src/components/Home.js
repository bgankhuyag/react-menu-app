import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Navigation, Footer, About, Contact } from ".";

function Home() {
  return (
    <div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Home</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <Link class="nav-link" to="/about">
              About
            </Link>
            <Link class="nav-link" to="/contact">
              Contact
            </Link>
            <Switch>
              <Route path="/about" exact component={() => <About />} />
              <Route path="/contact" exact component={() => <Contact />} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
