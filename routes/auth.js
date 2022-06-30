const authRouter = require("express").Router();

// Route creating a new user

authRouter.post("/createUser", (req, res) => {
  res.send("user created");
});

module.exports = authRouter;
