const authRouter = require("express").Router();
// Middlewares
const {
  runHashPassword,
  runGetUserByEmail,
  getPassword,
  checkAuth,
} = require("../middlewares/middlewares");

//UniqId
const uniqId = require("uniqid");

//bcrypt
const bcrypt = require("bcrypt");

// Model
const { createUser } = require("../models/auth");

//CalculateToken
const { calculateToken } = require("../helper/utility");

// Route creating a new user
authRouter.post(
  "/createUser",
  runGetUserByEmail,
  runHashPassword,
  (req, res) => {
    const uuid = uniqId();
    const { email } = req.body;
    const hashPassword = req.hash;
    createUser({ email, hashPassword, uuid })
      .then((result) => {
        res.status(201).send(`user created with id ${result.insertId}`);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send("error during user creation");
      });
  }
);

// Route checking credentials, compare input password with hashedPassword, then generate a token

authRouter.post("/", getPassword, (req, res) => {
  const { password, hashedPassword, email, uuid } = req.body;
  bcrypt
    .compare(password, hashedPassword)
    .then((result) => {
      if (result) {
        const token = calculateToken(email, uuid);
        res.status(200).send(token);
      } else {
        res.status(401).send("wrong creds");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error during decryption");
    });
});

module.exports = authRouter;
