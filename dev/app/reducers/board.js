import { MOVING, DICING } from '../actions'
import {INITIAL_STORE_STATE} from '../constants'

const board = (state = INITIAL_STORE_STATE.board, action) => {
	switch (action.type){
		case MOVING:{
			let newState = state.slice(0);

			// TODO currently Rely on pointId = indexOf
			const {fromPoint, toPoint, isClient} = action.content;
			let sroucePoint = newState[fromPoint];
			let tragetPoint = newState[toPoint];

			sroucePoint.amount--;
			

			// if eating rival checker
			if (isClient && !tragetPoint.isClient && tragetPoint.amount==1){
				tragetPoint.isClient = sroucePoint.isClient;	
				newState[25].amount++; // TODO currently Rely on pointId = indexOf, constants

			// if the rival ate the client
			} else if (!isClient && tragetPoint.isClient && tragetPoint.amount==1){
				tragetPoint.isClient = sroucePoint.isClient;
				newState[0].amount++;

			// No eating
			} else {
				tragetPoint.amount++;
				tragetPoint.isClient = sroucePoint.isClient;
			}

			return newState;
		}
		default:
      		return state
	}
}

export default board