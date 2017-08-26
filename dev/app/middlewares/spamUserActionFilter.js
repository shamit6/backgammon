import { STEP } from '../actions'

const spamUserActionFilter = store => next => action => {

        if (action.type !== STEP || action.fromServer || store.getState().app.game.clientTurn){
            return next(action);
        }else{
            return action;
        }
};

export default spamUserActionFilter
