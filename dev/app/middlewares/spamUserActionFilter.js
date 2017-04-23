
const spamUserActionFilter = store => next => action => {
        if (action.type === "SWITCH_TURN" || action.fromServer || store.getState().clientTurn){
            return next(action);
        }else{
            return action;
        }    
};

export default spamUserActionFilter