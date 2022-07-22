const contactFormRouter = require("express").Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

contactFormRouter.post("/", (req, res) => {
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
    html: `<p>${req.body.message}</p>`,
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
