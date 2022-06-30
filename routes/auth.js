const authRouter = require("express").Router();
// Middlewares
const {
  runHashPassword,
  runGetUserByEmail,
  getPassword,
} = require("../middlewares/middlewares");

//UniqId
const uniqId = require("uniqid");

// Model
const { createUser } = require("../models/auth");

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
  res.send(req.body);
});

module.exports = authRouter;
