import path from 'path';
import socketIo from 'socket.io';
import http from 'http';
import express from 'express';
import {IO_ACTIONS} from '../common/constants';
import config from  '../common/config';

const port = config.getParameter("PORT");
const app = express();
const httpServer = new http.Server(app);
const io = socketIo(httpServer);

if (config.getParameter("NODE_ENV") === 'production'){
  console.log("production env");
  app.use('/', express.static(path.resolve(__dirname, '..')));
}

//let gameSeqId = 0;
let freePlayers = [];
let rivalOf = {};


io.on('connection', function(socket){

  const searchRival = socketId => {
    // console.log("search pplayer for:");
    console.log(socketId);
    // console.log("free players");

    // console.log(freePlayers);

    if (freePlayers.length == 0){
      freePlayers.push(socketId);
    }else{
      let secondPlayerId = freePlayers.pop();

      rivalOf[socketId] = secondPlayerId;
      rivalOf[secondPlayerId] = socketId;

      //let roomName = "Game" + gameSeqId;
      //gameSeqId++;
      // socket.join(roomName);
      // io.sockets.connected[secondPlayerId].join(roomName);
      // io.to(roomName).emit("START_GAME", "START_GAME");

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



httpServer.listen(port);



