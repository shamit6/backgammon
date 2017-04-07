import React, { Component, PropTypes }  from 'react';
import {Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle}  from 'react-shapes';
import { DragSource } from 'react-dnd';

const checkerSource = {

  beginDrag(props, monitor, component) {
    return {checkerColor:component.props.color};
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    component.props.afterDragging();
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
    //  const img = new Image();
    // img.src = '.\\dev\\img\\mc.jpg';
    // img.onload = () => this.props.connectDragPreview(img);
  }

  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(<div style={{'background' : 'transparent'}}>
        <Circle r={this.props.size} fill={{color:this.props.color}} stroke={{color:'#E65243'}} strokeWidth={1} />
        </div>)
  }
}

Checker.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragPreview: PropTypes.func.isRequired
};

//export default Checker
export default DragSource("CheckerSource", checkerSource, collect)(Checker)
