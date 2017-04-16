import {INITIAL_STORE_STATE, CLIENT_STATUS} from '../constants'

const numberOfCheckersInBoard = (board, isClient, minPoint = 0 , maxPoint = 25) =>
	(board.reduce((sumChecker, point) => {
				if (point.isClient == isClient && point.pointId>=minPoint && point.pointId<=maxPoint){
					return sumChecker + point.amount
				}else{
					return sumChecker;
				}
			},0))


export const getStateByBoard = (board) => {

	// check if the user losed.
	if (numberOfCheckersInBoard(board, false) == 0){
				return CLIENT_STATUS.LOSER;

	// check if there are checkers in point of the eaten.
	} else if (board.find(point => (point.pointId == 0)).amount > 0){
		return CLIENT_STATUS.EATEN;

	// check if sum the number of checkers that not in the six points home.
	} else if (numberOfCheckersInBoard(board, true, 0, 18) == 0){

		// check sum the number of checkers that not in the six points home.
		 if  (numberOfCheckersInBoard(board, true, 19) == 0){
			return CLIENT_STATUS.WINNER;
		}else{
			return CLIENT_STATUS.DROPOUT;
		}
	}

	return CLIENT_STATUS.ONGOING;
}

export const isPointCanDragTarget = (pointId, clientStatus) => {
	
	// if the client was eaten he can only insert   
	if ((clientStatus == CLIENT_STATUS.EATEN) && (pointId > 6)){
		return false;
	}

	return true;
}

const addToNumbers = (array, num) => (array.map(element => (element+num)));

export const canBeDragTargetFrom = (pointId, board, singleSteps) => {

	const continiousSteps = singleSteps.reduce((steps, currStep) => 
		([currStep,...steps,...addToNumbers(steps, currStep)]), []);

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

export const canBeDragTo = (pointId, board, singleSteps) => {

	const continiousSteps = singleSteps.reduce((steps, currStep) => 
		([currStep,...steps,...addToNumbers(steps, currStep)]), []);

	let possibleTargetPointsIds = continiousSteps.map(step => (pointId+step));

	if (board.clientStatus == CLIENT_STATUS.DROPOUT){
	   if (Math.min(...singleSteps)>(25-pointId)){

			const farestPoint = board.checkersState.filter(point => (point.isClient && point.amount>0)).sort()[0];

			if (farestPoint.pointId == pointId){
				possibleTargetPointsIds.push(25);
			}
		}

		return possibleTargetPointsIds.filer(id => id <= 25)
	}

	return possibleTargetPointsIds.filer(id => id < 25);
}
