const functions = require("firebase-functions");
const { db } = require("../config");

const packageCompletionStatusUpdate = functions.database
  .ref("aggregatedDelivery/{deliveryId}/packages/{packageId}")
  .onUpdate(async (snapshot, context) => {
    const packageId = snapshot.after.key;
    const { receiver_uid, sender_uid, status } = snapshot.after.val();
    const dataBefore = snapshot.before.val();
    if (dataBefore.status === status || status !== "completed") return;

    try {
      db.ref(`users/${sender_uid}/delivery`)
        .child(packageId)
        .update({ status });
      db.ref(`users/${receiver_uid}/delivery`)
        .child(packageId)
        .update({ status });
    } catch (e) {
      functions.logger.log("error while updating packages for users");
    }

    return db.ref("delivery").child(packageId).update({ status });
  });

exports.packageCompletionStatusUpdate = packageCompletionStatusUpdate;
