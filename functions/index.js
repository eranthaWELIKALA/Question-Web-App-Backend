const functions = require('firebase-functions');
const express = require('express')

const app = express();

const qappRoutes = require('./mobile/app-mobile');
const webAppRoutes = require('./web/app-web');

// Handling requests coming from Mobile application
app.use('/qapp', qappRoutes);

// Handling requests coming from Web application
app.use('/web', webAppRoutes);

exports.mtute = functions.https.onRequest(app);
