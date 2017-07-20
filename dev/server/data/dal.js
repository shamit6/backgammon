import db from './db'


export const insertGame = (winner , loser) => {

  const maxId = Math.max.apply(Math, db.models.games.map(game => game.id));

  db.models.games.push({id:maxId+1, winner, loser, date:new Date()});
}
