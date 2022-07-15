const portFolioRouter = require("express").Router();

// Models
const {
  updatePath,
  updateAvatar,
  getPath,
  updateIntroduction,
  getIntroduction,
} = require("../models/portfolio");
// Path
const path = require("path");

//Middlewares
const {
  runValidateIntroFields,
  checkAuth,
} = require("../middlewares/middlewares");

// Route uploading an image and delete the old
portFolioRouter.post("/upload", (req, res) => {
  updateAvatar(req.body)
    .then(() => {
      res.status(201).send("modif photo ok");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("error change photo");
    });
});

// Route getting one image

portFolioRouter.get("/upload", (req, res) => {
  getPath()
    .then((result) => {
      if (result.urlImage) {
        const image = result.urlImage.split("/")[1];
        const dir = result.urlImage.split("/")[0];
        res.sendFile(image, { root: dir }, (err) => {
          if (err) {
            res.send(err);
          }
        });
      } else {
        res.status(404).send("oups error");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error getting image");
    });
});

// Route getting introduction
portFolioRouter.get("/introduction", (req, res) => {
  getIntroduction()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("error retrieving data");
    });
});

// Route updating introduction
portFolioRouter.put(
  "/introduction",
  checkAuth,
  runValidateIntroFields,
  (req, res) => {
    updateIntroduction(req.body)
      .then((result) => {
        if (result.affectedRows) {
          res.status(201).send("modification réussie");
        } else {
          res.status(200).send("modification non réalisée");
        }
      })
      .catch((err) => console.log(err));
  }
);

module.exports = portFolioRouter;
