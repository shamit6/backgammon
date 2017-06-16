import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index';

import socketIoMiddleware from './middlewares/socketio';
import spamUserActionFilter from './middlewares/spamUserActionFilter';
import logger from 'redux-logger';

import App from './containers/App';
import {getInitialGameState, getInitialSessionState} from './constants';
import { login } from './actions'

let middlewares = [spamUserActionFilter, socketIoMiddleware];
if (process.env.NODE_ENV === 'production'){
	middlewares.unshift(logger);
}

const store = createStore(reducer, {game:getInitialGameState(), session:getInitialSessionState()}, 
	applyMiddleware(...middlewares));

// Is dispach async and i can't do it - do it in the initailization
const storagedUsername = localStorage.getItem("ShubappBackgammonUsermame");

if (storagedUsername != undefined){
	store.dispatch(login(storagedUsername));
}

ReactDOM.render(<Provider store={store}>
          			<App/>
				</Provider>, document.getElementById('app'));




