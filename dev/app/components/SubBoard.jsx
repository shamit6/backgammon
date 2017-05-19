import React from 'react';
import Point from '../containers/Point';
import {Triangle} from 'react-shapes';
import styles from './app.css';

class SubBoard extends React.Component {

  render(){
  	const pointsIds = this.props.pointsIds;

    var InSubBoard = ({pointsIds}) => (
      <div className={styles.subBoard} style={this.props.style}> 
        {pointsIds.map(pointId => 

          (<Point pointId={pointId} key={pointId}>
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