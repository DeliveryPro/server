const functions = require("firebase-functions");
const { db } = require("../config");
const { emailToDot } = require("../utils/emailToDot");

const packageMonitorFunction = functions.database
  .ref("delivery/{userId}/{packageId}")
  .onCreate(async (snapshot, context) => {
    const { receiver_email, sender_uid, areYouReceiver } = snapshot.val();

    const dotEmail = emailToDot(receiver_email);

    const date = new Date().toDateString();
    let userId = null;

    try {
      const receiverEmailSnap = await db.ref("emails").child(dotEmail).get();
      if (!receiverEmailSnap.exists()) {
        return snapshot.ref.parent
          .child(snapshot.key)
          .update({ date, error: "receiver not found" });
      }
      userId = receiverEmailSnap.val();
    } catch (e) {
      functions.logger.log("error in getting user Id", snapshot.key);
    }

    //* get Receiver data
    let receiver = null;

    try {
      const receiverSnap = await db.ref("users").child(userId).get();
      if (!receiverSnap.exists()) {
        return snapshot.ref.parent
          .child(snapshot.key)
          .update({ date, error: "receiver not found in users DB" });
      }
      receiver = receiverSnap.val();
    } catch (e) {
      functions.logger.log("error in getting user", snapshot.key);
    }

    //* create new Package for receiver

    try {
      if (userId !== sender_uid && !areYouReceiver) {
        db.ref("delivery")
          .child(userId)
          .push({ ...snapshot.val(), areYouReceiver: true });
      }
    } catch (e) {
      functions.logger.log(
        "error while creating receiver package",
        snapshot.key
      );
    }

    return snapshot.ref.parent.child(snapshot.key).update({ date, receiver });
  });

exports.packageMonitorFunction = packageMonitorFunction;
