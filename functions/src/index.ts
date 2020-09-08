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
