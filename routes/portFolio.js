const portFolioRouter = require("express").Router();
// Multer
const multer = require("multer");
// FS
const fs = require("fs");
// Models
const {
  updatePath,
  getPath,
  updateIntroduction,
} = require("../models/portfolio");
// Path
const path = require("path");

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

// Route uploading an image and delete the old
portFolioRouter.post("/upload", upload.single("file"), (req, res) => {
  getPath()
    .then((getPathresult) => {
      console.log(getPathresult.urlImage);
      updatePath(req.file.path).then(() => {
        fs.unlink(getPathresult.urlImage, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("file deleted");

          res.status(201).send(req.file);
        });
      });
    })
    .catch((err) => console.log(err));
});

// Route getting one image

portFolioRouter.get("/upload", (req, res) => {
  const options = {
    root: path.join(""),
  };
  getPath()
    .then((result) => {
      res.sendFile(result.urlImage, options, (err) => {
        if (err) {
          res.send(err);
        } else {
          console.log("sent");
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error getting image");
    });
});

// Route updating introduction
portFolioRouter.put("/introduction", (req, res) => {
  console.log(req.body);
  updateIntroduction(req.body)
    .then((result) => {
      if (result.affectedRows) {
        res.status(201).send("modification réussie");
      } else {
        res.status(200).send("modification non réalisée");
      }
    })
    .catch((err) => console.log(err));
});

module.exports = portFolioRouter;
