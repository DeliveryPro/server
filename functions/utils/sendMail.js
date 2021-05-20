const nodemailer = require("nodemailer");

const MAIL_SENDER = "roman.deliveryapp.ad@gmail.com";
const MAIL_SENDER_PASSWORD = "20002000deliveryapp";
const CLIENT_ID =
  "458819849049-tv50d3o8tg6k7s9r3q1c24649o143mj6.apps.googleusercontent.com";
const CLIENT_SECRET = "6z3e2R0aJ0wg5n6GMKUKAOP2";
const REFRESH_TOKEN =
  "1//04hA9TCqHwBTaCgYIARAAGAQSNwF-L9Ir6YK8HPS5fGdmeuDxprxIFxN1WtnZRX07q9BP5Pl8Btm3ou01ohP5fsBq4Ttc0MbSTsc";

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
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: MAIL_SENDER,
        pass: MAIL_SENDER_PASSWORD,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
      },
    });
  } catch (e) {
    //eslint-disable-next-line no-throw-literal
    throw `message send fail 'auth'`;
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
