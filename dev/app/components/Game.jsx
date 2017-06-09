import React from 'react';
import SubBoard from './SubBoard';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import Dicing from '../containers/Dicing';
import {POINTS_ON_BOARD} from '../constants';
import Point from '../containers/Point';
import styles from './app.css';

class Game extends React.Component {
  render() {
  const eatenCheckerPlace = 
        <div className={styles.eatenCheckerPanel}>
            <div className={styles.eatenCheckerSubPanel}>
              <Point pointId={0}/>
            </div>         
            <div className={styles.eatenCheckerSubPanel} style={{transform: 'rotate(180deg)'}}>
              <Point pointId={25}/>
            </div>         
        </div>;

  return (
    <div>
      <div className={styles.allgame}>
          {eatenCheckerPlace}
          <div className={styles.subBoardsPanel}>
      		  <SubBoard pointsIds={POINTS_ON_BOARD.pointsI} isRotated={false}/>
      		  <SubBoard pointsIds={POINTS_ON_BOARD.pointsII} isRotated={false}/>
            <SubBoard pointsIds={POINTS_ON_BOARD.pointsIV} isRotated={true}/>
            <SubBoard pointsIds={POINTS_ON_BOARD.pointsIII} isRotated={true}/>
          </div>
      </div>
      <Dicing />
    </div>
  )

  }
}

export default DragDropContext(TouchBackend({enableMouseEvents: true}))(Game)
//export default DragDropContext(HTML5Backend)(Game)