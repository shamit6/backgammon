import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Game from './components/Game';
import Loading from './components/Loading';
import {initSocket, socketIoMiddleware} from './middlewares/socketio'
import {INITIAL_STORE_STATE} from './constants'

const store = createStore(reducer, INITIAL_STORE_STATE, applyMiddleware(...[socketIoMiddleware]))

// TODO: Init the listener better of use something else
let eventListener={};
eventListener["STARTGAME"]=[];

console.log(store.getState());
store.subscribe(() => {console.log(store.getState())});

ReactDOM.render(<Provider store={store}>
					<Loading listener={eventListener.STARTGAME} message={"Wait for another player"}>
						<Game/>
					</Loading>
				</Provider>, document.getElementById('app'));


initSocket(store, eventListener);