import { SWITCH_TURN, SET_TURN } from '../actions'

const spamUserActionFilter = store => next => action => {
        if (action.type === SWITCH_TURN || action.type === SET_TURN || action.fromServer || store.getState().clientTurn){
            return next(action);
        }else{
            return action;
        }    
};

export default spamUserActionFilter