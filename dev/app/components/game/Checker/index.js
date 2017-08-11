import React, { Component, PropTypes }  from 'react'
import { DragSource } from 'react-dnd'
import CheckerChip from './CheckerChip'
import CheckerDndPreview from './CheckerDndPreview'

const checkerSourceMonitor = {

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

 class Checker extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    pointId: PropTypes.number.isRequired,
    possibleTargets: PropTypes.array.isRequired
  };

  render() {
    const { connectDragSource, isDragging } = this.props;

    if (isDragging){
      return connectDragSource(<div><CheckerDndPreview {...this.props}/></div>)
    }else{
      return connectDragSource(<div><CheckerChip isClient={this.props.isClient}/></div>)
    }
  }
}

export default DragSource("CheckerSource", checkerSourceMonitor, collect)(Checker)
