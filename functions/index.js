const functions = require("firebase-functions");
const firebase = require("firebase");

const admin = require("firebase-admin");

const serviceAccount = require("./secret.json");

const firebaseConfig = {
  apiKey: "AIzaSyBzdA3kCN6hN_jkM6h9D5Jvb3EKba-NDX8",
  authDomain: "delivery-27fce.firebaseapp.com",
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://delivery-27fce-default-rtdb.firebaseio.com",
  projectId: "delivery-27fce",
  storageBucket: "delivery-27fce.appspot.com",
  messagingSenderId: "902043234223",
  appId: "1:902043234223:web:8ab7243939e87044fb495a",
  measurementId: "G-K3LD94K50E",
};

firebase.initializeApp(firebaseConfig);

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

// const database = firebase.database();

const helloWorld = async (request, response) => {
  console.log("queried");
  return await corsFunc(request, response, async (req, res) => {
    functions.logger.log("Hello world");
    res.send({});
  });
};

const loginFunction = async (request, response) => {
  console.log("queried login");
  return await corsFunc(request, response, async (req, res) => {
    functions.logger.log("Hello world", req);
    console.log("req => ", req);
    res.send({});
  });
};

exports.helloWorld = functions.https.onRequest(helloWorld);

exports.login = functions.https.onRequest(loginFunction);
