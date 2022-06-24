const { validateIntroFields } = require("../helper/verifFields");

const runValidateIntroFields = (req, res, next) => {
  const { actually, introduction } = req.body;
  const error = validateIntroFields({ actually, introduction });

  if (error) {
    res.status(401).send("error updating data");
  } else {
    next();
  }
};

module.exports = { runValidateIntroFields };
