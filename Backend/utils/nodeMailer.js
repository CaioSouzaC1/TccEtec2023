import nodemailer from "nodemailer";
import { email_create_acc } from "./emailTemplates.js";

const sendEmail = (email, name, subject, type) => {
  const transport = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "tcc2023eteccps@outlook.com",
      pass: "2023tcceteccps",
    },
  });

  const options = {
    from: "tcc2023eteccps@outlook.com",
    to: email,
    subject: subject,
    html: email_create_acc(name, email, type),
  };

  transport.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return err;
    }
    console.log(info);
    return info;
  });
};

export default sendEmail;
