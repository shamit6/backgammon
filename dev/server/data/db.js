const db = {
  models:{
    users:[
      {
        username:"amitush",firstName:"Amit", lastName:"Shalev",password:"123",country:"us"
      },
      {
        username:"deanush",firstName:"Dean", lastName:"Shub",password:"234",country:"il"
      },
      {
        username:"avivush",firstName:"Aviv", lastName:"Aviv",password:"345",country:"ch"
      },
    ],
    games:[
      {id:1, date:new Date(), winner:"amitush", loser:"deanush"},
      {id:2, date:new Date(), winner:"amitush", loser:"avivush"},
      {id:3, date:new Date(), winner:"deanush", loser:"avivush"},
      {id:4, date:new Date(), winner:"amitush", loser:"avivush"},
    ]
  }
}

export default db;
