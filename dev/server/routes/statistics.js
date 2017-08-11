import express from 'express'
import { getGamesOfUser, winsLossesRecord, filterUsersByUsername } from '../data/dal'

const router = express.Router()

router.get('/record/:username', (req, res) => {
  const username = req.params.username
  res.json(winsLossesRecord(username));
})

router.get('/games/:username', (req, res) => {
  const { username } = req.params;
  const { offest, count } = req.query;
  //console.log("count + offest" , count + offest);
  res.json(getGamesOfUser(username, parseInt(offest), parseInt(count)));
})

router.get('/serach', (req, res) => {
  const { username } = req.query;
  const string = `.*${username}.*`;
  const regExp = new RegExp(string);
  res.json(filterUsersByUsername(regExp));
});

export default router
