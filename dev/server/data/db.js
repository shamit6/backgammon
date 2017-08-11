import moment from 'moment'

const db = {
  models:{
    users:[
      {
        username:"amitush",firstName:"Amit", lastName:"Shalev",password:"123",country:"us",img:'/images/pp.jpg'
      },
      {
        username:"deanush",firstName:"Dean", lastName:"Shub",password:"234",country:"il"
      },
      {
        username:"avivush",firstName:"Aviv", lastName:"Aviv",password:"345",country:"ch"
      },
    ],
    games:[
      {id:1, date:moment(), winner:"amitush", loser:"deanush"},
      {id:2, date:moment().subtract('days', 2), winner:"amitush", loser:"avivush"},
      {id:3, date:moment().subtract('days', 18), winner:"deanush", loser:"avivush"},
      {id:4, date:moment().subtract('days', 6), winner:"amitush", loser:"avivush"},
      {id:5, date:moment(), winner:"deanush", loser:"amitush"},
      {id:6, date:moment().subtract('days', 46), winner:"amitush", loser:"avivush"},
      {id:7, date:moment().subtract('days', 11), winner:"deanush", loser:"avivush"},
      {id:8, date:moment().subtract('days', 6), winner:"avivush", loser:"amitush"},
    ]
  }
}

export default db;
