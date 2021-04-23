import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, New, Login, Register } from "./components";
function App() {
  var login = null;
  var reg = null;
  var newItem = null;

  const token = JSON.parse(localStorage.getItem('token')).value;

  useEffect(() => {

  }, [token]);
  if (!localStorage.getItem('token')) {
    login = <Route path="/login" exact component={() => <Login />} />;
    reg = <Route path="/register" exact component={() => <Register />} />;
  } else {
    newItem = <Route path="/new" exact component={() => <New />} />;
  }

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          {login}
          {reg}
          <Route path="/" exact component={() => <Home />} />
          <Route path="/about" exact component={() => <About />} />
          {newItem}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
