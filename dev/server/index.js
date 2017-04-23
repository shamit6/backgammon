import path from 'path';
import socketIo from 'socket.io';
import http from 'http';
import express from 'express';
import {IO_ACTIONS} from '../common/constants';

const port = process.env.PORT || 4444;
 console.log(IO_ACTIONS.startGame);
const app = express();
const httpServer = new http.Server(app);
const io = socketIo(httpServer);

if (process.env.NODE_ENV === 'production'){
  console.log("production env");
  app.use('/', express.static(path.resolve(__dirname, '..')));
}

//let gameSeqId = 0;
let freePlayers = [];
let rivalOf =[];


io.on('connection', function(socket){
    console.log('a user connected');

    socket.on(IO_ACTIONS.gameAction, action => {
     io.sockets.to(rivalOf[socket.id]).emit(IO_ACTIONS.gameAction, action);
  });

  if (freePlayers.length == 0){
  	freePlayers.push(socket.id);
  }else{
  	let secondPlayerId = freePlayers.pop();

    rivalOf[socket.id] = secondPlayerId;
    rivalOf[secondPlayerId] = socket.id;

    //let roomName = "Game" + gameSeqId;
    //gameSeqId++;
    // socket.join(roomName);
    // io.sockets.connected[secondPlayerId].join(roomName);
    // io.to(roomName).emit("START_GAME", "START_GAME");

    socket.emit(IO_ACTIONS.startGame, {start:true});
    io.sockets.to(secondPlayerId).emit(IO_ACTIONS.startGame,{start:false});
  }

});


httpServer.listen(port);



