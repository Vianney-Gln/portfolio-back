const bcrypt = require("bcrypt");

const hashPassword = (password, round) => {
  return bcrypt.hash(password, round);
};

module.exports = { hashPassword };
