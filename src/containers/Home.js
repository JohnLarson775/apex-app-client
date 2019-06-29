import React, { Component } from "react";
import { Button, ButtonGroup, ButtonToolbar, InputGroup, FormControl} from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="Home">
          <div className="lander">
            <h1>The Apex Legend</h1>
            <p>See how you stack up against the competition in Kings Canyon</p>
            <ButtonToolbar className="center">
              <ButtonGroup>
                <Button variant="primary">PC</Button>
                <Button>PS4</Button>
                <Button>X1</Button>
              </ButtonGroup>
                <InputGroup>
                  <FormControl
                    autoFocus
                    placeholder="Enter username"
                  />
                </InputGroup>
              <Button>Enter</Button>
            </ButtonToolbar>
          </div>
        </div>
      </div>
    );
  }
}