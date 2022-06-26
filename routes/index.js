const portFolioRouter = require("./portFolio");
const projectRouter = require("./projects");

const setupRoute = (app) => {
  app.use("/api/portFolio_Vianney", portFolioRouter);
  app.use("/api/portFolio_Vianney", projectRouter);
};

module.exports = { setupRoute };
