import express from 'express'
import { getGamesOfUser, winsLossesRecord } from '../data/dal'

const router = express.Router()

router.get('/winsLossesRecord/:username', (req, res) => {
  const username = req.params.username
  res.json(winsLossesRecord(username));
})

router.get('/games/:username', (req, res) => {
  res.json(getGamesOfUser(req.params.username));
})

export default router
