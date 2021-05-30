const { db } = require("../config");
const { cors } = require("../utils/cors");
const { emailToDot } = require("../utils/emailToDot");

const loginFunction = async (request, response) =>
  await cors(request, response, async (req, res) => {
    const {
      user: { id: googleId, email },
      user,
    } = req.body;

    const emailDot = emailToDot(email);

    if (!googleId || !email) {
      res.send({
        message: "invalid data while login with google",
      });
      return;
    }
    try {
      const snap = await db.ref("users").child(googleId).get();
      if (snap.exists()) {
        res.send({
          uid: googleId,
          message: "login success",
        });
        return;
      }
    } catch (e) {
      console.log("user not found", e);
    }

    try {
      await db.ref("users").child(googleId).set(user);
      db.ref("emails").child(emailDot).set(googleId);
      res.send({
        uid: googleId,
        message: "login success",
      });
    } catch (e) {
      res.send({
        message: "error while adding a new user with google",
      });
    }
  });

exports.loginFunction = loginFunction;
