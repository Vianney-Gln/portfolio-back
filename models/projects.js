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
/**
 * Function getting only images from projects by id
 * @param {number} id
 * @returns {promise}
 */
const getPathImagesProjectsById = (id) => {
  return db
    .query("SELECT urlImage FROM projects WHERE id = ?", [id])
    .then((result) => result[0][0]);
};

/**
 * Function creating project
 * @param {object} param0
 * @returns {promise}
 */
const createProject = ({ name, url, urlImage, description, date }) => {
  return db
    .query(
      "INSERT INTO projects (name, url, urlImage, description, date) VALUES (?,?,?,?,?)",
      [name, url, urlImage, description, date]
    )
    .then((result) => result[0]);
};

module.exports = { getProjects, createProject, getPathImagesProjectsById };
