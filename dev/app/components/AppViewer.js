import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './MainPage';
import Login from '../containers/Login';

import { HashRouter as Router, Link, Redirect } from 'react-router-dom';
import { Switch, Route } from 'react-router';


const app = ({logout, eventListeners, isLoggedIn}) =>  {
	const PrivateRoute = ({ component: Component, ...rest }) => (
	  <Route {...rest} render={props => (
	    isLoggedIn ? (
	      <Component logout={logout} {...rest} />
	    ) : (
	      <Redirect to={{
	        pathname: '/',
	        state: { from: props.location }
	      }}/>
	    )
	  )}/>
	);

	return <Router>
		<Switch>
			<PrivateRoute path="/main" component={MainPage}/>
			<Route component={Login}/>
		</Switch>
	</Router>}

export default app;