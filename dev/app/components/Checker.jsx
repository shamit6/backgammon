import React, { Component, PropTypes }  from 'react';
import {Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle}  from 'react-shapes';
import { DragSource } from 'react-dnd';

const checkerSource = {

  beginDrag(props, monitor, component) {
    return {fromPoint:props.pointId, possibleTargets:props.possibleTargets}
  },

  canDrag(props, monitor){
    return props.isClient;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

 class Checker extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    pointId: PropTypes.number.isRequired,
    possibleTargets: PropTypes.array.isRequired
  };

  componentDidMount() {
      // const img = new Image();
      // img.src = '.\\dev\\img\\joe.webp';
      // img.onload = () => this.props.connectDragPreview(img);
  }

  render() {
    const { connectDragSource, isDragging } = this.props;
    const checkerStyle = {
        background: 'transparent',
        display: 'block',
        'textAlign': 'center'
    };

    return connectDragSource(
      <div style={checkerStyle}>
        <Circle r={this.props.size} fill={{color:this.props.color}} stroke={{color:'#E65243'}} strokeWidth={1} />
      </div>
    )
  }
}

export default DragSource("CheckerSource", checkerSource, collect)(Checker)
