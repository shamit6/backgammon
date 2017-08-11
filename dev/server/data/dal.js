import db from './db'


export const insertGame = (winner , loser) => {

  const maxId = Math.max.apply(Math, db.models.games.map(game => game.id));

  db.models.games.push({id:maxId+1, winner, loser, date:new Date()});
}

export const getUserByUsername = username => db.models.users.find(user => (user.username == username))

export const addUser = user => {
  db.models.users.push(user);
}

export const winsLossesRecord = username => db.models.games.reduce(({wins, losses}, game) => {
      if (game.winner == username){
        return {wins:wins+1, losses}
      }else if (game.loser == username){
        return {wins, losses:losses+1}
      }
      return {wins, losses};
    },{wins:0, losses:0});

export const getGamesOfUser = (username, offest, count) => db.models.games.
  filter(game => (game.winner == username || game.loser == username)).
  slice(offest, count + offest).
  map(({id, date, winner, loser}) => ((winner == username)?
                                          {id, date, opponent:loser, isWinner:true}
                                        :
                                          {id, date, opponent:winner, isWinner:false}));

export const filterUsersByUsername = regExp => db.models.users.
  filter(user => regExp.test(user.username));
