const { db } = require("../config");

const checkIsPresent = async (collection, email) => {
  let id;
  const snap = await db.ref(collection).child(email).get();

  if (snap.exists()) id = snap.key();

  return id || false;
};

exports.checkIsPresent = checkIsPresent;
