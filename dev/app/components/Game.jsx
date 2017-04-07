import React from 'react';
import SubBoard from './SubBoard';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Game extends React.Component {
  render() {

const style = {
  border: '7px dashed gray',
  //cursor: 'move',
  width : '1200px',
  display: 'run-in',
  height:'500px',
  float:'left'
};
  	const ChekersByPointsI = [{amount:2, client:true, pointId:1}, {amount:0, client:true, pointId:2}, 
  	{amount:0, client:true, pointId:3}, {amount:0, client:true, pointId:4}, 
  	{amount:0, client:true, pointId:5}, {amount:5, client:false, pointId:6}];

  	const ChekersByPointsII = [{amount:0, client:true, pointId:7}, {amount:3, client:false, pointId:8}, 
  	{amount:0, client:true, pointId:9}, {amount:0, client:true, pointId:10}, 
  	{amount:0, client:true, pointId:11}, {amount:5, client:true, pointId:12}];

  	const ChekersByPointsIII = [{amount:0, client:false, pointId:18}, {amount:3, client:true, pointId:17},
  	{amount:0, client:true, pointId:16}, {amount:0, client:true, pointId:15},
  	{amount:0, client:true, pointId:14}, {amount:5, client:false, pointId:13}];

  	const ChekersByPointsIV = [{amount:2, client:false, pointId:24}, {amount:0, client:true, pointId:23},
  	{amount:0, client:true, pointId:22}, {amount:0, client:true, pointId:21},
  	{amount:0, client:true, pointId:20}, {amount:5, client:true, pointId:19}];

  	  	
  return <div style= {{'margin': 'center'}}>
	  <div style={style}>
		  <SubBoard chekersByPoints ={ChekersByPointsI}/>
		  <SubBoard chekersByPoints ={ChekersByPointsII}/>
		  <SubBoard chekersByPoints ={ChekersByPointsIV}/>
		  <SubBoard chekersByPoints ={ChekersByPointsIII}/>
	  </div>
  </div>
  }
}

export default DragDropContext(HTML5Backend)(Game)