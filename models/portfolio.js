// Needed for connecting db
const connection = require("../config");
const db = connection.promise();

/**
 * function changing the path for the uplauded img
 * @param {string} urlImage
 * @returns {promise}
 */
const updatePath = (urlImage) => {
  return db
    .query("UPDATE portfolio SET urlImage = ? WHERE id = 1", [urlImage])
    .then((result) => result[0]);
};

const updateAvatar = (data) => {
  return db.query("UPDATE portfolio SET ?", [data]).then((result) => result[0]);
};

/**
 * Function getting the path from image
 * @returns {promise}
 */
const getPath = () => {
  return db
    .query("SELECT urlImage from portfolio")
    .then((result) => result[0][0]);
};
/**
 * Function updating description or actually
 * @param {object} description
 * @returns {promise}
 */
const updateIntroduction = (dataToUpdate) => {
  return db
    .query("UPDATE portfolio SET ? ", [dataToUpdate])
    .then((result) => result[0]);
};

const getIntroduction = () => {
  return db
    .query("SELECT introduction,actually FROM portfolio")
    .then((result) => result[0][0]);
};

module.exports = {
  updatePath,
  getPath,
  updateIntroduction,
  getIntroduction,
  updateAvatar,
};
