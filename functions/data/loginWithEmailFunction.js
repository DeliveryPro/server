const { db } = require("../config");
const { cors } = require("../utils/cors");
const { emailToDot } = require("../utils/emailToDot");

const loginWithEmailFunction = async (request, response) =>
  await cors(request, response, async (req, res) => {
    const { email, password: sendedPassword } = req.body;
    let key = false;

    const emailDot = emailToDot(email);
    try {
      const snap = await db.ref("emails").child(emailDot).get();

      key = snap.val();
    } catch (e) {
      console.log("error while try to find user", e);
      res.status(500);
      res.send({
        message: "error while finding user",
      });
      return;
    }
    if (!key) {
      res.status(404);
      res.send({
        message: "user not found",
      });
      return;
    }

    try {
      const userSnap = await db.ref("users").child(key).get();

      const { password } = userSnap.val();
      if (sendedPassword === password) {
        res.send({
          uid: key,
          message: "login success",
        });
        return;
      }
      res.status(403);
      res.send({
        message: "password mismatch",
      });
      return;
    } catch (e) {
      res.status(500);
      res.send({
        message: "error while finding user",
      });
      return;
    }
  });

exports.loginWithEmailFunction = loginWithEmailFunction;
