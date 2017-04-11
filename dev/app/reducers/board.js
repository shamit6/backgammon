import { MOVING, DICING } from '../actions'

const INITIAL_STATE = 
   [{amount:2, isClient:true, pointId:1}, {amount:0, isClient:true, pointId:2}, 
  	{amount:0, isClient:true, pointId:3}, {amount:0, isClient:true, pointId:4}, 
  	{amount:0, isClient:true, pointId:5}, {amount:5, isClient:false, pointId:6},

	{amount:0, isClient:true, pointId:7}, {amount:3, isClient:false, pointId:8}, 
  	{amount:0, isClient:true, pointId:9}, {amount:0, isClient:true, pointId:10}, 
  	{amount:0, isClient:true, pointId:11}, {amount:5, isClient:true, pointId:12},

	{amount:0, isClient:false, pointId:18}, {amount:3, isClient:true, pointId:17},
  	{amount:0, isClient:true, pointId:16}, {amount:0, isClient:true, pointId:15},
  	{amount:0, isClient:true, pointId:14}, {amount:5, isClient:false, pointId:13},

  	{amount:2, isClient:false, pointId:24}, {amount:0, isClient:true, pointId:23},
  	{amount:0, isClient:true, pointId:22}, {amount:0, isClient:true, pointId:21},
  	{amount:0, isClient:true, pointId:20}, {amount:5, isClient:true, pointId:19}
  	];


const board = (state = INITIAL_STATE, action) => {
	switch (action.type){
		case MOVING:{
			const {fromPoint, toPoint, isClient} = action.move;
			console.log(action)
			return state.map(point => {
				if (point.pointId == fromPoint){
					return Object.assign({}, point,{amount:point.amount-1}); 
				} else if (point.pointId == toPoint){
					return Object.assign({}, point,{amount:point.amount+1, isClient: point.isClient}); 
				}else{
					return point
				}
			})
		}
		default:
      		return state
	}
}

export default board