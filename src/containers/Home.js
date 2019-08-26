import React, { Component } from "react";
import { Button, ButtonGroup, ButtonToolbar, InputGroup, FormControl } from "react-bootstrap";
import "./Home.css";
import logo from "../apex_logo.jpg"

export default class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: "",
      platform: "PS4",
    };
  };

  validateForm() {
    return this.state.username.length > 0 ;
  };

  platform(i) {
    this.setState({platform: i});
  };

  reRoute = () => {
    this.props.history.push(`/stats/${this.state.username}/${this.state.platform}`);
  }

  render() {
    return (
      <div className = "Home">
        <div className = "lander">
          <img src = {logo} alt = "Not Available"/>
          <p>See how you stack up against the competition in Kings Canyon</p>       
          <ButtonToolbar className = "center">
            <ButtonGroup className = "center">
              <Button onClick = {() => this.platform('PC')} active = {this.state.platform === 'PC'}>PC</Button>
              <Button onClick = {() => this.platform('PS4')} active = {this.state.platform === 'PS4'}>PS4</Button>
              <Button onClick = {() => this.platform('X1')} active = {this.state.platform === 'X1'}>X1</Button>
            </ButtonGroup>
            <InputGroup className = "center">
              <FormControl 
                onChange = {(event) => this.setState({ username: event.target.value })} 
                value = {this.state.username} 
                autoFocus
                placeholder = "Enter username"
              />
            </InputGroup>
              <Button className = "center" onClick = {this.reRoute} disabled = {!this.validateForm()}>Enter</Button>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}