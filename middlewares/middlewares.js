const {
  validateIntroFields,
  validateProjectFields,
} = require("../helper/verifFields");

// Middleware verif introducton data fields
const runValidateIntroFields = (req, res, next) => {
  const { actually, introduction } = req.body;
  const error = validateIntroFields({ actually, introduction });

  if (error) {
    res.status(401).send("error updating data");
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
    res.status(401).send("error adding project");
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
    res.status(401).send("error updating project");
  } else {
    next();
  }
};

module.exports = {
  runValidateIntroFields,
  runValidateProjectFields,
  runValidateProjectFieldsUpdate,
};
