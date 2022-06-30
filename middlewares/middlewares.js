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

module.exports = {
  runValidateIntroFields,
  runValidateProjectFields,
  runValidateProjectFieldsUpdate,
  runHashPassword,
  runGetUserByEmail,
};
