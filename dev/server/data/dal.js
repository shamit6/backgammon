import db from './db'


export const insertGame = (winner , loser) => {

  const maxId = Math.max.apply(Math, db.models.games.map(game => game.id));

  db.models.games.push({id:maxId+1, winner, loser, date:new Date()});
}

export const getUserByUsername = username => db.models.users.find(user => (user.username == username))

export const addUser = user => {
  db.models.users.push(user);
}
