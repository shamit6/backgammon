const db = {
  models:{
    users:[
      {
        id:1, username:"amitush",password:"123",country:"us"
        // games:[
        //   {id:1, opponentId:2, isWinner:true, date:new Date()},
        //   {id:2, opponentId:3, isWinner:false, date:new Date()-10000}
        // ]
      },
      {
        id:2, username:"deanush",password:"234",country:"il"
        // games:[
        //   {id:1, opponentId:1, isWinner:false, date:new Date()}
        // ]
      },
      {
        id:3, username:"avivush",password:"345",country:"ch"
        // games:[
        //   {id:2, opponentId:1, isWinner:true, date:new Date()-10000}
        // ]
      },
    ],
    games:[
      {id:1, date:new Date(), winner:1, loser:2},
      {id:2, date:new Date()-1000, winner:1, loser:3},
      {id:3, date:new Date()-4000, winner:2, loser:3},
      {id:4, date:new Date()-10000, winner:1, loser:3},
    ]
  }
}

export default db;
