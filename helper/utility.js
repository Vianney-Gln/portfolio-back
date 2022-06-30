const bcrypt = require("bcrypt");

/**
 * Function hashing passwords
 * @param {string} password
 * @param {number} round
 * @returns {promise}
 */
const hashPassword = (password, round) => {
  return bcrypt.hash(password, round);
};

module.exports = { hashPassword };
