const portFolioRouter = require("./portFolio");
const projectRouter = require("./projects");
const authRouter = require("./auth");

const setupRoute = (app) => {
  app.use("/api/portFolio_Vianney", portFolioRouter);
  app.use("/api/portFolio_Vianney", projectRouter);
  app.use("/api/portFolio_Vianney/auth", authRouter);
};

module.exports = { setupRoute };
