const { db } = require("../config");
const { cors } = require("../utils/cors");

const loginFunction = async (request, response) => {
  return await cors(request, response, async (req, res) => {
    const {
      user: { id: googleId, email: googleEmail },
      email,
      pass,
      user,
    } = req.body;

    let uid;

    if (googleId && googleEmail) {
      const googleSnap = db.ref("emails").child(googleEmail).get();
      if (googleSnap.exists()) uid = googleSnap.key();

      try {
        const snap = await db.ref("users").child(uid).get();
        if (snap.exists()) data = snap.val();
        res.send({
          data,
          message: "log in success",
        });
        return;
      } catch (e) {
        console.log("e => ", e);
      }
    }

    try {
      await db.ref("users").child(id).set(user);
    } catch (e) {
      console.log("error while adding user");
    }

    res.send({
      uid: id,
      message: "log in success",
    });
  });
};

exports.loginFunction = loginFunction;
