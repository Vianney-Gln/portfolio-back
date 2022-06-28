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
  getIntroduction,
} = require("../models/portfolio");
// Path
const path = require("path");

//Middlewares
const { runValidateIntroFields } = require("../middlewares/middlewares");

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
  if (req.file) {
    getPath()
      .then((getPathresult) => {
        updatePath(req.file.path).then(() => {
          fs.unlink(getPathresult.urlImage, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            res.status(201).send();
          });
        });
      })
      .catch((err) => console.log(err));
  } else {
    res.status(404).send("image not found");
  }
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
        }
      });
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
portFolioRouter.put("/introduction", runValidateIntroFields, (req, res) => {
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
