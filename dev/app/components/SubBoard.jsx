import React from 'react';
import Point from '../containers/Point';
import {POINTS_COLORS} from '../constants';

class SubBoard extends React.Component {

  render(){
  	const pointsIds = this.props.pointsIds;

    var InSubBoard = ({pointsIds}) => (
      <div style={this.props.style}> 
        {pointsIds.map(pointId => {
          const pointColor = pointId % 2 === 0 ? POINTS_COLORS[0] : POINTS_COLORS[1];
          return <Point color={pointColor} pointId={pointId} key={pointId}/>
        })}
      </div>);

    return <InSubBoard pointsIds={pointsIds}/>
  };
}

export default SubBoard