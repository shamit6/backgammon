import io from 'socket.io-client'
import {switchTurn, makeMove, dice} from '../actions';
import {IO_ACTIONS} from '../../common/constants';
import config from  '../../common/config';

let socket;

const initSocket = (store, eventListeners) => {

    const getListener = eventName => (eventListeners.find(l => (l.eventName === eventName)));
    const fireEventListener = eventName => {
        getListener(eventName).callbacks.forEach( callback =>{
            callback();
        })
    };

    const port = config.getParameter("PORT");
    const hostname = config.getParameter("HOSTNAME");
	socket = io('http://' + hostname + ':' + port);

    socket.on('disconnect', () => {
        console.warn('Server disconnected');
    }); 

    socket.on(IO_ACTIONS.startGame, data => {
        console.warn('startGame');
        
        fireEventListener(IO_ACTIONS.startGame);
        
        if (data.start == true){
            store.dispatch(switchTurn());
        }
    });

    socket.on(IO_ACTIONS.gameAction, data => {
        store.dispatch({type:data.type, fromServer:true, content:data.content});
    });

    socket.on(IO_ACTIONS.rivalRetirement, () => {
        fireEventListener(IO_ACTIONS.rivalRetirement);
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