const firebase = require("firebase");

const admin = require("firebase-admin");

const serviceAccount = require("./secret.json");

const firebaseConfig = {
  apiKey: "AIzaSyBzdA3kCN6hN_jkM6h9D5Jvb3EKba-NDX8",
  authDomain: "delivery-27fce.firebaseapp.com",
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://delivery-27fce-default-rtdb.firebaseio.com/",
  projectId: "delivery-27fce",
  storageBucket: "delivery-27fce.appspot.com",
  messagingSenderId: "902043234223",
  appId: "1:902043234223:web:8ab7243939e87044fb495a",
  measurementId: "G-K3LD94K50E",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

exports.firebaseInitialed = firebase;
exports.db = db;
