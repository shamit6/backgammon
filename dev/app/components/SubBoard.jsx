import React from 'react';
import Point from '../containers/Point';
import {POINTS_COLORS} from '../constants';
import {Triangle} from 'react-shapes';
import styles from './app.css';

class SubBoard extends React.Component {

  render(){
  	const pointsIds = this.props.pointsIds;

    var InSubBoard = ({pointsIds}) => (
      <div className={styles.subBoard} style={this.props.style}> 
        {pointsIds.map(pointId => {
          const pointColor = pointId % 2 === 0 ? POINTS_COLORS[0] : POINTS_COLORS[1];
          return  <Point color={pointColor} pointId={pointId} key={pointId}>
                    <div data-key={pointId} className={styles.visualPoint}>
                        <svg className={styles.trianglePoint} style={{fill:pointColor}}>
                            <polygon points=""/>
                        </svg>
                      <div>
                        {pointId}
                      </div>
                    </div>
                  </Point>
        })}
      </div>);

    return <InSubBoard pointsIds={pointsIds}/>
  };
}

export default SubBoard