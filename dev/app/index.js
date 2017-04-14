import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Game from './components/Game';

import {switchTurn} from './actions';
import {initSocket, socketIoMiddleware} from './middlewares/socketio'


const INITIAL_STATE = 
   {board: [{amount:2, isClient:true, pointId:1}, {amount:0, isClient:true, pointId:2}, 
  	{amount:0, isClient:true, pointId:3}, {amount:0, isClient:true, pointId:4}, 
  	{amount:0, isClient:true, pointId:5}, {amount:5, isClient:false, pointId:6},

	{amount:0, isClient:true, pointId:7}, {amount:3, isClient:false, pointId:8}, 
  	{amount:0, isClient:true, pointId:9}, {amount:0, isClient:true, pointId:10}, 
  	{amount:0, isClient:true, pointId:11}, {amount:5, isClient:true, pointId:12},

	{amount:0, isClient:false, pointId:18}, {amount:3, isClient:true, pointId:17},
  	{amount:0, isClient:true, pointId:16}, {amount:0, isClient:true, pointId:15},
  	{amount:0, isClient:true, pointId:14}, {amount:5, isClient:false, pointId:13},

  	{amount:2, isClient:false, pointId:24}, {amount:0, isClient:true, pointId:23},
  	{amount:0, isClient:true, pointId:22}, {amount:0, isClient:true, pointId:21},
  	{amount:0, isClient:true, pointId:20}, {amount:5, isClient:true, pointId:19}
  	], turn: {clientTurn:false, diced:false, dicesResult:{dice1:0, dice2:0}, moves:[]}};
const store = createStore(reducer, INITIAL_STATE, applyMiddleware(...[socketIoMiddleware]))

initSocket(store)
console.log(store.getState());
store.subscribe(() => {console.log(store.getState())});
//store.dispatch(switchTurn())// Mocking
//<font size="30">Wait for other player </font>
ReactDOM.render(<Provider store={store}>
					<Game/>
				</Provider>, document.getElementById('app'));