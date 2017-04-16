import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import Checker from './Checker';
import {CHECKER_COLORS} from '../constants';

const pointTarget = {
  drop(props, monitor, component) {
    // It has to be the client.
    component.props.receiveChecker(monitor.getItem().fromPoint)
  },
  hover(props, monitor, component){
  },

  canDrop(props, monitor){
    const numberOfSteps = props.canBeDragTargetFrom.indexOf(monitor.getItem().fromPoint)>=0;
    const free = (props.isClient || props.amount<=1);
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
    const overlayStyle = {position: 'absolute',
          top: 28,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 1,
          opacity: 0.5,
          overflow:'hidden'}
    return <div style={{...overlayStyle, backgroundColor: color}}/>
  }

  render() {
  	const style = { margin: '0 auto',position: 'relative', 
      'verticalAlign': 'bottom', 
      display:'inline-block', width:'16.66%', height:'100%'};

    const {connectDropTarget, isOver, canDrop, pointId, amount, isClient } = this.props;
    var checkersColor = isClient ? CHECKER_COLORS.client : CHECKER_COLORS.rival;
    console.log(pointId);
    const checkerContainerStyle = {
          top: 30,
          position: 'absolute', 
          height: '100%', width: '100%', 
          zIndex: 3}

    const checkers = Array.apply(null, {length: amount}).map((obj, index) => 
    		(<Checker key={index} size={10} pointId={pointId} isClient={isClient} color={checkersColor}/>));	

    return connectDropTarget(<div disabled={!this.props.isEnabled}  style={style}>

          {isOver && !canDrop && this.renderOverlay('red')}
          {!isOver && canDrop && this.renderOverlay('yellow')}
          {isOver && canDrop && this.renderOverlay('blue')}
          <div style={checkerContainerStyle} >
            {checkers}
          </div>

          {this.props.children}
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