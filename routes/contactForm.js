const contactFormRouter = require("express").Router();
const nodemailer = require("nodemailer");
const { runValidateContactFields } = require("../middlewares/middlewares");
require("dotenv").config();

// Route sending email
contactFormRouter.post("/", runValidateContactFields, (req, res) => {
  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_EMAIL_PASSWORD,
    },
  });
  const mailDetails = {
    from: req.body.email,
    to: process.env.EMAIL,
    subject: req.body.subject,
    html: `<p>${req.body.message}</p><p><span>${req.body.name} ${req.body.firstname}</span></p>`,
  };
  mailTransporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.log(err);
      res.status(401).send("error during sending email");
    } else {
      res.status(200).send("email sended");
    }
  });
});

module.exports = contactFormRouter;
