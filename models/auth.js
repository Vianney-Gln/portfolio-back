// Needed for connecting db
const connection = require("../config");
const db = connection.promise();

const getUserByEmail = (email) => {
  return db
    .query("SELECT * FROM user WHERE email = ?", [email])
    .then((result) => result[0][0]);
};

module.exports = { getUserByEmail };
