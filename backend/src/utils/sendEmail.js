import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  await transporter.sendMail({
    from: `"FYNL" <${process.env.EMAIL_USER}>`, // Sender address
    to, // List of recipients
    subject, // Subject line
    text, // Plain text body
  });
};

export default sendEmail;
