import { STEP, DICING, SWITCH_TURN, SET_TURN, INIT_STATE } from '../actions'
import {INITIAL_STORE_STATE, CLIENT_STATUS} from '../constants'
import {getStateByBoard} from '../rules'

const updateSteps = (fromPoint, toPoint, currentStep) => {
	let stepLength = Math.abs(toPoint-fromPoint);

	const stepIndex = currentStep.indexOf(stepLength);
	let updatedSteps;

	if (stepIndex > -1){
		updatedSteps = [...currentStep.slice(0, stepIndex), ...currentStep.slice(stepIndex+1)]

	// continious step or 
	// drop out max case then (remove the max which is the first)	
	}else{
		updatedSteps = [...currentStep];

		while (stepLength > 0){
			stepLength -= updatedSteps[0];
			updatedSteps = updatedSteps.slice(1);
		}
	}

	return updatedSteps;
}

const moveChecker = (fromPoint, toPoint, isClientTurn, checkersState) => {
	let newCheckersState = checkersState.slice(0);
	const sroucePoint = newCheckersState.find(point => point.pointId == fromPoint);
	const tragetPoint = newCheckersState.find(point => point.pointId == toPoint);

	sroucePoint.amount--;
	
	// if eating rival checker
	if (isClientTurn && !tragetPoint.isClient && tragetPoint.amount==1 &&
		tragetPoint.pointId != 25){ //ignore eating in dropout
		tragetPoint.isClient = sroucePoint.isClient;	
		newCheckersState.find(point => (point.pointId == 25)).amount++;

	// if the rival ate the client
	} else if (!isClientTurn && tragetPoint.isClient && tragetPoint.amount==1&&
		tragetPoint.pointId != 0){ //ignore eating in dropout
		tragetPoint.isClient = sroucePoint.isClient;
		newCheckersState.find(point => (point.pointId == 0)).amount++;

	// In case any player drop out the checker we don't update the target. 
	} else if (!(isClientTurn && tragetPoint.pointId == 25) && 
				!(!isClientTurn && tragetPoint.pointId == 0)){
		tragetPoint.amount++;
		tragetPoint.isClient = isClientTurn;
	}

	return newCheckersState;
}

const reducer = (state = INITIAL_STORE_STATE, action) => {
	
	switch (action.type){
		case DICING:{
			const dicesResult = action.content;
			let newSteps;
			if (dicesResult.dice1 == dicesResult.dice2){
				newSteps = Array(4).fill(dicesResult.dice1);
			}else{
				// sort because calculate 'farestPoint' in rules.js
				newSteps = [dicesResult.dice1, dicesResult.dice2].sort();
			}

			// update the status only if it's client turn.
			const clientStatus = state.clientTurn?getStateByBoard(state.checkersState, newSteps):CLIENT_STATUS.ONGOING;

			return  {...state, clientStatus:clientStatus, diced:true, dicesResult:dicesResult, steps:newSteps};
		}

		case STEP:{
			const {fromPoint, toPoint, isClient} = action.content;

			const updatedSteps = updateSteps(fromPoint, toPoint,state.steps);
			const newCheckersState = moveChecker(fromPoint, toPoint, isClient, state.checkersState);
			const clientStatus = getStateByBoard(state.checkersState, updatedSteps);

			// No steps then finish the turn
			if (updatedSteps.length==0){
				return {...state, checkersState:newCheckersState, clientStatus:clientStatus,
					diced:false, clientTurn: !state.clientTurn, steps:updatedSteps }
			}else{		
				return {...state, checkersState:newCheckersState, clientStatus:clientStatus,
					clientTurn: state.clientTurn, steps:updatedSteps }

			}
		}

		case SWITCH_TURN:{
			return {...state, clientTurn:!state.clientTurn, diced:false, steps:[]}
		}
		case SET_TURN:{
			return {...state,checkersState:[
    {amount:0, isClient:true, pointId:0},

    {amount:2, isClient:true, pointId:1}, {amount:0, isClient:true, pointId:2}, 
    {amount:0, isClient:true, pointId:3}, {amount:0, isClient:true, pointId:4}, 
    {amount:0, isClient:true, pointId:5}, {amount:5, isClient:false, pointId:6},

    {amount:0, isClient:true, pointId:7}, {amount:3, isClient:false, pointId:8}, 
    {amount:0, isClient:true, pointId:9}, {amount:0, isClient:true, pointId:10}, 
    {amount:0, isClient:true, pointId:11}, {amount:5, isClient:true, pointId:12},

    {amount:5, isClient:false, pointId:13}, {amount:0, isClient:true, pointId:14},
    {amount:0, isClient:true, pointId:15}, {amount:0, isClient:true, pointId:16},
    {amount:3, isClient:true, pointId:17}, {amount:0, isClient:false, pointId:18},

    {amount:5, isClient:true, pointId:19}, {amount:0, isClient:true, pointId:20},
    {amount:0, isClient:true, pointId:21}, {amount:0, isClient:true, pointId:22},
    {amount:0, isClient:true, pointId:23}, {amount:2, isClient:false, pointId:24},

    {amount:0, isClient:false, pointId:25}

    ], clientTurn:action.content, diced:false, steps:[]}
		}
		case INIT_STATE:{
			return {...INITIAL_STORE_STATE};
		}
		default:
      		return state
	}
}

export default reducer;