import io from 'socket.io-client';

let socket;
let wrapper = {
  	init: (address, options) => {socket = io(address, options)},
  	close: () => {socket.close();},
	on: (actionName, callback) => {socket.on(actionName, callback);},
	emit: (actionName, data) => {socket.emit(actionName, data);}
};

export default wrapper;