const functions = require("firebase-functions");
const { db } = require("../config");

const packageStatusUpdateFunction = functions.database
  .ref("aggregatedDelivery/{deliveryId}")
  .onWrite(async (snapshot, context) => {
    const dataBefore = snapshot.before.val();
    const dataAfter = snapshot.after.val();

    if (dataBefore.status === dataAfter.status) return;

    const { packages, courierId } = dataAfter;

    if (!Object.keys(packages).length) {
      functions.logger.log("no packages in delivery", snapshot.before.key);
      return snapshot.after.ref.parent
        .child(snapshot.after.key)
        .update({ error: "no packages", status: "blocked" });
    }

    const ids = Object.keys(packages).map((packageId) => {
      const { sender_uid, receiver_uid } = packages[packageId];
      return { packageId, sender_uid, receiver_uid };
    });

    functions.logger.log("ids =>", ids);

    ids.map(({ packageId, sender_uid, receiver_uid }) => {
      db.ref(`users/${sender_uid}/delivery`)
        .child(packageId)
        .update({ status: dataAfter.status, courierId });
      db.ref(`users/${receiver_uid}/delivery`)
        .child(packageId)
        .update({ status: dataAfter.status, courierId });
      db.ref("delivery")
        .child(packageId)
        .update({ status: dataAfter.status, courierId });
    });

    return null;
  });

exports.packageStatusUpdateFunction = packageStatusUpdateFunction;
