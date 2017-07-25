import React from 'react';
import SubBoard from './SubBoard';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import Dicing from '../../containers/Dicing';
import HittenCheckersArea from '../../containers/HittenCheckersArea';
import {POINTS_ON_BOARD} from '../../constants';
import Point from '../../containers/Point';
import styles from './app.css';


const addTrianglesReactivity = () => {
  let avgContainers = document.querySelectorAll("div[data-key]");;
    let svgPapa;
    let poly;

    const aa = () => {
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

    aa();
};

class Board extends React.Component {

  componentDidMount(){
    addTrianglesReactivity();
    window.addEventListener("resize", addTrianglesReactivity);
  }

  render() {
    // TODO HittenCheckersArea - my dream is to do it as Hoc

  const eatenCheckerPlace =
        <div className={styles.eatenCheckerPanel}>
              <HittenCheckersArea pointId={0}>
                <Point pointId={0}/>
              </HittenCheckersArea>
            <div className={styles.eatenCheckerPanelRotated}>
              <Point pointId={25}/>
            </div>
        </div>;

  return (
    <div style={{width: 'calc(100% - 220px)'}}>
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
//export default DragDropContext(HTML5Backend)(Game)
