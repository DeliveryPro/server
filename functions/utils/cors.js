const corsFunc = async (req, res, func) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    /** add other headers as per requirement */
  };
  try {
    if (!req.method) {
      res.writeHead(500, headers);
      res.end();
    }

    if (req.method === "OPTIONS") {
      res.writeHead(204, headers);
      return;
    }

    if (["GET", "POST"].indexOf(req.method) > -1) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, POST, GET, PUT, DELETE"
      );
      res.setHeader("Access-Control-Max-Age", 2592000);
      res.status(200);
      await func(req, res);
      return;
    }
    res.writeHead(405, headers);
    res.end(`${req.method} is not allowed for the request.`);
  } catch (e) {
    res.writeHead(405, headers);
    res.end(e);
  }
};

exports.cors = corsFunc;
