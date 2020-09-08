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

  return admin
    .firestore()
    .collection("requests")
    .add({
      text: data.text,
      upvotes: 0,
    })
    .then(() => {
      return "new poll added";
    })
    .catch((e) => {
      throw new functions.https.HttpsError("internal", "request not added");
    });
});

// upvote
exports.upvote = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only authenticated users can add polls"
    );
  }
  const user = admin.firestore().collection("user").doc(context.auth.uid);
  const request = admin.firestore().collection("requests").doc(data.id);

  return user.get().then((doc) => {
    //@ts-ignore
    if (doc.data().upvotedOn.includes(data.id)) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "You can only upvote once"
      );
    }

    return user
      .update({
        //@ts-ignore
        upvotedOn: [...doc.data().upvotedOn, data.id],
      })
      .then(() => {
        return request.update({
          upvotes: admin.firestore.FieldValue.increment(1),
        });
      });
  });
});
