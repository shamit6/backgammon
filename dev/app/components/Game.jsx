import React from 'react';
import SubBoard from './SubBoard';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Dicing from '../containers/Dicing';
import {POINTS_ON_BOARD} from '../constants';

class Game extends React.Component {
  render() {

const style = {
  width : '1200px',
  height:'500px'
};

const subBoardStyle = {
  border: '2px solid gray',
  width : '500px',
  height:'50%',
  display:'inline-block'
};


  return (
    <div style= {{height:'100%', 'margin': 'center',display:'inline'}}>
    	  <div style={style}>
    		  <SubBoard style={{...subBoardStyle, 'borderTop':'15px solid gray', 'borderLeft':'15px solid gray'}}  
              pointsIds={POINTS_ON_BOARD.pointsI}/>
    		  <SubBoard style={{...subBoardStyle, 'borderTop':'15px solid gray', 'borderRight':'15px solid gray'}} 
              pointsIds={POINTS_ON_BOARD.pointsII}/>
    		  <SubBoard style={{...subBoardStyle, transform:'rotate(180deg)', 'borderTop':'15px solid gray', 'borderRight':'15px solid gray'}} 
              pointsIds={POINTS_ON_BOARD.pointsIV}/>
    		  <SubBoard style={{...subBoardStyle, transform:'rotate(180deg)', 'borderTop':'15px solid gray', 'borderLeft':'15px solid gray'}} 
              pointsIds={POINTS_ON_BOARD.pointsIII}/>
          <Dicing />
    	  </div>
    </div>
  )

  }
}

export default DragDropContext(HTML5Backend)(Game)