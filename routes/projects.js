const projectRouter = require("express").Router();
// Models
const { getProjects, createProject } = require("../models/projects");
// Middlewares
const { runValidateProjectFields } = require("../middlewares/middlewares");
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

module.exports = projectRouter;
