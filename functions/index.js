const functions = require("firebase-functions");

const { passwordRestorationFunction } = require("./data/passwordRestoration");
const { addAnswerFunction } = require("./data/addAnswerFunction");
const { mailerFunction } = require("./data/mailerFunction");
const { loginFunction } = require("./data/loginFunction");
const { registerUserFunction } = require("./data/registerUserFunction");
const { loginWithEmailFunction } = require("./data/loginWithEmailFunction");

exports.login = functions.https.onRequest(loginFunction);
exports.loginWithEmail = functions.https.onRequest(loginWithEmailFunction);
exports.registerUser = functions.https.onRequest(registerUserFunction);
exports.passwordRestoration = functions.https.onRequest(
  passwordRestorationFunction
);

exports.mailer = functions.https.onRequest(mailerFunction);

exports.addAnswer = functions.https.onRequest(addAnswerFunction);
