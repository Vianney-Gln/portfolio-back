// Needed for connecting db
const connection = require("../config");
const db = connection.promise();

/**
 *
 * @param {string} email
 * @returns {promise}
 */
const getUserByEmail = (email) => {
  return db
    .query("SELECT * FROM user WHERE email = ?", [email])
    .then((result) => result[0][0]);
};

/**
 * Function creating a new user
 * @param {object}
 * @returns {promise}
 */
const createUser = ({ email, hashPassword, uuid }) => {
  return db
    .query("INSERT INTO user (email,hashedPassword,uuid) VALUES (?,?,?)", [
      email,
      hashPassword,
      uuid,
    ])
    .then((result) => result[0]);
};

module.exports = { getUserByEmail, createUser };
