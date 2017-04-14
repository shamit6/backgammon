import { DICING, MOVING, SWITCH_TURN } from '../actions'

const turn = (state = {clientTurn:false, diced:false, dicesResult:{dice1:0, dice2:0}, moves:[]}, action) =>{
	switch (action.type){
		case DICING:{
			const dicesResult = action.content;

			if (dicesResult.dice1 == dicesResult.dice2){
				return Object.assign({}, state, {diced:true, dicesResult:dicesResult, moves:Array(4).fill(dicesResult.dice1)});
			}else{
				return  Object.assign({}, state, {diced:true, dicesResult:dicesResult, moves:[dicesResult.dice1, dicesResult.dice2]});
			}
 			
		}

		case MOVING:{
			const {fromPoint, toPoint} = action.content;
			//console.log("toPoint-fromPoint" + (toPoint-fromPoint));
			const index = state.moves.indexOf(Math.abs(toPoint-fromPoint));
			//console.log("index:" + index);
			const updatedMoves = [...state.moves.slice(0, index), ...state.moves.slice(index+1)]

			// No moves then finish the turn
			if (updatedMoves.length==0){
				return Object.assign({}, state, { diced:false, clientTurn: !state.clientTurn, moves:updatedMoves })
			}else{
				return Object.assign({}, state, { clientTurn: state.clientTurn, moves:updatedMoves })
			}
			
		}

		case SWITCH_TURN:{
			return Object.assign({}, state, {clientTurn:!state.clientTurn, diced:false, moves:[]})
		}

		default:
      		return state
	}

}

export default turn