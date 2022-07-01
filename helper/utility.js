const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Function hashing passwords
 * @param {string} password
 * @param {number} round
 * @returns {promise}
 */
const hashPassword = (password, round) => {
  return bcrypt.hash(password, round);
};

/**
 * Function creating a token using email, uuid and a secret key
 * @param {string} email
 * @param {string} uuid
 * @returns {string}
 */
const calculateToken = (email, uuid) => {
  return jwt.sign({ email, uuid }, process.env.SECRET_KEY);
};

module.exports = { hashPassword, calculateToken };
