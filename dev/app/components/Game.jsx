import React from 'react';
import SubBoard from './SubBoard';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Dicing from '../containers/Dicing';
import {POINTS_ON_BOARD} from '../constants';
import Point from '../containers/Point';
import styles from './app.css';

class Game extends React.Component {
  render() {
  const eatenCheckerPlace = 
        <div className={styles.eatenCheckerPlace}>
            <div className={styles.eatenCheckerPlaceChild}>
              <Point pointId={0}>
              {0    }
              </Point>
            </div>         
            <div className={styles.eatenCheckerPlaceChild}>
              <Point pointId={25}>
                {25}
              </Point>
            </div>         
        </div>;

  return (
    <div className={styles.allgame}>
        {eatenCheckerPlace}
        <div className={styles.subBoardsPanel}>
    		  <SubBoard pointsIds={POINTS_ON_BOARD.pointsI}/>
    		  <SubBoard pointsIds={POINTS_ON_BOARD.pointsII}/>
            <div className={styles.rotate180}>
              <SubBoard pointsIds={POINTS_ON_BOARD.pointsIII}/>
        		  <SubBoard pointsIds={POINTS_ON_BOARD.pointsIV}/>
            </div>
        </div>
        <Dicing />
    </div>
  )

  }
}

export default DragDropContext(HTML5Backend)(Game)