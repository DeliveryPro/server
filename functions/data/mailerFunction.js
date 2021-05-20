const { cors } = require("../utils/cors");
const { sendMessage } = require("../utils/sendMail");

const mailerFunction = (request, response) =>
  cors(request, response, async (req, res) => {
    const { receiver } = req.body;
    try {
      await sendMessage(req.body);
      res.send({
        message: `new message was created and send to user ${receiver}`,
      });
      return;
    } catch (e) {
      res.status(500);
      res.send({
        message: `new message was created and send to user ${receiver}`,
      });
      return;
    }
  });

exports.mailerFunction = mailerFunction;
