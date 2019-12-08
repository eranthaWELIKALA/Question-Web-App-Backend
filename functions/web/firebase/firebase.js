const firebase = require("firebase-admin");
const serviceAccount = require('./../../../questionapp-42922.json');

firebaseApp = firebase.initializeApp({credential: firebase.credential.cert(serviceAccount)});

module.exports = firebaseApp;