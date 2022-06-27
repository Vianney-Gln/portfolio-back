const projectRouter = require("express").Router();
// Models
const {
  getProjects,
  createProject,
  getPathImagesProjectsById,
} = require("../models/projects");
// Middlewares
const { runValidateProjectFields } = require("../middlewares/middlewares");
// Path for sendFile
const path = require("path");
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

module.exports = projectRouter;
