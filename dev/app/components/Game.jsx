import React from 'react';
import SubBoard from './SubBoard';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Dicing from '../containers/Dicing';
import {POINTS_ON_BOARD} from '../constants';
import Point from '../containers/Point';

class Game extends React.Component {
  render() {

const style = {
  width : '1270px',
  height:'600px',
  display:'inline-block'};

  const subBoardStyle = {
    border: '2px solid gray',
    width : '500px',
    height:'50%',
    display:'inline-block'};

  const eatenCheckerPlaceStyle = {
    width:'40px',
    display:'block', 
    background:'#9e9e9e', 
    'border':'15px solid gray'};

  const eatenCheckerPlace = 
        <div style={eatenCheckerPlaceStyle}>
            <div style={{...eatenCheckerPlaceStyle, width:'100%', height:'50%', 'border':'1px solid gray'}}>
              <Point pointId={0}>
              {0    }
              </Point>
            </div>         
            <div style={{...eatenCheckerPlaceStyle, width:'100%', height:'50%', 'border':'1px solid gray'}}>
              <Point pointId={25}>
                {25}
              </Point>
            </div>         
        </div>;

  return (
    <div style= {{height:'100%',display:'flex'}}>
        {eatenCheckerPlace}
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