import React, { Component } from 'react'
import SubBoard from './SubBoard'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { default as TouchBackend } from 'react-dnd-touch-backend'
import Dicing from '../../../containers/Dicing'
import HittenCheckersArea from '../../../containers/HittenCheckersArea'
import {POINTS_ON_BOARD} from '../../../constants'
import Point from '../../../containers/Point'
import styles from './style.css'
import Rx from '@rxjs/Rx'

const addTrianglesReactivity = () => {
  let avgContainers = document.querySelectorAll("div[data-key]");;

  avgContainers.forEach(container => {
    let svgPapa = container.querySelector("svg");
    let poly = svgPapa.querySelector("polygon");

    let divBCRect = container.getBoundingClientRect();
    let h = divBCRect.height;
    let w = divBCRect.width;

    let a = "0," + h;
    let b = w/2 + ",0";
    let c =  w + "," + h;

    let pointsStr = [a,b,c].join(" ");
    poly.setAttribute("points", pointsStr);
  });
};

class Board extends Component {

  componentDidMount(){
    addTrianglesReactivity();
    Rx.Observable.fromEvent(window, 'resize').
      debounceTime(100).subscribe(addTrianglesReactivity);
  }

  render() {
  const eatenCheckerPlace =
        <div className={styles.eatenCheckerPanel}>
            <HittenCheckersArea pointId={0} myClassName={styles.eatenCheckerSubPanel}>
               <Point pointId={0}/>
            </HittenCheckersArea>
          <div className={styles.eatenCheckerSubPanelRotated}>
            <Point pointId={25}/>
          </div>
        </div>;

  return (
    <div>
      <div className={styles.board}>
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

export default DragDropContext(TouchBackend({enableMouseEvents: true}))(Board)
