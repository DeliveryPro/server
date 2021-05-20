const { cors } = require("../utils/cors");
const { db } = require("../config");
const { sendMessage } = require("../utils/sendMail");

const addAnswerFunction = (request, response) =>
  cors(request, response, async (req, res) => {
    const { questionId, email: receiver, name, answer, question } = req.body;
    const message = `Hi, ${name}! \nThanks for using our Delivery service support. \n An expert have an answer for your question: "${question}" \n${answer}`;
    const subject = "Support question";

    try {
      await db
        .ref("support")
        .child(questionId)
        .update({ status: "resolved", answer });
    } catch (e) {
      res.send({
        message: `error while setting an answer for question db`,
      });
    }

    try {
      sendMessage({ receiver, subject, message });
      res.send({
        message: `an answer was send to user ${receiver}`,
      });
    } catch (e) {
      res.status(500);
      res.send({
        message: `error while setting an answer for question to user ${receiver}`,
      });
    }
  });

exports.addAnswerFunction = addAnswerFunction;
