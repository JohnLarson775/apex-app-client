import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Stats from "./containers/Stats";
import NotFound from "./containers/NotFound";

export default () =>
  <Switch>
  	<Route path="/" exact component={Home} />
    <Route 
      path = '/stats/:username/:platform' 
      /* use username and platform to create link and pass as props */
      render = {({ match }) => <Stats username = {match.params.username} platform = {match.params.platform}/> } />
    { /* Finally, catch all unmatched routes */ }
    <Route component = {NotFound} />
  </Switch>;