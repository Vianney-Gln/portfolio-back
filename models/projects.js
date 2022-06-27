// Needed for connecting db
const connection = require("../config");
const db = connection.promise();

/**
 * Function getting all projects
 * @returns {promise}
 */
const getProjects = () => {
  return db.query("SELECT * FROM projects").then((result) => result[0]);
};

const createProject = ({ name, url, urlImage, description, date }) => {
  return db
    .query(
      "INSERT INTO projects (name, url, urlImage, description, date,isOpen) VALUES (?,?,?,?,?,?)",
      [name, url, urlImage, description, date, false]
    )
    .then((result) => result[0]);
};

module.exports = { getProjects, createProject };
