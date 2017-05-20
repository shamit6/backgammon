import React from 'react';
import Point from '../containers/Point';
import {Triangle} from 'react-shapes';
import styles from './app.css';

class SubBoard extends React.Component {

  render(){
  	const {style, pointsIds, isRotated} = this.props;

    var InSubBoard = ({pointsIds}) => (
      <div className={styles.subBoard} style={style}> 
        {pointsIds.map(pointId => 

          (<Point pointId={pointId} key={pointId} isRotated={isRotated}>
                              <div data-key={pointId} className={styles.visualPoint}>
                                  <svg className={styles.trianglePoint}>
                                      <polygon points=""/>
                                  </svg>
                                <div>
                                  {pointId}
                                </div>
                              </div>
                            </Point>)
        )}
      </div>);

    return <InSubBoard pointsIds={pointsIds}/>
  };
}

export default SubBoard