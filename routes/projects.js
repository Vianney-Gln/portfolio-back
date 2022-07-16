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
    const { name, url, base64, description, date, type } = req.body;
    createProject({ name, url, base64, description, date, type })
      .then((result) => {
        res.status(201).send(`project ${result.insertId} created!`);
      })
      .catch((err) => {
        console.log(err);
        res.status(403).send("error create project");
      });
  }
);

// Route sending the image file from one project by his id
projectRouter.get("/projects/image/:id", (req, res) => {
  getPathImagesProjectsById(req.params.id)
    .then((result) => {
      if (result.urlImage) {
        const image = result.urlImage.split("\\")[1];
        const dir = result.urlImage.split("\\")[0];

        res.sendFile(image, { root: dir }, (err) => {
          if (err) {
            res.status(404).send(err);
          }
        });
      } else {
        res.status(404).send("image not found");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("error,image not found");
    });
});

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
    getPathImagesProjectsById(req.params.id)
      .then((imageProject) => {
        let urlImage;
        if (req.file) {
          urlImage = req.file.path;
        }
        const data = { ...req.body, urlImage };
        updateProjectById(data, req.params.id)
          .then((result) => {
            res.status(201).send(result);
            if (imageProject.urlImage) {
              fs.unlink(imageProject.urlImage, (err) => {
                if (err) {
                  console.log(err);
                }
              });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(404).send("error during update");
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send("error retrieving image from this project");
      });
  }
);

// Route deleting the image for one project by id

projectRouter.delete("/project/deleteImage/:id", checkAuth, (req, res) => {
  getPathImagesProjectsById(req.params.id)
    .then((result) => {
      if (result) {
        const urlToUnlink = result.urlImage;
        deleteImageProjectById(req.params.id)
          .then((result) => {
            if (result.changedRows) {
              fs.unlink(urlToUnlink, (err) => {
                if (err) {
                  console.log(err);
                  res
                    .status(400)
                    .send(
                      "image deleted but error during suppression image from the server"
                    );
                } else {
                  res.status(201).send("image deleted from the project");
                }
              });
            } else {
              res.status(404).send("no image to delete");
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(404).send("error deleting image from project");
          });
      } else {
        res.send("no image found");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("error retrieving image for this project");
    });
});

module.exports = projectRouter;
