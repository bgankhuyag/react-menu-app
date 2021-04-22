import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, Contact, Login, Register } from "./components";
function App() {
  var login = null;
  var reg = null;

  if (!localStorage.getItem('token')) {
    login = <Route path="/login" exact component={() => <Login />} />;
    reg = <Route path="/register" exact component={() => <Register />} />;
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
          <Route path="/contact" exact component={() => <Contact />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
