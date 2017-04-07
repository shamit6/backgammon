import React, { Component, PropTypes } from 'react';
import {Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle} from 'react-shapes';
import { DropTarget } from 'react-dnd';
import Checker from './Checker';


const pointTarget = {
  drop(props, monitor, component) {
	component.addChecker(props.checkerColor);
  },
  hover(props, monitor, component){
  }

  // canDrop(props, monitor){
  // 	//props.pointContainer

  // 	console.log(props.pointKey);
  // }
};

function collect(connect, monitor) {

	//console.log(connect.dropTarget());
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}



//Triangle width={150} height={150} fill={{color:'#2409ba'}} stroke={{color:'#E65243'}} strokeWidth={3} /><Circle r={20} fill={{color:'#2409ba'}} stroke={{color:'#E65243'}} strokeWidth={3} />
class Point extends React.Component {

 constructor(props) {
    super(props);
    this.state = {checkersInfo: props.checkersInfo};
    this.addChecker = this.addChecker.bind(this);
    this.removeChecker = this.removeChecker.bind(this);
  }

  addChecker(color){
  	const checkersInfo = this.state.checkersInfo;
  	var checkersInfoNew = {amount : checkersInfo.amount+1, color: color};
    this.setState({
      checkersInfo:checkersInfoNew
    });
  } 

  removeChecker(){
  	const checkersInfo = this.state.checkersInfo;
  	var checkersInfoNew = {amount : checkersInfo.amount-1, color: checkersInfo.color};
    this.setState({
      checkersInfo:checkersInfoNew
    });
  }

  render() {
  	const style2 = {'verticalAlign': 'bottom', display:'inline-block', width: '16.66%', height:'200px', background:this.props.color};
    const {connectDropTarget, isOver } = this.props;
    var checkers = null;

    if (this.state.checkersInfo !== 0){
    	const info = this.state.checkersInfo;
    	checkers = Array.apply(null, {length: info.amount}).map((obj, index) => 
    		(<Checker key={index} size={10} color={info.color} 
    			afterDragging={this.removeChecker}/>));
    }
	

    return connectDropTarget(<div style={style2}>{checkers}</div>)
  }
}


Point.propTypes = {
  isOver: Point.bool
};

export default DropTarget("CheckerSource", pointTarget, collect)(Point);