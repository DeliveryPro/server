db.ref("users").once("value", (users) => {
  // Build an array of all records to push to Algolia
  const records = [];
  users.forEach((contact) => {
    // get the key and data from the snapshot
    const childKey = contact.key;
    const childData = contact.val();
    // We set the Algolia objectID as the Firebase .key
    childData.objectID = childKey;
    // Add object for indexing
    records.push(childData);
  });

  // Add or update new objects
  index
    .saveObjects(records)
    .then(() => {
      console.log("users imported into Algolia");
      return;
    })
    .catch((error) => {
      console.error("Error when importing contact into Algolia", error);
      process.exit(1);
    });
});
