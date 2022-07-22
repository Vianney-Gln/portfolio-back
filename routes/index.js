const portFolioRouter = require("./portFolio");
const projectRouter = require("./projects");
const authRouter = require("./auth");
const contactFormRouter = require("./contactForm");
const { verifyToken } = require("../middlewares/middlewares");

const setupRoute = (app) => {
  app.use("/api/portFolio_Vianney", portFolioRouter);
  app.use("/api/portFolio_Vianney", projectRouter);
  app.use("/api/portFolio_Vianney/auth", authRouter);
  app.use("/api/portFolio_Vianney/verifyToken", verifyToken);
  app.use("/api/portFolio_Vianney/contactForm", contactFormRouter);
};

module.exports = { setupRoute };
