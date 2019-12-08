const express = require("express");
const router = express.Router();

var pageData = {
    "Page Name": "QApp",
    "Developer Name": "Erantha Welikala",
    "Developer Contact No.": "+94775778979"
}

// Handling GET methods url
router.get('/', (request, response) => {

    var methodData = {
        "method" : "GET"
    }

    response.setHeader("Accept", 'application/json');
    response.setHeader('Content-Type', 'application/json');
    response.send({pageData, "text":"QAPP"});
});

router.get('/ideamart', (request, response) => {

    var methodData = {
        "method" : "GET"
    }

    response.setHeader("Accept", 'application/json');
    response.setHeader('Content-Type', 'application/json');
    response.send({pageData, methodData, "text":"IDEAMART"});
    //response.send(`${Date.now()}`);
});

router.get('/ideamart/sms', (request, response) => {

    var methodData = {
        "method" : "GET"
    }

    response.setHeader("Accept", 'application/json');
    response.setHeader('Content-Type', 'application/json');
    response.send({pageData, methodData, "text":"IDEAMART-SMS"});
});

router.get('/ideamart/ussd', (request, response) => {

    var methodData = {
        "method" : "GET"
    }

    response.setHeader("Accept", 'application/json');
    response.setHeader('Content-Type', 'application/json');
    response.send({"text":"IDEAMART-USSD"});
});

router.get('/ideamart/caas', (request, response) => {

    var methodData = {
        "method" : "GET"
    }

    response.setHeader("Accept", 'application/json');
    response.setHeader('Content-Type', 'application/json');
    response.send({pageData, methodData, "text":"IDEAMART-CASS"});
});

router.get('/ideamart/sub', (request, response) => {

    var methodData = {
        "method" : "GET"
    }

    response.setHeader("Accept", 'application/json');
    response.setHeader('Content-Type', 'application/json');
    response.send({pageData, methodData, "text":"IDEAMART-SUBSCRIPTION"});
});

// Handling POST method urls
router.post('', (request, response) => {

    var methodData = {
        "method" : "POST"
    }

    response.setHeader("Accept", 'application/json');
    response.setHeader('Content-Type', 'application/json');
    response.send({pageData, methodData, "text":"QAPP"});
});

router.post('/ideamart', (request, response) => {

    var methodData = {
        "method" : "POST"
    }

    response.setHeader("Accept", 'application/json');
    response.setHeader('Content-Type', 'application/json');
    response.send({pageData, methodData, "text":"IDEAMART"});
    //response.send(`${Date.now()}`);
});

router.post('/ideamart/sms', (request, response) => {

    var methodData = {
        "method" : "POST"
    }

    response.setHeader("Accept", 'application/json');
    response.setHeader('Content-Type', 'application/json');
    response.send({pageData, methodData, "text":"IDEAMART-SMS"});
});

router.post('/ideamart/ussd', (request, response) => {

    var methodData = {
        "method" : "POST"
    }

    response.setHeader("Accept", 'application/json');
    response.setHeader('Content-Type', 'application/json');
    response.send({pageData, methodData, "text":"IDEAMART-USSD"});
});

router.post('/ideamart/caas', (request, response) => {

    var methodData = {
        "method" : "POST"
    }

    response.setHeader("Accept", 'application/json');
    response.setHeader('Content-Type', 'application/json');
    response.send({pageData, methodData, "text":"IDEAMART-CASS"});
});

router.post('/ideamart/sub', (request, response) => {

    var methodData = {
        "method" : "POST"
    }

    response.setHeader("Accept", 'application/json');
    response.setHeader('Content-Type', 'application/json');
    response.send({pageData, methodData, "text":"IDEAMART-SUBSCRIPTION"});
});

module.exports = router;