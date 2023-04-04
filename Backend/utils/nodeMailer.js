import nodemailer from "nodemailer";

const sendEmail = (email, subject, text) => {
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
    text: text,
  };

  transport.sendMail(options, (err, info) => {
    if (err) {
      // console.log(err);
      return err;
    }
    console.log(info);
    return info;
  });
};

export default sendEmail;
