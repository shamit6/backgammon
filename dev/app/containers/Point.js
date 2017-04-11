import { connect } from 'react-redux'
import { makeMove } from '../actions'
import PointViewer from '../components/PointViewer'


const mapStateToProps = (state, ownProps) => {

	const {amount, isClient, pointId} = state.board.find(point => point.pointId === ownProps.pointId)
	const canBeDragTargetFrom = state.turn.moves.reduce((posiblePoints, move) => {
		return [...posiblePoints,(pointId-move)]
	},[]) 
	return {amount, isClient, pointId, canBeDragTargetFrom}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  receiveChecker: (fromPoint) => {
	dispatch(makeMove({fromPoint:fromPoint, toPoint:ownProps.pointId, isClient: true}))
  }
})

const Point = connect(
  mapStateToProps,
  mapDispatchToProps
)(PointViewer)

export default Point