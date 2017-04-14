import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Game from './components/Game';

import {switchTurn} from './actions';
import {initSocket, socketIoMiddleware} from './middlewares/socketio'
import {INITIAL_STORE_STATE} from './constants'


const store = createStore(reducer, INITIAL_STORE_STATE, applyMiddleware(...[socketIoMiddleware]))

initSocket(store)
console.log(store.getState());
store.subscribe(() => {console.log(store.getState())});
//store.dispatch(switchTurn())// Mocking
//<font size="30">Wait for other player </font>
ReactDOM.render(<Provider store={store}>
					<Game/>
				</Provider>, document.getElementById('app'));