const projectRouter = require("express").Router();

projectRouter.get("/projects", (req, res) => res.send("coucou"));

module.exports = projectRouter;
