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



    render () {
        const { isRotated, isDragging, sourceOffset } = this.props;
        if (!isDragging) { return null; }

          let style;
        if (isRotated){
          console.log("true");
            style = {
                transform: sourceOffset ? `rotate(180deg) translate(${sourceOffset.x}px, ${sourceOffset.y}px) scale(1)` : ''
            };
        }else{
          console.log("false");
            style = {
                transform: sourceOffset ? `translate(${sourceOffset.x}px, ${sourceOffset.y}px)` : ''
            };
        }


        return (<div className={styles.checkerPreview} style={style}>
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
      //style={{transform:'rotate(-180deg) translate(-500px,-300px)'}}
      return connectDragSource(<div><PreviewDragLayer {...this.props}/></div>)
    }else{
        return connectDragSource(
          <div className={styles.checker}>
            <CheckerView isClient={this.props.isClient}/>
          </div>)
    }
  }
}

export default DragSource("CheckerSource", checkerSourceMonitor, collect)(Checker)
