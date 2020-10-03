import React, { Component, PropTypes } from "react";
import { DropTarget } from "react-dnd";
import Checker from "../Checker";
import styles from "./style.css";

const pointTarget = {
  drop(props, monitor, component) {
    // It has to be the client.
    component.props.receiveChecker(monitor.getItem().fromPoint);
  },
  hover(props, monitor, component) {},

  canDrop(props, monitor) {
    if (!props.isEnabledByState) {
      return false;
    }

    const numberOfSteps =
      monitor.getItem().possibleTargets.indexOf(props.pointId) > -1;

    return numberOfSteps;
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

class PointViewer extends Component {
  static propTypes = {
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    amount: PropTypes.number.isRequired,
    isClient: PropTypes.bool.isRequired,
    pointId: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
  }

  renderOverlay(color) {
    return (
      <div
        className={styles.pointViewerOverlay}
        style={{ backgroundColor: color }}
      />
    );
  }

  render() {
    const {
      connectDropTarget,
      isOver,
      canDrop,
      pointId,
      amount,
      isClient,
      possibleTargets,
    } = this.props;

    const checkers = Array.apply(null, { length: amount }).map((obj, index) => (
      <Checker
        key={index}
        size={10}
        pointId={pointId}
        possibleTargets={possibleTargets}
        isClient={isClient}
      />
    ));

    return connectDropTarget(
      <div className="pointViewer" disabled={!this.props.isEnabled}>
        {this.props.children}
        <div className="checkersContainer">{checkers}</div>
        {isOver && !canDrop && ::this.renderOverlay("red")}
        {!isOver && canDrop && ::this.renderOverlay("yellow")}
        {isOver && canDrop && ::this.renderOverlay("blue")}
      </div>
    );
  }
}

export default DropTarget("CheckerSource", pointTarget, collect)(PointViewer);
