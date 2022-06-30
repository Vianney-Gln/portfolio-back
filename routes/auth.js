const authRouter = require("express").Router();
// Middlewares
const { runHashPassword } = require("../middlewares/middlewares");
// Route creating a new user
authRouter.post("/createUser", runHashPassword, (req, res) => {
  res.send(req.hash);
});

module.exports = authRouter;
