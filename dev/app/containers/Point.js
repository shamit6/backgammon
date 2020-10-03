import { connect } from "react-redux";
import { step } from "../actions";
import PointViewer from "../components/game/Point";
import { canBeDraggedTo, isPointCanDragTarget } from "../rules";

const mapStateToProps = (state, ownProps) => {
  const { clientStatus, checkersState, steps } = state.app.game;
  const { amount, isClient, pointId } = checkersState.find(
    (point) => point.pointId == ownProps.pointId
  );

  const isEnabledByState = isPointCanDragTarget(pointId, clientStatus);
  const possibleTargets = canBeDraggedTo(
    pointId,
    checkersState,
    steps,
    clientStatus
  );

  return { amount, isClient, pointId, possibleTargets, isEnabledByState };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  receiveChecker: (fromPoint) => {
    //if (ownProps.isEnabled){
    dispatch(
      step({ fromPoint: fromPoint, toPoint: ownProps.pointId, isClient: true })
    );
    //}
  },
});

// function mergeProps(stateProps, dispatchProps, ownProps) {
//   return {
//   		...ownProps,
//         ...stateProps,
//         ...dispatchProps
//   };
// }

const Point = connect(mapStateToProps, mapDispatchToProps)(PointViewer);

export default Point;
