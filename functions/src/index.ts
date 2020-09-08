import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

// auth trigger - new user signup
exports.newUserSignup = functions.auth.user().onCreate((user) => {
  console.log("user created", user.email, user.uid);
  return admin.firestore().collection("user").doc(user.uid).set({
    email: user.email,
    upvotedOn: [],
  });
});

// auth trigger - user deleted
exports.userDeleted = functions.auth.user().onDelete((user) => {
  console.log("user deleted", user.email, user.uid);
  const doc = admin.firestore().collection("user").doc(user.uid);
  return doc.delete();
});

// http to add a poll
exports.addPoll = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only authenticated users can add polls"
    );
  }
  if (data.text.length > 30) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Request must be no more than 30 characters long"
    );
  }

  return admin.firestore().collection("requests").add({
    text: data.text,
    upvotes: 0,
  });
});
