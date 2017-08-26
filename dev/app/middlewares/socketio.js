
import * as actions from '../actions';
import {IO_ACTIONS} from '../../common/constants';
import config from '../../common/config';
import socket from '../socket';
import {IN_GAME_STATUS} from '../constants';

const initSocket = (store, username) => {

  const isGuest = store.getState().app.session.user.playAsGuest
  socket.init(document.location.host, { query: `username=${username}&isGuest=${isGuest}`});

  socket.on('disconnect', () => {
      console.warn('Server disconnected');
  });

  socket.on(IO_ACTIONS.START_GAME, data => {

      store.dispatch(actions.startGame(data.start, data.opponentInfo));
      //store.dispatch(setTurn(data.start));
  });

  socket.on(IO_ACTIONS.GAME_ACTION, data => {
      store.dispatch({type:data.type, fromServer:true, content:data.content});
  });

  socket.on(IO_ACTIONS.OPPONENT_RETIREMENT, () => {
      store.dispatch(actions.opponentRetirment());
  });
};


const socketIoMiddleware = store => next => action => {


    if (action){
        if (action.type == actions.LOG_OUT){
            socket.close();
        }

        if (action.type == actions.SEARCH_OPPONENT){
            socket.emit(IO_ACTIONS.SEARCH_NEW_OPPONENT);
        }

        if (((action.type == actions.STEP) || (action.type == actions.SWITCH_TURN) || (action.type == actions.DICING))
            && !action.fromServer){
            socket.emit(IO_ACTIONS.GAME_ACTION, convertActionToOpponent(action));


        }
    }
    const ret = next(action);

    // TODO do it better.
    if (action){
      if (action.type == actions.LOG_IN){
          initSocket(store, action.content.username);
      }

      if ((action.type == actions.STEP) && (store.getState().app.game.clientStatus == IN_GAME_STATUS.WINNER)){
          socket.emit(IO_ACTIONS.GAME_OVER);
      }
  }
    return ret;
};

const convertActionToOpponent = action => {
  switch (action.type){
      case actions.STEP:{
        const {isClient, fromPoint, toPoint} = action.content;
        return Object.assign({}, action, {content:{ isClient:!isClient, toPoint: 25-toPoint, fromPoint: 25-fromPoint }})
      }
      default:
            return action
  }
}

export default socketIoMiddleware;
