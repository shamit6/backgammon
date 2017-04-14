import { MOVING, DICING } from '../actions'
import {INITIAL_STORE_STATE} from '../constants'

const board = (state = INITIAL_STORE_STATE.board, action) => {
	switch (action.type){
		case MOVING:{
			const {fromPoint, toPoint, isClient} = action.content;
			return state.map(point => {
				if (point.pointId == fromPoint){
					return {...point, amount:point.amount-1}; 
				} else if (point.pointId == toPoint){
					return {... point, amount:point.amount+1, isClient: isClient}; 
				}else{
					return point
				}
			})
		}
		default:
      		return state
	}
}

export default board