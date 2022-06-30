const authRouter = require("express").Router();
// Middlewares
const {
  runHashPassword,
  runGetUserByEmail,
} = require("../middlewares/middlewares");
// Route creating a new user
authRouter.post(
  "/createUser",
  runGetUserByEmail,
  runHashPassword,
  (req, res) => {
    res.send(req.hash);
  }
);

module.exports = authRouter;
