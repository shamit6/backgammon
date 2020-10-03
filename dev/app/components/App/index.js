import React from "react";
import MainPage from "../MainPage";
import PrivateRoute from "../../containers/PrivateRoute";
import Login from "../../containers/Login";

import { Link, Redirect } from "react-router-dom";
import { Router, Switch, Route } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";

const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <Switch>
      <PrivateRoute path="/main" component={MainPage} history={history} />
      <Route component={Login} />
    </Switch>
  </Router>
);

export default App;
