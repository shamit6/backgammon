import React, { Component, PropTypes }  from 'react';
import {Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle}  from 'react-shapes';
import { DragLayer, DragSource } from 'react-dnd';
//import CheckerPreview from './CheckerPreview';
import styles from './app.css';

const CheckerView = (props) => 
  (<div className={styles.circle} data-is-client={props.isClient}/>);

///// Preview
const previewCollect = monitor => ({
        sourceOffset: monitor.getSourceClientOffset()
    });

class CheckerPreview extends React.Component {

  static propTypes = {
      isDragging: PropTypes.bool,
      sourceOffset: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired
      })
  };

    getLayerStyles() {
        const { sourceOffset } = this.props;
        return {
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 100,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            transform: sourceOffset ? `translate(${sourceOffset.x}px, ${sourceOffset.y}px)` : ''
            //transform: sourceOffset ? `roteteX(180deg) roteteY(180deg) translate(${sourceOffset.x}px, ${sourceOffset.y}px)` : ''
        };
    }

    render () {
        const { isDragging } = this.props;
        if (!isDragging) { return null; };

        return (<div style={this.getLayerStyles()}>
                <CheckerView isClient={this.props.isClient}/>
            </div>);
    }
}

const PreviewDragLayer =  DragLayer(previewCollect)(CheckerPreview);
///// End Preview

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

 class Checker extends React.Component {
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
      return connectDragSource(<div><PreviewDragLayer {...this.props}/></div>)
    }else{
        return connectDragSource(
          <div className={styles.checkerStyle}>
            <CheckerView isClient={this.props.isClient}/>
          </div>)
    }
  }
}

export default DragSource("CheckerSource", checkerSourceMonitor, collect)(Checker)
