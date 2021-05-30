const functions = require("firebase-functions");
const { db } = require("../config");
const { emailToDot } = require("../utils/emailToDot");

const packageMonitorFunction = functions.database
  .ref("delivery/{packageId}")
  .onCreate(async (snapshot, context) => {
    const { receiver_email, sender_uid } = snapshot.val();

    const dotEmail = emailToDot(receiver_email);

    const date = new Date().toDateString();
    let receiver_uid = null;

    try {
      const receiverEmailSnap = await db.ref("emails").child(dotEmail).get();
      if (!receiverEmailSnap.exists()) {
        return snapshot.ref.parent
          .child(snapshot.key)
          .update({ date, error: "receiver not found" });
      }
      receiver_uid = receiverEmailSnap.val();
    } catch (e) {
      functions.logger.log("error in getting user Id", snapshot.key);
    }

    //* get Receiver data
    let receiver = null;

    try {
      const receiverSnap = await db.ref("users").child(receiver_uid).get();
      if (!receiverSnap.exists()) {
        return snapshot.ref.parent
          .child(snapshot.key)
          .update({ date, error: "receiver not found in users DB" });
      }
      receiver = receiverSnap.val();
    } catch (e) {
      functions.logger.log("error in getting user", snapshot.key);
    }

    //* get Sender data
    let sender = null;

    try {
      const senderSnap = await db.ref("users").child(sender_uid).get();
      if (!senderSnap.exists()) {
        return snapshot.ref.parent
          .child(snapshot.key)
          .update({ date, error: "sender not found in users DB" });
      }
      sender = senderSnap.val();
    } catch (e) {
      functions.logger.log("error in getting user", snapshot.key);
    }

    //* write data to sender
    try {
      db.ref(`users/${sender_uid}/delivery`)
        .child(snapshot.key)
        .set({ ...snapshot.val(), receiver, date });
    } catch (e) {
      functions.logger.log("error in writing to receiver", snapshot.key);
    }

    //* write data to receiver

    try {
      db.ref(`users/${receiver_uid}/delivery`)
        .child(snapshot.key)
        .set({ ...snapshot.val(), date, sender });
    } catch (e) {
      functions.logger.log("error in writing to receiver", snapshot.key);
    }

    return snapshot.ref.parent
      .child(snapshot.key)
      .update({ date, receiver, sender, receiver_uid, sender_uid });
  });

exports.packageMonitorFunction = packageMonitorFunction;
