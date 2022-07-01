const jwt = require("jsonwebtoken");
require("dotenv").config();
// Helper
const {
  validateIntroFields,
  validateProjectFields,
} = require("../helper/verifFields");
const { hashPassword } = require("../helper/utility");

// Models
const { getUserByEmail } = require("../models/auth");

// Middleware verif introducton data fields
const runValidateIntroFields = (req, res, next) => {
  const { actually, introduction } = req.body;
  const error = validateIntroFields({ actually, introduction });

  if (error) {
    res.status(401).send({ validationError: error.details });
  } else {
    next();
  }
};

// Middleware verif create projects data fields
const runValidateProjectFields = (req, res, next) => {
  const { name, url, date, description } = req.body;

  const error = validateProjectFields({
    name,
    url,
    date,
    description,
  });

  if (error) {
    res.status(401).send({ validationError: error.details });
  } else {
    next();
  }
};

// Middleware verif create projects data fields
const runValidateProjectFieldsUpdate = (req, res, next) => {
  const { name, url, date, description } = req.body;
  const error = validateProjectFields(
    {
      name,
      url,
      date,
      description,
    },
    false
  );
  if (error) {
    res.status(401).send({ validationError: error.details });
  } else {
    next();
  }
};

// Middleware running hashPassword,go next function or send an error
const runHashPassword = (req, res, next) => {
  const { hashedPassword } = req.body;
  hashPassword(hashedPassword, 10)
    .then((passHashed) => {
      req.hash = passHashed;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("error during hash password");
    });
};

// Middleware checking if email is already in use, go next function no email found, send an error if found
const runGetUserByEmail = (req, res, next) => {
  const { email } = req.body;
  getUserByEmail(email).then((result) => {
    if (result) {
      res.status(401).send("email already used");
    } else {
      next();
    }
  });
};

/**
 * Function getting password and all users infos
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getPassword = (req, res, next) => {
  const { email } = req.body;
  getUserByEmail(email).then((user) => {
    if (user) {
      req.body = { ...req.body, ...user };
      next();
    } else {
      res.status(401).send("wrong creds");
    }
  });
};

/**
 * Function checking the token access forEach routes post or update
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const checkAuth = (req, res, next) => {
  let token = null;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  jwt.verify(token, process.env.SECRET_KEY, (err) => {
    if (err) {
      res.status(401).send("you don't have the permission");
    } else {
      next();
    }
  });
};

// Function called on componant mounting (useEffect) for connection and allow only admin to access to manage files, then go next
const verifyToken = (req, res) => {
  let token = null;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  jwt.verify(token, process.env.SECRET_KEY, (err) => {
    if (err) {
      res.status(200).send(false);
    } else {
      res.status(201).send(true);
    }
  });
};

module.exports = {
  runValidateIntroFields,
  runValidateProjectFields,
  runValidateProjectFieldsUpdate,
  runHashPassword,
  runGetUserByEmail,
  getPassword,
  checkAuth,
  verifyToken,
};
