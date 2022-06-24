const portFolioRouter = require("./portFolio");

const setupRoute = (app) => {
  app.use("/api/portFolio_Vianney", portFolioRouter);
};

module.exports = { setupRoute };
