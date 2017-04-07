import React from 'react';
import Point from './Point';

 class SubBoard extends React.Component {
  render(){


const style = {
  border: '7px dashed gray',
  //cursor: 'move',
  width : '500px',
  display: 'run-in',
  height:'50%',
   display:'inline-block'
};

  	const points = this.props.chekersByPoints;

  	var InSubBoard = ({points}) => (
	  <div style={style}>
	    {points.map((chekersByPoint, index) => {

			let chekersColor = chekersByPoint.client ? 'white' : 'black';
			const checkersInfo = {amount : chekersByPoint.amount, color: chekersColor};
	    	const pointColor = index % 2 === 0 ? 'brown' : 'green';

	      return <Point checkersInfo={checkersInfo} color={pointColor} pointKey={chekersByPoint.pointId} key={chekersByPoint.pointId}/>
	    })}
	  </div>);

    return <InSubBoard points={points}/>
  };
}

export default SubBoard