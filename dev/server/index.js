import path from 'path';
import socketIo from 'socket.io';
import http from 'http';
import express from 'express';
import {DICING, STEP, SWITCH_TURN, switchTurn, makeMove, dice} from '../app/actions';
import {IO_ACTIONS} from '../common/constants';

const port = process.env.PORT || 4444;

const app = express();
const httpServer = new http.Server(app);
const io = socketIo(httpServer);


if (process.env.NODE_ENV === 'production'){
  console.log("production env");
  const outFolder = path.resolve(__dirname, '..', '..', 'output');
  app.use('/', express.static(outFolder));
  app.get('/*', (req, res) => res.sendFile(path.resolve(outFolder, "index.html")));
}

//let gameSeqId = 0;
let freePlayers = [];
let rivalOf =[];

const convertActionToRival = action => {
  switch (action.type){
      case STEP:{
        const {isClient, fromPoint, toPoint} = action.content;
        return Object.assign({}, action, {content:{ isClient:!isClient, toPoint: 25-toPoint, fromPoint: 25-fromPoint }})
      }
      default:
            return action
  }
}

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on("GAME_ACTION", action => {
    const convertedAction = convertActionToRival(action);
     io.sockets.to(rivalOf[socket.id]).emit("GAME_ACTION", convertedAction);
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



