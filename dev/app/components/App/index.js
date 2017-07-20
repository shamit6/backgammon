import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from '../MainPage';
import Login from '../../containers/Login';

import { Link, Redirect } from 'react-router-dom';
import { Router, Switch, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

const app = ({logout, eventListeners, session}) =>  {
	const PrivateRoute = ({ component: Component, ...rest }) => (
	  <Route {...rest} render={props => (
	    session.isLoggedIn ? (
	      <Component logout={logout} {...rest} />
	    ) : (
	      <Redirect to={{
	        pathname: '/',
	        state: { from: props.location }
	      }}/>
	    )
	  )}/>
	);

	return <Router history={history}>
		<Switch>
			<PrivateRoute path="/main" component={MainPage} history={history} userInfo={session.user}/>
			<Route component={Login}/>
		</Switch>
	</Router>}

export default app;
