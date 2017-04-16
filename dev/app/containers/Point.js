import { connect } from 'react-redux'
import { step } from '../actions'
import PointViewer from '../components/PointViewer'
import {canBeDragTargetFrom, isPointCanDragTarget} from '../rules'

const mapStateToProps = (state, ownProps) => {

	const {amount, isClient, pointId} = state.board.checkersState.find(point => point.pointId == ownProps.pointId)
	
	const isEnabledByState = isPointCanDragTarget(pointId, state.board.clientStatus);
	const possibleSrcPointsIds = canBeDragTargetFrom(pointId, state.board, state.turn.steps);

	return {amount, isClient, pointId, possibleSrcPointsIds, isEnabledByState}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  receiveChecker: (fromPoint) => {
  	//if (ownProps.isEnabled){
		dispatch(step({fromPoint:fromPoint, toPoint:ownProps.pointId, isClient: true}))
	//}
  }
})

// function mergeProps(stateProps, dispatchProps, ownProps) {
// 	if (ownProps.pointId == 20){
// 		console.log(stateProps);
// 		console.log(dispatchProps);
// 		console.log(ownProps);
// 	}
//   return {
//   		...ownProps,
//         ...stateProps,
//         ...dispatchProps
//   };
// }

const Point = connect(
  mapStateToProps,
  	mapDispatchToProps
)(PointViewer)

export default Point