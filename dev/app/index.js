import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import Game from './components/Game';
import Loading from './components/Loading';
import {initSocket, socketIoMiddleware} from './middlewares/socketio';
import spamUserActionFilter from './middlewares/spamUserActionFilter';
import {INITIAL_STORE_STATE} from './constants';

const store = createStore(reducer, INITIAL_STORE_STATE, applyMiddleware(...[spamUserActionFilter, socketIoMiddleware]));

// Should I need simply do to listeners os active/deactive and then
// fire each of them in the proper emissions
// If stay like this create class.
const createListeners = () => [
	{eventName: "START_GAME", callbacks:[], toActive:true, message:""},
	{eventName: "RIVAL_RETIREMENT" ,callbacks:[], toActive:false, message:"The second player left. Wait for new another player"}
];

let eventListeners = createListeners();;

// console.log(store.getState());
// store.subscribe(() => {console.log(store.getState())});

const addTrianglesReactivity = () => {
	let avgContainers = document.querySelectorAll("div[data-key]");;
    let svgPapa;
    let poly;
    
    const aa = () => {
    	 	avgContainers.forEach(container => {
        	let svgPapa = container.querySelector("svg");
        	let poly = svgPapa.querySelector("polygon");

			let divBCRect = container.getBoundingClientRect();
			let h = divBCRect.height;
	        let w = divBCRect.width;

	        let a = "0," + h;
	        let b = w/2 + ",0";
	        let c =  w + "," + h;

	        let pointsStr = [a,b,c].join(" ");
	        poly.setAttribute("points", pointsStr);
        });
    };

    aa();
};
    

ReactDOM.render(<Provider store={store}>
					<Loading listeners={eventListeners} message={"Wait for another player"}>
						<Game/>
					</Loading>
				</Provider>, document.getElementById('app'));

;
initSocket(store, eventListeners);

window.addEventListener("resize", addTrianglesReactivity);

// TODO do it elegant
eventListeners[0].callbacks.push(addTrianglesReactivity);