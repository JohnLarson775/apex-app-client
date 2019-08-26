import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";

class App extends Component {

  render() {
    
    return (
      <div className = "App container">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to = "/">The Apex Legend</Link>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
      <Routes />
      </div>
    );
  }
}

export default withRouter(App);