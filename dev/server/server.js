import socketIo from 'socket.io';
import {IO_ACTIONS} from '../common/constants';
export const create = httpServer => {

  const io = socketIo(httpServer);

  //let gameSeqId = 0;
  let freePlayers = [];
  let rivalOf = {};


  io.on('connection', function(socket){

    const searchRival = socketId => {
      console.log(socketId);


      if (freePlayers.length == 0){
        freePlayers.push(socketId);
      }else{
        let secondPlayerId = freePlayers.pop();

        rivalOf[socketId] = secondPlayerId;
        rivalOf[secondPlayerId] = socketId;

        io.sockets.to(socketId).emit(IO_ACTIONS.startGame, {start:true});
        io.sockets.to(secondPlayerId).emit(IO_ACTIONS.startGame,{start:false});
      }
    };
      socket.on('disconnect', () => {

        // check if currently plays.
        if (rivalOf[socket.id] !== 'undefined'){
          //io.sockets.connected[rivalOf[socket.id]].emit("RIVAL_RETIREMENT", action);
          const rivalId = rivalOf[socket.id];
          io.sockets.to(rivalId).emit(IO_ACTIONS.rivalRetirement);
          delete rivalOf[rivalId];
          searchRival(rivalId); 
        } else {

          // Check if in waiting list.
          const index = freePlayers.indexOf(socket.id);
          if (index > -1){
            freePlayers = freePlayers.splice(index, 1)
          }
        }

      console.log("disconnect" + socket.id);
        delete rivalOf[socket.id];
        console.log(rivalOf);
      });

    socket.on(IO_ACTIONS.gameAction, action => {
        io.sockets.to(rivalOf[socket.id]).emit(IO_ACTIONS.gameAction, action);
    });

    searchRival(socket.id);

    socket.on(IO_ACTIONS.searchNewRival, action => {
        searchRival(socket.id);
    });
  });
}
