import React from 'react';
import Point from '../containers/Point';

 class SubBoard extends React.Component {
  render(){


const style = {
  border: '7px dashed gray',
  cursor: 'move',
  width : '500px',
  height:'50%',
   display:'inline-block'
};

  	const pointsIds = this.props.pointsIds;

  	var InSubBoard = ({pointsIds}) => (
	  <div style={style}>
	    {pointsIds.map(pointId => {

	    	const pointColor = pointId % 2 === 0 ? 'brown' : 'green';

	      return <Point color={pointColor} pointId={pointId} key={pointId}/>
	    })}
	  </div>);

    return <InSubBoard pointsIds={pointsIds}/>
  };
}

export default SubBoard