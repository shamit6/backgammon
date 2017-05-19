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
        <div className={styles.eatenCheckerPlace}>
            <div className={styles.eatenCheckerPlaceChild}>
              <Point pointId={0}/>
            </div>         
            <div className={styles.eatenCheckerPlaceChild}>
              <Point pointId={25}/>
            </div>         
        </div>;

  return (
    <div>
      <div className={styles.allgame}>
          {eatenCheckerPlace}
          <div className={styles.subBoardsPanel}>
      		  <SubBoard pointsIds={POINTS_ON_BOARD.pointsI}/>
      		  <SubBoard pointsIds={POINTS_ON_BOARD.pointsII}/>
            <SubBoard pointsIds={POINTS_ON_BOARD.pointsIV}/>
            <SubBoard pointsIds={POINTS_ON_BOARD.pointsIII}/>
          </div>
      </div>
      <Dicing />
    </div>
  )

  }
}

export default DragDropContext(TouchBackend({enableMouseEvents: true}))(Game)
//export default DragDropContext(HTML5Backend)(Game)