import io from 'socket.io-client'
import {switchTurn, makeMove, dice} from '../actions';
import {IO_ACTIONS} from '../../common/constants';

let socket;

const initSocket = (store, eventListener) => {

	console.log('try connect');
    const port = process.env.PORT || 4444;
    
	socket = io('http://localhost:' + port);

    socket.on('disconnect', () => {
        console.warn('Server disconnected');
    }); 

    socket.on(IO_ACTIONS.startGame, data => {
        eventListener.STARTGAME.forEach( callback =>{
        	callback();
        });
        
        if (data.start == true){
            store.dispatch(switchTurn());
        }
    });

    socket.on(IO_ACTIONS.gameAction, data => {
        store.dispatch({type:data.type, fromServer:true, content:data.content});
    });
};


const socketIoMiddleware = store => next => action => {
    
    	if (action && (action.type !== "SWITCH_TURN") && !action.fromServer){     

            if (store.getState().clientTurn){
                
                socket.emit(IO_ACTIONS.gameAction, convertActionToRival(action));
            }else{
                return action;
            }    
    	     
    	}
        
        return next(action);
};

const convertActionToRival = action => {
  switch (action.type){
      case "STEP":{
        const {isClient, fromPoint, toPoint} = action.content;
        return Object.assign({}, action, {content:{ isClient:!isClient, toPoint: 25-toPoint, fromPoint: 25-fromPoint }})
      }
      default:
            return action
  }
}

export {initSocket, socketIoMiddleware}