import { DICING, MOVING, SWITCH_TURN } from '../actions'

const turn = (state = {clientTurn:false, diced:false, dicesResult:{dice1:0, dice2:0}, moves:[]}, action) =>{
	switch (action.type){

		case DICING:{
			const dicesResult = action.dicesResult;

			if (dicesResult.dice1 == dicesResult.dice2){
				return {clientTurn:true, diced:true, dicesResult:dicesResult, moves:Array(4).fill(dicesResult.dice1)};
			}else{
				return {clientTurn:true, diced:true, dicesResult:dicesResult, moves:[dicesResult.dice1, dicesResult.dice2]};
			}
 			
		}

		case MOVING:{
			const {fromPoint, toPoint} = action.move;
			//console.log("toPoint-fromPoint" + (toPoint-fromPoint));
			const index = state.moves.indexOf(toPoint-fromPoint);
			//console.log("index:" + index);
			const updatedMoves = [...state.moves.slice(0, index), ...state.moves.slice(index+1)]

			// No moves then finish the turn
			const updatedTurn = (updatedMoves.length==0?false:true);
			return Object.assign({}, state, { clientTurn: updatedTurn, moves:updatedMoves })
		}

		case SWITCH_TURN:{
			return Object.assign({}, state, {clientTurn:!state.clientTurn, diced:false, moves:[]})
		}

		default:
      		return state
	}

}

export default turn