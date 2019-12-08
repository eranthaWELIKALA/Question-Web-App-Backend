const express = require('express');
const app_web = express.Router();

const paperRouter = require('./routes/papers');
const subjectRouter = require('./routes/subjects');
const userRouter = require('./routes/users');
const questionRouter = require('./routes/questions');

const bodyParser = require('body-parser');

app_web.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, DELETE, GET, POST");

        // with this request won't go to routes
        return res.status(200).json({});
    }
    next();
});

app_web.use(bodyParser.urlencoded({extended: false}));
app_web.use(bodyParser.json());

app_web.use('/papers', paperRouter);
app_web.use('/subjects', subjectRouter);
app_web.use('/users', userRouter);
app_web.use('/questions', questionRouter);

app_web.use((req, res, next) =>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app_web.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app_web, firebaseApp;