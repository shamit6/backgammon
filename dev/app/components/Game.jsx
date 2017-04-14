import React from 'react';
import SubBoard from './SubBoard';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Dicing from '../containers/Dicing';

class Game extends React.Component {
  render() {

const style = {
  width : '1200px',
  height:'500px',
  float:'left'
};

const styleSubBoard = {
  border: '7px dashed gray',
  //cursor: 'move',
  width : '500px',
  height:'50%',
   display:'inline-block'
};
  	const PointsI = [1,2,3,4,5,6];

  	const PointsII = [7,8,9,10,11,12];

  	const PointsIII = [18,17,16,15,14,13];

  	const PointsIV = [24,23,22,21,20,19];

  	  	
  return (
    <div style= {{height:'100%', 'margin': 'center',display:'inline'}}>
    	  <div style={style}>
    		  <SubBoard style={styleSubBoard} pointsIds={PointsI}/>
    		  <SubBoard pointsIds={PointsII}/>
    		  <SubBoard pointsIds={PointsIV}/>
    		  <SubBoard pointsIds={PointsIII}/>
          <Dicing />
    	  </div>
    </div>
  )

  }
}

export default DragDropContext(HTML5Backend)(Game)