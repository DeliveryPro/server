const generatePassword = require("password-generator");

const { db } = require("../config");
const { cors } = require("../utils/cors");
const { sendMessage } = require("../utils/sendMail");

const passwordRestorationFunction = (request, response) =>
  cors(request, response, async (req, res) => {
    const { userId, receiver, name } = req.body;
    const password = generatePassword(8);
    const message = `Hi, ${name}! \nYour password has been changed to "${password}" \nIf you are not changed your password, contact with administrator`;
    const subject = "Password restoration";
    try {
      await db.ref("users").child(userId).update({ password });
    } catch (e) {
      res.send({
        message: `error while setting the new password to user in db`,
      });
    }

    try {
      sendMessage({ receiver, subject, message });
      res.send({
        message: `new message was created and send to user ${receiver}`,
      });
    } catch (e) {
      res.status(500);
      res.send({
        error: e,
        message: `error while setting the new password to user ${receiver}`,
      });
    }
  });

exports.passwordRestorationFunction = passwordRestorationFunction;
