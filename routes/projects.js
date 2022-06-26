const projectRouter = require("express").Router();

// Models
const { getProjects, createProject } = require("../models/projects");

// Routes getting all projects
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

// Route creating a new project
projectRouter.post("/projects", (req, res) => {
  const { name, url, urlImage, description, date } = req.body;
  createProject({ name, url, urlImage, description, date })
    .then((result) => {
      res.status(201).send(`project ${result.insertId} created!`);
    })
    .catch((err) => {
      console.log(err);
      res.status(403).send("error create project");
    });
});

module.exports = projectRouter;
