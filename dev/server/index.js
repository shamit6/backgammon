import path from 'path';
import socketIo from 'socket.io';
import http from 'http';
import express from 'express';
import {DICING, MOVING, SWITCH_TURN, switchTurn, makeMove, dice} from '../app/actions';
import {IO_ACTIONS} from '../common/constants';

const port = process.env.PORT || 4444;

//let gameSeqId = 0;
let freePlayers = [];
let rivalOf =[];

const convertActionToRival = action => {
  switch (action.type){
      case MOVING:{
        const {isClient, fromPoint, toPoint} = action.content;
        return Object.assign({}, action, {content:{ isClient:!isClient, toPoint: 25-toPoint, fromPoint: 25-fromPoint }})
      }
      default:
            return action
  }
}

const app = express();
const httpServer = new http.Server(app);
const io = socketIo(httpServer);

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on("GAME_ACTION", action => {
    const convertedAction = convertActionToRival(action);
    socket.broadcast.to(rivalOf[socket.id]).emit("GAME_ACTION", convertedAction);
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

    socket.emit("START_GAME");
    io.sockets.to(secondPlayerId).emit("START_GAME",null);

  	socket.emit("GAME_ACTION", switchTurn());
  }

});

httpServer.listen(port);



