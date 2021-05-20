const functions = require("firebase-functions");

const { passwordRestorationFunction } = require("./data/passwordRestoration");
const { addAnswerFunction } = require("./data/addAnswerFunction");
const { mailerFunction } = require("./data/mailerFunction");
const { loginFunction } = require("./data/loginFunction");


exports.login = functions.https.onRequest(loginFunction);

exports.passwordRestoration = functions.https.onRequest(
  passwordRestorationFunction
);

exports.mailer = functions.https.onRequest(mailerFunction);

exports.addAnswer = functions.https.onRequest(addAnswerFunction);


// const registerFunction = async () => {
//   return await corsFunc(request, response, async (req, res) => {
//     const { email, pass } = req.body;

//     //check data validity
//     if (!email || !pass) {
//       res.status(403);
//       res.send({
//         message: "not all data provided",
//       });
//       return;
//     }

//     //check if user already registered
//     const isPresent = await checkIsPresent("users", email);

//     if (isPresent) {
//       res.status(403);
//       res.send({
//         message: "user already registered",
//       });
//       return;
//     }

//     //try to register user
//     try {
//       await db.ref("users").set({ email, pass });
//       await db.ref("email").child(email).set({});
//     } catch (e) {
//       console.log("error while adding user");
//     }
//     res.send({});
//   });
// };

