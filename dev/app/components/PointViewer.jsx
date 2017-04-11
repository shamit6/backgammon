import React, { Component, PropTypes } from 'react';
import {Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle} from 'react-shapes';
import { DropTarget } from 'react-dnd';
import Checker from './Checker';


const pointTarget = {
  drop(props, monitor, component) {
     // It has to be the client.
    component.props.receiveChecker(monitor.getItem().fromPoint)
  },
  hover(props, monitor, component){
  },

  canDrop(props, monitor){
    const numberOfSteps = props.canBeDragTargetFrom.indexOf(monitor.getItem().fromPoint)>=0;
    const free = (props.isClient || props.amount==0);
    return (numberOfSteps && free);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class PointViewer extends React.Component {
 constructor(props) {
    super(props);
    this.renderOverlay = this.renderOverlay.bind(this)
  }

  renderOverlay(color) {
    return (
      <div
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 1,
          opacity: 0.5,
          backgroundColor: color,
        }}
      />
    );
  }

  render() {
  	const style2 = {'verticalAlign': 'bottom', display:'inline-block', width: '16.66%', height:'100%', background:this.props.color};
    const {connectDropTarget, isOver, canDrop, pointId, amount, isClient } = this.props;
    var checkersColor = isClient ? 'white' : 'black';

    const checkers = Array.apply(null, {length: amount}).map((obj, index) => 
    		(<Checker key={index} size={10} pointId={pointId} isClient={isClient} color={checkersColor}/>));	

    return connectDropTarget(<div style={style2}>
              {isOver && !canDrop && this.renderOverlay('red')}
        {!isOver && canDrop && this.renderOverlay('yellow')}
        {isOver && canDrop && this.renderOverlay('blue')}
        {checkers}
        </div>)
  }
}


PointViewer.propTypes = {
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  amount: PropTypes.number.isRequired,
  isClient:PropTypes.bool.isRequired, 
  pointId: PropTypes.number.isRequired
};

export default DropTarget("CheckerSource", pointTarget, collect)(PointViewer);