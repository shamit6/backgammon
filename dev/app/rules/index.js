import {INITIAL_STORE_STATE, CLIENT_STATUS} from '../constants'

const getPoint = (board, pointId) => (board.find(point => (point.pointId == pointId)));

const isPointFree = (point) => (point.isClient || point.amount<=1);

const numberOfCheckersInBoard = (board, isClient, minPoint = 0 , maxPoint = 25) =>
	(board.reduce((sumChecker, point) => {
				if (point.isClient == isClient && point.pointId>=minPoint && point.pointId<=maxPoint){
					return sumChecker + point.amount
				}else{
					return sumChecker;
				}
			},0))

// Only for client
const isStuckInPoint = (pointId, board, steps) => {
	console.log("pointId:"+ pointId + "  . steps:" + steps);
	const possibleTargetPointsIds = canBeDraggedTo(pointId, board, steps);
	console.log("possibleTargetPointsIds:"+ possibleTargetPointsIds);
	return board.findIndex(p => (possibleTargetPointsIds.indexOf(p.pointId) > -1 && 
		isPointFree(p))) == -1;
}
	

const possibleClientContiniousSteps = (pointId, board, singleSteps) =>{

	let continiousSteps = [];

	// In case of double
	if (singleSteps.length > 2){
		i=0;
		let currStep = singleSteps[0];

		while (i < singleSteps.length){
			let point = getPoint(board, Math.min(pointId+currStep, 25));

			if (isPointFree(point)){
				continiousSteps.push(currStep);
			}else{
				break;
			}
			currStep += singleSteps[0];
		}

	}else if (singleSteps.length > 0){
		const firstStep = singleSteps[0];
		const firstPoint = getPoint(board, Math.min(pointId+firstStep, 25));

		if (isPointFree(firstPoint)){
			continiousSteps.push(firstStep);
		}

		const secondStep = singleSteps[1];
		const secondPoint = getPoint(board, Math.min(pointId+secondStep, 25));

		if (typeof secondStep !== 'undefined') {
			if (isPointFree(secondPoint)){
				continiousSteps.push(secondStep);
			}

			const combinedPoint = getPoint(board, Math.min(pointId+firstStep+secondStep, 25));	
			if (isPointFree(combinedPoint)){
				continiousSteps.push(firstStep+secondStep);
			}
		}
	}
	return continiousSteps;
}	
	/**
const possibleClientContiniousSteps = (pointId, board, singleSteps) => {

	let rejectedSteps = [];
	let stepsForCheck = [...singleSteps];
	let continiousSteps = [];
		
	while (stepsForCheck.length != 0){
		let currStep = stepsForCheck.pop();
		const currPoint = getPoint(board, Math.min(pointId+currStep, 25));
		
		let newSteps = [];
		// try to find continious steps.
		continiousSteps.forEach(validStep => {
			const nextPoint = getPoint(board, Math.min(pointId+validStep+currStep, 25));

			if (isPointFree(nextPoint)){
				// save continious steps 
				newSteps.push(validStep+currStep);
			}

			newSteps.push(validStep);
		});

		if (isPointFree(currPoint) && newSteps.length != 0){
			newSteps.push(currStep);
		}else{
			rejectedSteps.push(currStep)
		}

		continiousSteps.
	}

	return newSteps;
	
}

*/
const isStuckInBoard = (board, steps, minPoint = 0 , maxPoint = 25) => 
	(board.every(p => ((p.pointId < minPoint) || (p.pointId > maxPoint) || isStuckInPoint(p.pointId, board, steps))));

const getStateByBoard = (board, steps) => {

	// check if the user losed.
	if (numberOfCheckersInBoard(board, false) == 0){
		return CLIENT_STATUS.LOSER;

	// check if there are checkers in point of the eaten.
	} else if (board.find(point => (point.pointId == 0)).amount > 0){
		if  (isStuckInPoint(0, board, steps)){
			return CLIENT_STATUS.STUCK;
		}else{
			return CLIENT_STATUS.EATEN;
		}
	// check if sum the number of checkers that not in the six points home.
	} else if (numberOfCheckersInBoard(board, true, 0, 18) == 0){

		// check sum the number of checkers that not in the six points home.
		 if  (numberOfCheckersInBoard(board, true, 19) == 0){
			return CLIENT_STATUS.WINNER;
		}else{
			return CLIENT_STATUS.DROPOUT;
		}
	} else if (isStuckInBoard(board, steps)){
		return CLIENT_STATUS.STUCK;
	}

	return CLIENT_STATUS.ONGOING;
}

const isPointCanDragTarget = (pointId, clientStatus) => {
	
	// if the client was eaten he can only insert   
	if ((clientStatus == CLIENT_STATUS.EATEN) && (pointId > 6)){
		return false;
	}

	return true;
}

/*
const canBeDragTargetFrom = (pointId, board, singleSteps) => {

	const continiousSteps = possibleClientContiniousSteps(pointId, board, singleSteps);

	const possibleSrcPointsIds = continiousSteps.map(step => (pointId-step));

	if (pointId == 25 && board.clientStatus == CLIENT_STATUS.DROPOUT){

		// get the farest point with checker for the out drop point
		// we know every checkers in points [19..24] because of the client's state.
		const farestPoint = board.checkersState.filter(point => 
			((point.pointId>=19) && point.isClient && point.amount>0)).sort()[0];

		if ((25-farestPoint.pointId) < Math.max(...singleSteps)){
			return [farestPoint.pointId]
		}
	}


	return possibleSrcPointsIds;
}
*/

// consider replace canBeDragTargetFrom.
const canBeDraggedTo = (pointId, board, singleSteps) => {

	const continiousSteps = possibleClientContiniousSteps(pointId, board, singleSteps);

	let possibleTargetPointsIds = continiousSteps.map(step => (pointId+step));

	if (board.clientStatus == CLIENT_STATUS.DROPOUT){
	   if (Math.min(...singleSteps)>(25-pointId)){

			const farestPoint = board.filter(point => (point.isClient && point.amount>0)).sort()[0];

			if (farestPoint.pointId == pointId){
				possibleTargetPointsIds.push(25);
			}
		}

		return possibleTargetPointsIds.filter(id => id <= 25)
	}

	return possibleTargetPointsIds.filter(id => id < 25);
}


export {getStateByBoard, isPointCanDragTarget, canBeDraggedTo}
