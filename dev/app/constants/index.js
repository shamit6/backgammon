export const INITIAL_STORE_STATE = 
   {board: [
    {amount:0, isClient:true, pointId:0},

    {amount:2, isClient:true, pointId:1}, {amount:0, isClient:true, pointId:2}, 
    {amount:0, isClient:true, pointId:3}, {amount:0, isClient:true, pointId:4}, 
    {amount:0, isClient:true, pointId:5}, {amount:5, isClient:false, pointId:6},

    {amount:0, isClient:true, pointId:7}, {amount:3, isClient:false, pointId:8}, 
    {amount:0, isClient:true, pointId:9}, {amount:0, isClient:true, pointId:10}, 
    {amount:0, isClient:true, pointId:11}, {amount:5, isClient:true, pointId:12},

    {amount:5, isClient:false, pointId:13}, {amount:0, isClient:true, pointId:14},
    {amount:0, isClient:true, pointId:15}, {amount:0, isClient:true, pointId:16},
    {amount:3, isClient:true, pointId:17}, {amount:0, isClient:false, pointId:18},

    {amount:5, isClient:true, pointId:19}, {amount:0, isClient:true, pointId:20},
    {amount:0, isClient:true, pointId:21}, {amount:0, isClient:true, pointId:22},
    {amount:0, isClient:true, pointId:23}, {amount:2, isClient:false, pointId:24},

    {amount:0, isClient:false, pointId:25}

    ], turn: {clientTurn:false, diced:false, dicesResult:{dice1:0, dice2:0}, moves:[]}};

export const POINTS_ON_BOARD = { pointsI:[1,2,3,4,5,6], pointsII:[7,8,9,10,11,12], 
  pointsIII:[13,14,15,16,17,18], pointsIV:[19,20,21,22,23,24]};

//////////////////////// 
//        |           //
//    I   |    II     //
//________|__________ //
//        |           //
//   IV   |    III    //
//        |           //
////////////////////////

export const POINTS_COLORS = ['brown','green'];

export const CHECKER_COLORS = {client:'white', rival:'black'};