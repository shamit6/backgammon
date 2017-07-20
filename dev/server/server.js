import socketIo from 'socket.io'
import {IO_ACTIONS} from '../common/constants'
import db from './data/db'
import dal from './data/dal'
export const create = httpServer => {

  const io = socketIo(httpServer);
  let players = {};
  let socketToUsername = {};
  let waitingPlayers = [];
  let playsAgainst = {};

io.use((socket, next) => {
    const username = socket.handshake.query.username;

    console.log("username", username);
    socketToUsername[socket.id] = username;

    next();
});

    const getPlayerInfo = socketId => {
      const username = socketToUsername[socketId];

      const user2 = db.models.users.find(user => (user.username == username));

      const rate = db.models.games.reduce(({wins, losses}, game) => {
        if (game.winner == user2.id){
          return {wins:wins+1, losses}
        }else if (game.loser == user2.id){
          return {wins, losses:losses+1}
        }
        return {wins, losses};
      },{wins:0, losses:0});

      return {username, country:user2.country, ...rate}
    };

    const searchOppenent = socketId => {

      if (waitingPlayers.length == 0){
        waitingPlayers.push(socketId);
      }else{
        let secondPlayerId = waitingPlayers.shift();

        playsAgainst[socketId] = secondPlayerId;
        playsAgainst[secondPlayerId] = socketId;

        io.sockets.to(socketId).emit(IO_ACTIONS.START_GAME, {start:true, opponentInfo:getPlayerInfo(secondPlayerId)});
        io.sockets.to(secondPlayerId).emit(IO_ACTIONS.START_GAME, {start:false, opponentInfo:getPlayerInfo(socketId)});
      }
    };

    const deleteGameOfSocket = socketId => {
        const opponentId = playsAgainst[socketId];

        delete playsAgainst[socketId];
        delete playsAgainst[opponentId];
    };

    // const updateUserInfo = (username, isWinner) => {
    //
    //   if (isWinner){
    //     players[username].wins += 1;
    //   }else{
    //     players[username].losses += 1;
    //   }
    // }

  io.on('connection', socket => {

      socket.on('disconnect', () => {

        const opponentId = playsAgainst[socket.id];
        // check if currently plays.
        if (opponentId !== undefined){
          io.sockets.to(opponentId).emit(IO_ACTIONS.OPPONENT_RETIREMENT);
          deleteGameOfSocket(socket.id);
        } else {

          // Check if in waiting list.
          const index = waitingPlayers.indexOf(socket.id);
          if (index > -1){
            waitingPlayers = waitingPlayers.splice(index, 1)
          }
        }

        delete socketToUsername[socket.id]
      });

    socket.on(IO_ACTIONS.GAME_ACTION, data => {
            //console.log("server GAME_ACTION" , playsAgainst);
        io.sockets.to(playsAgainst[socket.id]).emit(IO_ACTIONS.GAME_ACTION, data);
    });

    socket.on(IO_ACTIONS.SEARCH_NEW_OPPONENT, data => {
        searchOppenent(socket.id);
    });

    socket.on(IO_ACTIONS.GAME_OVER, data => {

      console.log("GAME_OVER");
      // The winner send this event.
      const name = socketToUsername[socket.id];
      const user = db.models.users.find(user => (user.username == name));

      // update oppent info
      const opponentName = socketToUsername[playsAgainst[socket.id]];
      const opponent = db.models.users.find(user => (user.username == opponentName));

      dal.insertGame(user.id, opponent.id)

      deleteGameOfSocket(socket.id);

      console.log("players", players);
      console.log("playsAgainst", playsAgainst);
    });
  });
}
