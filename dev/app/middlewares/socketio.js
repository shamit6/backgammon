import io from 'socket.io-client'
import {switchTurn, makeMove, dice} from '../actions';

let socket;

const initSocket = (store, eventListener) => {

	console.log('try connect');
    const port = process.env.PORT || 4444;
    
	socket = io('http://localhost:' + port);

    socket.on('disconnect', () => {
        console.warn('Server disconnected');
    }); 

    socket.on("START_GAME", () => {
        console.warn(eventListener.STARTGAME);
        eventListener.STARTGAME.forEach( callback =>{
        	callback();
        });
    });

    socket.on("GAME_ACTION", data => {
        store.dispatch({type:data.type, fromServer:true, content:data.content});
    });
};


const socketIoMiddleware = store => next => action => {
    const result = next(action);
	if (action && ! action.fromServer){
	     socket.emit("GAME_ACTION", action);
	}

	    return result;
	};

export {initSocket, socketIoMiddleware}