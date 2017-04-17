import { DICING, STEP, SWITCH_TURN } from '../actions'
import {INITIAL_STORE_STATE} from '../constants'

// currently not used - merge with board reducer in index.js
const turn = (state = INITIAL_STORE_STATE.turn, action) =>{
	switch (action.type){
		case DICING:{
			const dicesResult = action.content;

			if (dicesResult.dice1 == dicesResult.dice2){
				return {...state, diced:true, dicesResult:dicesResult, steps:Array(4).fill(dicesResult.dice1)};
			}else{
				return  {...state, diced:true, dicesResult:dicesResult, steps:[dicesResult.dice1, dicesResult.dice2].sort()};
			}
 			
		}

		case STEP:{
			const {fromPoint, toPoint} = action.content;
			let stepLength = Math.abs(toPoint-fromPoint);


			const stepIndex = state.steps.indexOf(stepLength);
			let updatedSteps;

			if (stepIndex > -1){
				updatedSteps = [...state.steps.slice(0, stepIndex), ...state.steps.slice(stepIndex+1)]

			// continious step or 
			// drop out max case then (remove the max which is the first)	
			}else{
				updatedSteps = [...state.steps];

				while (stepLength > 0){
					stepLength -= updatedSteps[0];
					updatedSteps = updatedSteps.slice(1);
				}
			}
		

			// No steps then finish the turn
			if (updatedSteps.length==0){
				return {...state, diced:false, clientTurn: !state.clientTurn, steps:updatedSteps }
			}else{
				return {...state, clientTurn: state.clientTurn, steps:updatedSteps }
			}
			
		}

		case SWITCH_TURN:{
			return {...state, clientTurn:!state.clientTurn, diced:false, steps:[]}
		}

		default:
      		return state
	}

}

//export default turn