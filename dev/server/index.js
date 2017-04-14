import path from 'path';
import socketIo from 'socket.io';
import http from 'http';
import express from 'express';
import {DICING, MOVING, SWITCH_TURN, switchTurn, makeMove, dice} from '../app/actions';

console.log("in server");

const port = process.env.PORT || 4444;

let gameSeqId = 0;
let freePlayers = [];
let rivalOf =[];
// const htmlFile =  path.resolve(__dirname, '../..', 'index.html');
// console.log(htmlFile);

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
   	//const room = socket.rooms[socket.id];
    console.log ("server recieve socket:" + socket.id);
    console.log (action);
    const convertedAction = convertActionToRival(action);
    console.log ("after convert");
    console.log (convertedAction);

    socket.broadcast.emit("GAME_ACTION", convertedAction);

});

  if (freePlayers.length == 0){
  	freePlayers.push(socket);
  	console.log('Push socket to the freePlayer ');
	console.log(socket.id);
  }else{
  	let secondPlayer = freePlayers.pop();

    rivalOf[socket.id] = secondPlayer.id;
    rivalOf[secondPlayer.id] = socket.id;

   //  console.log(rivalOf);
  	// const roomGame = "Game" + gameSeqId;
  	// gameSeqId++;

  	// socket.join(roomGame);
  	// secondPlayer.join(roomGame);

  	socket.emit("GAME_ACTION", switchTurn());
  }

});

httpServer.listen(port);



