import React from 'react';
import SubBoard from './SubBoard';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Dicing from '../containers/Dicing';

class Game extends React.Component {
  render() {

const style = {
  //border: '7px dashed gray',
  //cursor: 'move',
  width : '1200px',
  display: 'run-in',
  height:'500px',
  float:'left'
};
  	const PointsI = [1,2,3,4,5,6];

  	const PointsII = [7,8,9,10,11,12];

  	const PointsIII = [18,17,16,15,14,13];

  	const PointsIV = [24,23,22,21,20,19];

  	  	
  return <div style= {{'margin': 'center'}}>
      	  <div style={style}>
      		  <SubBoard pointsIds={PointsI}/>
      		  <SubBoard pointsIds={PointsII}/>
      		  <SubBoard pointsIds={PointsIV}/>
      		  <SubBoard pointsIds={PointsIII}/>
            <Dicing />
      	  </div>
      </div>

  }
}

export default DragDropContext(HTML5Backend)(Game)