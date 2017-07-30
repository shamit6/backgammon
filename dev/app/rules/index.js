import { IN_GAME_STATUS} from '../constants'

const getPoint = (board, pointId) => (board.find(point => (point.pointId == pointId)));

const isPointFree = (point) => (point.isClient || point.amount<=1 || point.pointId == 25);

const numberOfCheckersInBoard = (board, isClient, minPoint = 0 , maxPoint = 25) =>
	(board.reduce((sumChecker, point) => {
				if (point.isClient == isClient && point.pointId>=minPoint && point.pointId<=maxPoint){
					return sumChecker + point.amount
				}else{
					return sumChecker;
				}
			},0))

// Only for client
const isStuckInPoint = (pointId, board, steps, clientState) => {
	const possibleTargetPointsIds = canBeDraggedTo(pointId, board, steps, clientState);
	return board.findIndex(p => (possibleTargetPointsIds.indexOf(p.pointId) > -1 &&
		isPointFree(p))) == -1;
}


const possibleClientContiniousSteps = (pointId, board, singleSteps) =>{

	let continiousSteps = [];
	// In case of double
	if (singleSteps.length > 2){

		let currStep = singleSteps[0];
		let i = 0;
		while (i < singleSteps.length){
			let point = getPoint(board, Math.min(pointId+currStep, 25));

			if (isPointFree(point)){
				continiousSteps.push(currStep);
			}else{
				break;
			}
			currStep += singleSteps[0];
			i++;
		}

	}else if (singleSteps.length > 0){


		const firstStep = singleSteps[0];
		const firstPoint = getPoint(board, Math.min(pointId+firstStep, 25));

		const isFirstStepFree = isPointFree(firstPoint);
		if (isFirstStepFree){
			continiousSteps.push(firstStep);
		}

		const secondStep = singleSteps[1];
		const secondPoint = getPoint(board, Math.min(pointId+secondStep, 25));


		if (typeof secondStep !== 'undefined') {

			const isSecondStepFree = isPointFree(secondPoint);
			if (isSecondStepFree){
				continiousSteps.push(secondStep);
			}

			if (isFirstStepFree || isSecondStepFree){
				const combinedPoint = getPoint(board, Math.min(pointId+firstStep+secondStep, 25));

				if (isPointFree(combinedPoint)){
					continiousSteps.push(firstStep+secondStep);
				}
			}
		}
	}
	return continiousSteps;
}

const isStuckInBoard = (board, steps, clientState) =>
	(board.filter(p => (p.isClient && p.amount > 0)).
		every(p => (isStuckInPoint(p.pointId, board, steps, clientState))));

const getStateByBoard = (board, steps) => {

	// check if the user losed.
	if (numberOfCheckersInBoard(board, false) == 0){
		return IN_GAME_STATUS.LOSER;

	// check if there are checkers in point of the eaten.
	} else if (board.find(point => (point.pointId == 0)).amount > 0){
		if  (isStuckInPoint(0, board, steps)){
			return IN_GAME_STATUS.STUCK;
		}else{
			return IN_GAME_STATUS.EATEN;
		}
	// check if sum the number of checkers that not in the six points home.
	} else if (numberOfCheckersInBoard(board, true, 0, 18) == 0){

		// check sum the number of checkers that not in the six points home.
		 if  (numberOfCheckersInBoard(board, true, 19) == 0){
			return IN_GAME_STATUS.WINNER;
		}else if(isStuckInBoard(board, steps, IN_GAME_STATUS.DROPOUT)){
			return IN_GAME_STATUS.STUCK;
		} else {
			return IN_GAME_STATUS.DROPOUT;
		}
	} else if(isStuckInBoard(board, steps)){
		return IN_GAME_STATUS.STUCK;
	}

	return IN_GAME_STATUS.ONGOING;
}

const isPointCanDragTarget = (pointId, clientStatus) => {

	// if the client was eaten he can only insert
	if ((clientStatus == IN_GAME_STATUS.STUCK) || ((clientStatus == IN_GAME_STATUS.EATEN) && (pointId > 6))){
		return false;
	}

	return true;
}

// consider replace canBeDragTargetFrom.
const canBeDraggedTo = (pointId, board, singleSteps, clientState) => {

	if (clientState == IN_GAME_STATUS.EATEN){
		if (pointId == 0){
				return singleSteps.map(step => pointId+step).filter(pointId => isPointFree(getPoint(board, pointId)))
			}else
				return [];
	}

	const continiousSteps = possibleClientContiniousSteps(pointId, board, singleSteps);

	let possibleTargetPointsIds = continiousSteps.map(step => (pointId+step));

	if (clientState == IN_GAME_STATUS.DROPOUT){
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
