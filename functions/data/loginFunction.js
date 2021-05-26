const { db } = require("../config");
const { cors } = require("../utils/cors");

const loginFunction = async (request, response) =>
  await cors(request, response, async (req, res) => {
    const {
      user: { id: googleId, email: googleEmail },
      user,
    } = req.body;

    if (!googleId || !googleEmail) {
      res.send({
        message: "invalid data while login with google",
      });
      return;
    }
    try {
      const snap = await db.ref("users").child(googleId).get();
      if (snap.exists()) {
        data = snap.val();
        res.send({
          message: "login success",
        });
        return;
      }
    } catch (e) {
      console.log("user not found", e);
    }

    try {
      await db.ref("users").child(googleId).set(user);
      res.send({
        message: "login success",
      });
    } catch (e) {
      res.send({
        message: "error while adding a new user with google",
      });
    }
  });

exports.loginFunction = loginFunction;
