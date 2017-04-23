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
                    <div className={styles.rotate180} style={{textAlign: 'center'}}>
                    <Triangle width={80} height={200} fill={{color:pointColor}} stroke={{color:'#E65243'}} strokeWidth={2}/>
                      <div style={{textAlign: 'center'}}>
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