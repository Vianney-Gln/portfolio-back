const projectRouter = require("express").Router();

// Models
const { getProjects } = require("../models/projects");

projectRouter.get("/projects", (req, res) => {
  getProjects()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("error, projects not founds");
    });
});

module.exports = projectRouter;
