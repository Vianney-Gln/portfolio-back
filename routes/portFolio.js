const portFolioRouter = require("express").Router();

// Models
const {
  updatePath,
  updateAvatar,
  getAvatar,
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

// Route getting avatar
portFolioRouter.get("/upload", (req, res) => {
  getAvatar()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("error retrieving image");
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
