// Needed for connecting db
const connection = require("../config");
const db = connection.promise();

const getProjects = () => {
  return db.query("SELECT * FROM projects").then((result) => result[0]);
};

module.exports = { getProjects };
