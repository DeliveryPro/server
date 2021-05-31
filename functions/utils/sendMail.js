const nodemailer = require("nodemailer");

const MAIL_SENDER = "roman.deliveryapp.ad@gmail.com";
const MAIL_SENDER_PASSWORD = "20002000deliveryapp";

const sendMessage = ({ receiver, subject, message }) => {
  const messageObject = {
    from: MAIL_SENDER,
    to: receiver,
    cc: MAIL_SENDER,
    subject,
    text: message,
  };
  let transporter;

  try {
    const smtpConfig = {
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: MAIL_SENDER,
        pass: MAIL_SENDER_PASSWORD,
      },
    };
    transporter = nodemailer.createTransport(smtpConfig);
  } catch (e) {
    //eslint-disable-next-line no-throw-literal
    throw `message send fail 'auth' ${e}`;
  }

  try {
    transporter.sendMail(messageObject, (err, info) => {
      if (err) throw err;
      console.log(`success ${info}`);
    });
  } catch (e) {
    //eslint-disable-next-line no-throw-literal
    throw `message send fail 'send mail'`;
  }
  return true;
};

exports.sendMessage = sendMessage;
