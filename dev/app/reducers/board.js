import { STEP, DICING } from '../actions'
import {INITIAL_STORE_STATE} from '../constants'
import {getStateByBoard} from '../rules'

// currently not used - merge with turn reducer in index.js
const board = (state = INITIAL_STORE_STATE.board, action) => {
	switch (action.type){
		case STEP:{
			let newCheckersState = state.checkersState.slice(0);

			// TODO currently Rely on pointId = indexOf
			const {fromPoint, toPoint, isClient} = action.content;
			console.log(action.content);
			let sroucePoint = newCheckersState.find(point => point.pointId == fromPoint);
			let tragetPoint = newCheckersState.find(point => point.pointId == toPoint);

			sroucePoint.amount--;
			

			// if eating rival checker
			if (isClient && !tragetPoint.isClient && tragetPoint.amount==1){
				tragetPoint.isClient = sroucePoint.isClient;	
				newCheckersState.find(point => (point.pointId == 25)).amount++;

			// if the rival ate the client
			} else if (!isClient && tragetPoint.isClient && tragetPoint.amount==1){
				tragetPoint.isClient = sroucePoint.isClient;
				newCheckersState.find(point => (point.pointId == 0)).amount++;

			// In case any player drop out the checker we don't update the target. 
			} else if (!(isClient && tragetPoint.pointId == 25) && 
						!(!isClient && tragetPoint.pointId == 0)){
				tragetPoint.amount++;
				tragetPoint.isClient = isClient;
			}

			return {checkersState :newCheckersState, clientStatus:getStateByBoard(newCheckersState)};
		}
		default:
      		return state
	}
}

//export default board