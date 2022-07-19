const projectRouter = require("express").Router();
// Models
const {
  getProjects,
  createProject,
  getPathImagesProjectsById,
  deleteProjectById,
  updateProjectById,
  deleteImageProjectById,
  getProjectById,
  getProjectImageById,
} = require("../models/projects");
// Middlewares
const {
  runValidateProjectFields,
  runValidateProjectFieldsUpdate,
  checkAuth,
} = require("../middlewares/middlewares");

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

// Routes gettin one project by id
projectRouter.get("/projects/:id", (req, res) => {
  getProjectById(req.params.id)
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("no project found");
      }
    })
    .catch((err) => {
      res.status(404).send("error retrieving project");
    });
});

// Route creating a new project
projectRouter.post(
  "/projects",
  checkAuth,
  runValidateProjectFields,
  (req, res) => {
    const { name, url, urlImage, description, date } = req.body;
    createProject({ name, url, urlImage, description, date })
      .then((result) => {
        res.status(201).send(`project ${result.insertId} created!`);
      })
      .catch((err) => {
        console.log(err);
        res.status(403).send("error create project");
      });
  }
);

// Route deleting a project by his id, and remove the image associated to the server.
projectRouter.delete("/projects/:id", checkAuth, (req, res) => {
  deleteProjectById(req.params.id)
    .then(() => {
      res
        .status(200)
        .send(`project with id ${req.params.id} deleted with success`);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("error during the delete request");
    });
});

// Route updating one project by his id and replace image uploaded
projectRouter.put(
  "/projects/:id",
  checkAuth,
  runValidateProjectFieldsUpdate,
  (req, res) => {
    updateProjectById(req.body, req.params.id)
      .then(() => {
        res.status(201).send("project up to date");
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send("error during update");
      });
  }
);

// Route getting one image project by his id
projectRouter.get("/project/image/:id", (req, res) => {
  getProjectImageById(req.params.id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("error retrieving image from this project");
    });
});

// Route deleting image for one project by id
projectRouter.delete("/project/deleteImage/:id", checkAuth, (req, res) => {
  console.log(req.params.id);
  deleteImageProjectById(req.params.id)
    .then(() => {
      res.status(203).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("error deleting image from project");
    });
});

module.exports = projectRouter;
