import io from 'socket.io-client'
import {switchTurn, makeMove, dice} from '../actions';

let socket;

const initSocket = store => {

	console.log('try connect');

	socket = io('http://localhost:4444');

    socket.on('disconnect', () => {
        console.warn('Server disconnected');
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