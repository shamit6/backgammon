import socketIo from 'socket.io'
import {IO_ACTIONS} from '../common/constants'
import {winsLossesRecord, getUserByUsername} from './data/dal'

export const create = httpServer => {

  const io = socketIo(httpServer);
  let players = {};
  let socketToUser = {};
  let waitingPlayers = [];
  let playsAgainst = {};

io.use((socket, next) => {
    const username = socket.handshake.query.username;
    const isGuest = socket.handshake.query.isGuest;

    socketToUser[socket.id] = {username, isGuest: (isGuest == 'true')};

    next();
});

    const getPlayerInfo = socketId => {
      const user = socketToUser[socketId];
      const username = user.username;

      if (user.isGuest){
        return user;
      }

      const userInfo = getUserByUsername(username);

      const rate = winsLossesRecord(username);

      return {username, img:userInfo.img, country:userInfo.country, ...rate}
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

        delete socketToUser[socket.id]
      });

    socket.on(IO_ACTIONS.GAME_ACTION, data => {
            //console.log("server GAME_ACTION" , playsAgainst);
        io.sockets.to(playsAgainst[socket.id]).emit(IO_ACTIONS.GAME_ACTION, data);
    });

    socket.on(IO_ACTIONS.CHAT_MESSAGE, data => {
            //console.log("server GAME_ACTION" , playsAgainst);
        io.sockets.to(playsAgainst[socket.id]).emit(IO_ACTIONS.CHAT_MESSAGE, data);
    });

    socket.on(IO_ACTIONS.SEARCH_NEW_OPPONENT, data => {
        searchOppenent(socket.id);
    });

    socket.on(IO_ACTIONS.GAME_OVER, data => {

      console.log("GAME_OVER");
      // The winner send this event.
      const name = socketToUser[socket.id];
      const user = getUserByUsername(user.username == name);

      // update oppent info
      const opponentName = socketToUser[playsAgainst[socket.id]];
      const opponent = getUserByUsername(user.username == opponentName);

      dal.insertGame(user.username, opponent.username)

      deleteGameOfSocket(socket.id);

      console.log("players", players);
      console.log("playsAgainst", playsAgainst);
    });
  });
}
