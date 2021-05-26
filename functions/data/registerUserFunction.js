const { db } = require("../config");
const { cors } = require("../utils/cors");
const { emailToDot } = require("../utils/emailToDot");

const registerUserFunction = (request, response) =>
  cors(request, response, async (req, res) => {
    const { email, password } = req.body;

    const emailWithDot = emailToDot(email);

    try {
      const userSnap = await db.ref("emails").child(emailWithDot).get();
      if (userSnap.exists()) {
        res.status(403);
        res.send({
          message: "user already exist",
        });
        return;
      }
    } catch (e) {
      console.log("error =>", error);
    }

    try {
      const { key } = await db
        .ref("users")
        .push({ email, password, role: "none" });

      await db.ref(`emails/${emailWithDot}`).set(key);
    } catch (e) {
      res.status(500);
      res.send({
        message: "error while trying to create user",
      });
      return;
    }

    res.send({
      message: "user created successfully",
    });
  });

exports.registerUserFunction = registerUserFunction;
