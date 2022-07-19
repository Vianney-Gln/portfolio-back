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

const getProjectImageById = (id) => {
  return db
    .query("SELECT base64, type FROM projects WHERE id = ?", [id])
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
      "INSERT INTO projects (name, url, urlimage, description, date) VALUES (?,?,?,?,?)",
      [name, url, urlImage, description, date]
    )
    .then((result) => result[0]);
};

/**
 * Function deleteting one project by his id
 * @param {*} id
 * @returns
 */
const deleteProjectById = (id) => {
  return db
    .query("DELETE FROM projects WHERE id = ?", [id])
    .then((result) => result[0]);
};

/**
 * Function updating a project by his id
 * @param {object} data
 * @param {number} id
 * @returns {promise}
 */

const updateProjectById = (data, id) => {
  return db
    .query("UPDATE projects SET ? WHERE id = ?", [data, id])
    .then((result) => result[0]);
};

/**
 * Function deleting image for one project by updating the field to null
 * @param {number} id
 * @returns {promise}
 */
const deleteImageProjectById = (id) => {
  return db
    .query("UPDATE projects SET base64 = null, type = null WHERE id = ?", [id])
    .then((result) => result[0]);
};

/**
 * Function getting one project by his id
 * @param {number} id
 * @returns {promise}
 */
const getProjectById = (id) => {
  return db
    .query("SELECT id,name,url,description,date FROM projects WHERE id = ?", [
      id,
    ])
    .then((result) => result[0][0]);
};

module.exports = {
  getProjects,
  createProject,
  deleteProjectById,
  updateProjectById,
  deleteImageProjectById,
  getProjectById,
  getProjectImageById,
};
