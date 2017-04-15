import { connect } from 'react-redux'
import { makeMove } from '../actions'
import PointViewer from '../components/PointViewer'


const mapStateToProps = (state, ownProps) => {
	//const isEnabled = (state.turn.clientTurn && !state.turn.diced)

	const {amount, isClient, pointId} = state.board.find(point => point.pointId === ownProps.pointId)
	const canBeDragTargetFrom = state.turn.moves.reduce((posiblePoints, move) => {
		return [...posiblePoints,(pointId-move)]
	},[]) ;

	return {amount, isClient, pointId, canBeDragTargetFrom}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  receiveChecker: (fromPoint) => {
  	//if (ownProps.isEnabled){
		dispatch(makeMove({fromPoint:fromPoint, toPoint:ownProps.pointId, isClient: true}))
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