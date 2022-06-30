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
// Path for sendFile
const path = require("path");
// FS
const fs = require("fs");
// Multer
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const path = `uploads`;
    callback(null, path);
  },
  filename: function (req, file, callback) {
    callback(null, `${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

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
  upload.single("image-project"),
  runValidateProjectFields,
  (req, res) => {
    let urlImage = null;
    const { name, url, description, date } = req.body;
    if (req.file) urlImage = req.file.path;

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

// Route sending the image file from one project by his id
projectRouter.get("/projects/image/:id", (req, res) => {
  const options = {
    root: path.join(""),
  };
  getPathImagesProjectsById(req.params.id)
    .then((result) => {
      if (result.urlImage) {
        res.sendFile(result.urlImage, options, (err) => {
          if (err) {
            res.status(404).send("image not found");
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

projectRouter.delete("/projects/:id", (req, res) => {
  //model de récupération du path de l'image
  //model de suppression de la base de données, si ok, on lance fs.unlink(path)

  getPathImagesProjectsById(req.params.id)
    .then((result) => {
      deleteProjectById(req.params.id)
        .then(() => {
          if (result.urlImage) {
            fs.unlink(result.urlImage, (err) => {
              if (err) console.log(err);
            });
          }
          res
            .status(200)
            .send(`project with id ${req.params.id} deleted with success`);
        })
        .catch((err) => {
          console.log(err);
          res.status(404).send("error during the delete request");
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("error during the request");
    });
});

// Route updating one project by his id and replace image uploaded
projectRouter.put(
  "/projects/:id",
  upload.single("image-project"),
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

projectRouter.delete("/project/deleteImage/:id", (req, res) => {
  getPathImagesProjectsById(req.params.id)
    .then((result) => {
      if (result) {
        const urlToUnlink = result.urlImage;
        deleteImageProjectById(req.params.id)
          .then((result) => {
            if (result.changedRows) {
              console.log("coucou");
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
