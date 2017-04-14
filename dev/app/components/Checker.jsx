import React, { Component, PropTypes }  from 'react';
import {Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle}  from 'react-shapes';
import { DragSource } from 'react-dnd';

const checkerSource = {

  beginDrag(props, monitor, component) {
    //console.log("in begin drag:" + props.pointId);
    //const fromPoint = props.pointId
    return {fromPoint:props.pointId}
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
    //console.log(connect.dragSource()(<div ff={}></div>).props);
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}


 class Checker extends React.Component {

    componentDidMount() {
      const img = new Image();
      img.src = '.\\dev\\img\\joe.webp';
      img.onload = () => this.props.connectDragPreview(img);
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

Checker.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  //isClient: PropTypes.bool.isRequired,
  pointId: PropTypes.number.isRequired
};

//export default Checker
export default DragSource("CheckerSource", checkerSource, collect)(Checker)
