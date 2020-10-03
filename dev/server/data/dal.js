import db from "./db";
import moment from "moment";

const scoreDecoder = {
  "-3": "turkishMarsLoss",
  "-2": "marsLoss",
  "-1": "loss",
  0: "draw",
  1: "win",
  2: "marsWin",
  3: "turkishMarsWin",
};

// TODO: extend to all types of result
const insertGame = (host, guest, isHostWinner) => {
  const maxId = Math.max.apply(
    Math,
    db.models.games.map((game) => game.id)
  );
  db.models.games.push({
    id: maxId + 1,
    host,
    guest,
    score: isHostWinner ? 1 : -1,
    date: moment(),
  });
};

const getUserByUsername = (username) => {
  const user = db.models.users.find((user) => user.username == username);
  return { ...user, password: undefined };
};

const getUserByPassword = (username, password) =>
  db.models.users.find(
    (user) => user.username == username && user.password == password
  );

const getUser = (userId) => db.models.users.find((user) => user.id == userId);

const addUser = (user) => {
  db.models.users.push(user);
};

const gePlayerRecord = (userId) =>
  db.models.games.reduce(
    (res, game) => {
      const decode = scoreDecoder[game.score];
      if (game.host == userId) {
        res[decode] = res[decode] + 1;
      } else if (game.guest == userId) {
        res[scoreDecoder[game.score * -1]] =
          res[scoreDecoder[game.score * -1]] + 1;
      }
      return res;
    },
    {
      turkishMarsLoss: 0,
      marsLoss: 0,
      loss: 0,
      draw: 0,
      win: 0,
      marsWin: 0,
      turkishMarsWin: 0,
    }
  );

const getWinsLossesRecord = (userId) => {
  const {
    turkishMarsLoss,
    marsLoss,
    loss,
    draw,
    win,
    marsWin,
    turkishMarsWin,
  } = gePlayerRecord(userId);

  return {
    win: win + marsWin + turkishMarsWin,
    draw,
    loss: turkishMarsLoss + marsLoss + loss,
  };
};

const getGamesOfUser = (userId, offest, count) =>
  db.models.games
    .filter((game) => game.host == userId || game.guest == userId)
    .slice(offest, count + offest)
    .map(({ id, date, host, guest, score }) =>
      host == userId
        ? { id, date, opponent: guest, score: scoreDecoder[score] }
        : { id, date, opponent: host, score: scoreDecoder[score * -1] }
    );

const filterUsersByUsername = (regExp) =>
  db.models.users
    .filter((user) => regExp.test(user.username))
    .map((user) => ({ ...user, password: undefined }));

const dal = {
  insertGame,
  getUserByUsername,
  getUserByPassword,
  getUser,
  addUser,
  gePlayerRecord,
  getWinsLossesRecord,
  getGamesOfUser,
  filterUsersByUsername,
};

export default dal;
