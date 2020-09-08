import * as functions from "firebase-functions";

// https request 1
exports.randomNumber = functions.https.onRequest((req, res) => {
  const number: Number = Math.round(Math.random() * 100);
  res.send(number.toString());
});

// https request 2
exports.lesgo = functions.https.onRequest((req, res) => {
  res.redirect("https://abeplays.github.io");
});
