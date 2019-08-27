import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import "./Stats.css";
import axios from "axios"

export default class Stats extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isLoading: true,
      name: "",
      level: "",
      rank: "",
      active_legend: "",
      stat_1_name: "",
      stat_2_name: "",
      stat_3_name: "",
      stat_1_value: "",
      stat_2_value: "",
      stat_3_value: "",
    };

  };

  componentDidMount() {
    this.setState({ isLoading: true });
    const username = this.props.username
    const platform = this.props.platform
    const API_key = 'cPbsPwbboyX8oHf9Umh9'
    axios.get(`http://api.mozambiquehe.re/bridge?version=2&player=${username}&platform=${platform}&origin=*&auth=${API_key}`)
      .then(res => {
        this.setState({
          name: res.data.global.name,
          level: res.data.global.level,
          rank: res.data.global.rank.rankName + " " + res.data.global.rank.rankDiv,
          rank_img: res.data.global.rank.rankImg,
          active_legend: res.data.realtime.selectedLegend,
          leg_img: res.data.legends.all[res.data.realtime.selectedLegend].ImgAssets.icon,
          // JSON object from API is not the best, so access to items is convoluted.
          // Alternatative is to define variables in render and Lambda functions.
          // In cases where not all three trackers are being used, the JSON object changes significantly...
          // This should be fixed by the third-party API... it doesn't make much sense to program around it here.
          stat_1_name: res.data.legends.all[res.data.realtime.selectedLegend].data[Object.keys(res.data.legends.all[res.data.realtime.selectedLegend].data)[0]].name,
          stat_2_name: res.data.legends.all[res.data.realtime.selectedLegend].data[Object.keys(res.data.legends.all[res.data.realtime.selectedLegend].data)[1]].name,
          stat_3_name: res.data.legends.all[res.data.realtime.selectedLegend].data[Object.keys(res.data.legends.all[res.data.realtime.selectedLegend].data)[2]].name,
          stat_1_value: res.data.legends.all[res.data.realtime.selectedLegend].data[Object.keys(res.data.legends.all[res.data.realtime.selectedLegend].data)[0]].value,
          stat_2_value: res.data.legends.all[res.data.realtime.selectedLegend].data[Object.keys(res.data.legends.all[res.data.realtime.selectedLegend].data)[1]].value,
          stat_3_value: res.data.legends.all[res.data.realtime.selectedLegend].data[Object.keys(res.data.legends.all[res.data.realtime.selectedLegend].data)[2]].value,
          isLoading: false,
        })
      })
      .catch((err) => {
        this.setState({
          redirectError: true,
          isLoading:false
        })
      })

  };

  callLambda() {
    // Thought proxy server wasn't needed given IAM permissions? Need to look into.
    // This link describes using a proxy server to circumnavigate the CORS requirements:
    // https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9
    // Prepend this to api url to create proxy server: https://cors-anywhere.herokuapp.com/
    axios.post('https://eesk3gqq82.execute-api.us-west-1.amazonaws.com/default/postToDB',
    { username: this.state.name,
      platform: this.props.platform,
      activeLegend: this.state.active_legend,
      level: this.state.level,
      rank: this.state.rank,
      stat1Name: this.state.stat_1_name,
      stat1Value: this.state.stat_1_value,
      stat2Name: this.state.stat_2_name,
      stat2Value: this.state.stat_2_value,
      stat3Name: this.state.stat_3_name,
      stat3Value: this.state.stat_3_value,
    },
    console.log("Lambda function called, DB updated"),
    );
  };

  render() {
    if(this.state.isLoading === true) {
      console.log("Loading...")
      return (
        <div className = "Stats">
          <div className = "loading">
            <span className ="glyphicon glyphicon-refresh spinner"></span>
          </div>
        </div>)
    } else if(this.state.redirectError === true) {
      console.log("Loaded")
      return (
        <div className = "Stats">
          <div className = "error">
            <h2>Whoops!</h2 >
            <p>Username {this.props.username} cannot be found on {this.props.platform} or they are missing tracker data on their active legend's banner.</p>
          </div>
        </div>)
    } else {
      console.log("Loaded")
      // call Lambda to populate DB
      this.callLambda()
      return (
        <div className = "Stats">
          <div className = "top">
            <h2>{ this.state.name }</h2 >
            <p>{ "Level: " + this.state.level }</p>
            <p>{ "Rank: " + this.state.rank }</p>
          </div>
          <div className = "rank_img">
            <img src = { this.state.rank_img } alt = "Not Available"/>
          </div>
          <div className = "bottom">
            <h2>{ "Active Legend: " + this.state.active_legend } </h2>
            <ListGroup>
              <ListGroupItem header = { this.state.stat_1_name }>{ this.state.stat_1_value }</ListGroupItem>
              <ListGroupItem header = { this.state.stat_2_name }>{ this.state.stat_2_value }</ListGroupItem>
              <ListGroupItem header = { this.state.stat_3_name }>{ this.state.stat_3_value }</ListGroupItem>
            </ListGroup>
          </div>
          <div className = "floatcontainer">
            <div className = "leg_img" style = {{
              backgroundImage: `url(${ this.state.leg_img })`,
              backgroundPosition: "50% 40%",
              height: "400px",
              backgroundSize: "350px",
              backgroundRepeat: "no-repeat"}}>
            </div>
          </div>
        </div>
      );
    }
  }
}
