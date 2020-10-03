import express from "express";
import { addUser, getUserByUsername } from "../data/dal";

const router = express.Router();

const checkIsExisted = (username) => getUserByUsername(username) !== undefined;

router.post("/", (req, res) => {
  const user = req.body;
  addUser(user);
  res.sendStatus(200);
});

router.post("/validation/username", function (req, res) {
  if (!checkIsExisted(req.body.username)) {
    res.sendStatus(200);
  } else {
    res.status(403).send({ message: "Invalid username" });
  }
});

export default router;
