const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

const payload = {
  token: "",
  notification: {
    title: "",
    body: "",
  },
  data: {
    body: "",
  },
};

exports.sendListenerPushNotification = functions.firestore
    .document("Users/{userId}/trackers/{plant}")
    .onUpdate( (change, context) => {
      let token;
      const waterPlantPaylod = payload;
      const userId = context.params.userId;
      const plant = context.params.plant; // get params like this
      db.collection("Users").doc(userId).get("token").then((value) =>{
        token=value.data().token;
        waterPlantPaylod.notification.title="Modern Green Thumb";
        waterPlantPaylod.token=token;
        waterPlantPaylod.notification.body=
        ("Hey your "+plant+" is dead , water it");
        admin.messaging().send(waterPlantPaylod);
      });
    });
